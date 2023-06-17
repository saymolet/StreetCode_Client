import Subtitle, { SubtitleCreate, SubtitleCreateUpdate } from '@models/additional-content/subtitles.model';
import Tag, { StreetcodeTag, StreetcodeTagUpdate } from '@models/additional-content/tag.model';
import Art, { ArtCreateDTO, ArtUpdate, IndexedArt } from '@models/media/art.model';
import Audio, { AudioUpdate } from '@models/media/audio.model';
import Image, { ImageCreate, ImageUpdate } from '@models/media/image.model';
import Video, { VideoCreate } from '@models/media/video.model';
import StreetcodePartner, { PartnerCreateUpdate, PartnerShort, PartnerUpdate } from '@models/partners/partners.model';
import { SourceLink, StreetcodeCategoryContent, StreetcodeCategoryContentUpdate } from '@models/sources/sources.model';
import RelatedFigure, { RelatedFigureCreateUpdate, RelatedFigureUpdate } from '@models/streetcode/related-figure.model';
import TimelineItem, { TimelineItemUpdate } from '@models/timeline/chronology.model';
import Toponym, { ToponymCreateUpdate } from '@models/toponyms/toponym.model';
import TransactionLink from '@models/transactions/transaction-link.model';

import StreetcodeCoordinate from '../additional-content/coordinate.model';
import StatisticRecord, { StatisticRecordUpdate } from '../analytics/statisticrecord.model';
import { StreetcodeArtCreateUpdate } from '../media/streetcode-art.model';

import { Fact, FactUpdate, Text, TextCreate, TextCreateUpdate } from './text-contents.model';

export default interface Streetcode extends EventStreetcode, PersonStreetcode {
    id: number;
    index: number;
    teaser: string;
    alias?: string;
    viewCount: number;
    createdAt: Date;
    updatedAt: Date;
    eventStartOrPersonBirthDate: Date;
    eventEndOrPersonDeathDate: Date;
    dateString: string;
    type: StreetcodeType;
    status: Status;
    text: string;
    audio?: Audio | undefined;
    transliterationUrl: string;
    transactionLink?: TransactionLink | undefined;
    toponyms: Toponym[];
    arts: Art[];
    images: Image[];
    tags: StreetcodeTag[];
    subtitles: Subtitle[];
    facts: Fact[];
    videos: Video[];
    sourceLinks: SourceLink[];
    timelineItems: TimelineItem[];
    observers: RelatedFigure[];
    targets: RelatedFigure[];
    streetcodePartners: StreetcodePartner[];
}

export interface EventStreetcode {
    title: string;
    streetcode: Streetcode;
}

export interface PersonStreetcode {
    title: string;
    firstName: string;
    lastName: string;
    rank: string;
    streetcode: Streetcode;
}

export enum Status {
    Draft,
    Published,
    Deleted,
}

export enum StreetcodeType {
    Event,
    Person,
}

export interface StreetcodeShort {
    id: number;
    index: number;
    title: string;
}

export interface StreetcodeMainPage {
    id: number,
    title: string,
    teaser: string,
    alias?: string,
    text: string,
    imageId: number,
    transliterationUrl: string,
}

export interface StreetcodeCatalogRecord {
    id: number,
    title: string,
    url: string,
    alias: string | undefined,
    imageId: number,
    tags: Tag[];
}

export interface StreetcodeCreate {
    id: number | null,
    index: number,
    firstName: string | null,
    lastName: string | null,
    title: string,
    teaser: string,
    alias?: string,
    status: Status;
    transliterationUrl: string,
    arBlockURL?: string,
    viewCount: number,
    createdAt: string,
    eventStartOrPersonBirthDate: Date,
    eventEndOrPersonDeathDate: Date,
    dateString: string,
    tags: StreetcodeTag[],
    images: Image[],
    audioId: number | null,
    streetcodeType: StreetcodeType,
    text: TextCreate | null,
    videos: VideoCreate[],
    facts: Fact[],
    timelineItems: TimelineItem[],
    partners: PartnerShort[],
    subtitles: SubtitleCreate[],
    relatedFigures: RelatedFigureCreateUpdate[],
    streetcodeArts: StreetcodeArtCreateUpdate[],
    toponyms: ToponymCreateUpdate[],
    streetcodeCategoryContents: StreetcodeCategoryContent[],
    coordinates: StreetcodeCoordinate[],
    statisticRecords: StatisticRecord[],
}

export interface StreetcodeUpdate {
    id: number,
    index: number,
    firstName: string | null,
    lastName: string | null,
    title: string,
    teaser: string,
    alias?: string,
    transliterationUrl: string,
    eventStartOrPersonBirthDate: Date,
    eventEndOrPersonDeathDate: Date,
    dateString: string,
    streetcodeType: StreetcodeType,
    videos: Video[],
    facts: FactUpdate[],
    relatedFigures: RelatedFigureUpdate[],
    timelineItems: TimelineItemUpdate[],
    partners: PartnerUpdate[],
    streetcodeArts: StreetcodeArtCreateUpdate[];
    subtitles: Subtitle[],
    text: TextCreateUpdate | null,
    streetcodeCategoryContents: StreetcodeCategoryContentUpdate[],
    tags: StreetcodeTagUpdate[],
    statisticRecords: StatisticRecordUpdate[],
    toponyms: ToponymCreateUpdate[],
    images: ImageUpdate[],
    audios: AudioUpdate[],
}
