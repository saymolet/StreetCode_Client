import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Modal } from 'antd';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';

import FileUploader from '@/app/common/components/FileUploader/FileUploader.component';
import { ModelState } from '@/models/enums/model-state';
import { ArtCreate, ArtUpdate } from '@/models/media/art.model';
import Image from '@/models/media/image.model';
import { StreetcodeArtCreateUpdate } from '@/models/media/streetcode-art.model';

import base64ToUrl from '../../../../../app/common/utils/base64ToUrl.utility';

import ArtGalleryAdminBlock from './ArtGallery/ArtGalleryAdminBlock.component';
import PreviewImageModal from './PreviewImageModal/PreviewImageModal.component';

const DownloadBlock: React.FC<{
    arts: StreetcodeArtCreateUpdate[],
    setArts: React.Dispatch<React.SetStateAction<StreetcodeArtCreateUpdate[]>>
}> = ({ arts, setArts }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [filePreview, setFilePreview] = useState<UploadFile | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const uidsFile = useRef<string>('');
    const indexTmp = useRef<number>(0);
    const [visibleModal, setVisibleModal] = useState(false);
    const [fileToRemove, setFileToRemove] = useState<UploadFile>();

    useEffect(() => {
        if (arts.length > 0) {
            const newFileList = arts.filter((art) => art.modelState !== ModelState.Deleted)
                .map((streetcodeArt: StreetcodeArtCreateUpdate) => ({
                    uid: `${streetcodeArt.index}`,
                    name: streetcodeArt.art.image.title,
                    status: 'done',
                    thumbUrl: base64ToUrl(streetcodeArt.art.image.base64, streetcodeArt.art.image.mimeType) ?? '',
                    type: streetcodeArt.art.image.mimeType,
                }));

            setFileList(newFileList);
            indexTmp.current = Math.max(...arts.map((x) => x.index)) + 1;
        }
    }, [arts]);

    const handleRemove = useCallback((param: UploadFile) => {
        setVisibleModal(true);
        setFileToRemove(param);
    }, []);

    const handleCancelModalRemove = useCallback(() => {
        setVisibleModal(false);
    }, []);

    const onChange = (uploadParams: UploadChangeParam<UploadFile<any>>) => {
        uidsFile.current = uploadParams.file.uid;
        const status = uploadParams.file.status ?? 'removed';
        if (status != 'removed') {
            setFileList(uploadParams.fileList.map((x) => x));
        }
    };

    const onPreview = async (file: UploadFile) => {
        setFilePreview(file);
        setIsOpen(true);
    };

    const onSuccessUpload = (image: Image) => {
        if (arts.length > 0) {
            indexTmp.current = Math.max(...arts.map((x) => x.index)) + 1;
        } else {
            indexTmp.current += 1;
        }

        const newArt: StreetcodeArtCreateUpdate = {
            index: indexTmp.current,
            modelState: ModelState.Created,
            art: {
                id: 0,
                description: 'description',
                imageId: image.id,
                image: {
                    id: image.id,
                    title: 'title',
                    base64: image.base64,
                    mimeType: image.mimeType,
                    blobName: '',
                },
                streetcodes: [],
            },
        };

        setArts([...arts, newArt]);
    };

    const onRemoveFile = (file: UploadFile) => {
        const removedArtIndex = arts.findIndex((a) => `${a.index}` === file.uid);

        if (removedArtIndex >= 0) {
            if (arts[removedArtIndex]?.isPersisted) {
                arts[removedArtIndex].modelState = ModelState.Deleted;
            } else {
                arts.splice(removedArtIndex, 1);
            }

            // Decrement indexes of all elements after the removed element
            for (let i = removedArtIndex; i < arts.length; i++) {
                arts[i].index -= 1;
            }
            setArts([...arts]);
            // Decrement indexTmp.current if the removed element had the highest index
            if (removedArtIndex === arts.length && indexTmp.current > 0) {
                indexTmp.current -= 1;
            }
        }

        setFileList(fileList.filter((x) => x.uid !== file.uid));
        setVisibleModal(false);
    };

    const handleSave = (streetcodeArt: StreetcodeArtCreateUpdate) => {
        const updated = arts.find((x) => x.art.imageId === streetcodeArt.art.imageId);

        if (!updated) {
            return;
        }

        updated.art.description = streetcodeArt.art.description;
        updated.art.image.title = streetcodeArt.art.image.title;

        setArts([...arts]);
        setIsOpen(false);
    };

    return (
        <>
            <FileUploader
                accept=".jpeg,.png,.jpg"
                listType="picture-card"
                fileList={fileList}
                onPreview={onPreview}
                uploadTo="image"
                onChange={onChange}
                onSuccessUpload={onSuccessUpload}
                onRemove={(e) => handleRemove(e)}
            >
                {fileList.length < 15 ? <p>+ Додати</p> : <></>}
            </FileUploader>
            <Modal
                title="Ви впевнені, що хочете видалити цей арт?"
                open={visibleModal}
                onOk={(e) => onRemoveFile(fileToRemove)}
                onCancel={handleCancelModalRemove}
            />
            {arts.length > 0 ? (
                <>
                    <h4>Попередній перегляд</h4>
                    <ArtGalleryAdminBlock arts={arts.filter((art) => art.modelState !== ModelState.Deleted)} />
                    <PreviewImageModal
                        streetcodeArt={arts[fileList.indexOf(filePreview!)]}
                        onSave={handleSave}
                        opened={isOpen}
                        setOpened={setIsOpen}
                    />
                </>
            ) : null}
        </>
    );
};

export default DownloadBlock;
