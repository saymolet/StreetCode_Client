import './Video.styles.scss';

import ReactPlayer from 'react-player';
import useWindowSize from '@hooks/stateful/useWindowSize.hook';

interface Props {
    videoUrls: string[] | string;
    setTextBlockState: React.Dispatch<React.SetStateAction<boolean>>;
}
const VideoPlayer = ({ videoUrls, setTextBlockState }: Props) => {
    const windowSize = useWindowSize();
    let width = '50vw';

    if (windowSize.width >= 1350) {
        width = '45vw';
    }
    return (
        <div className="videoComponent">
            <div className="player-wrapper">
                <ReactPlayer
                    width="100%"
                    height={width}
                    className="react-player"
                    url={videoUrls}
                    controls
                    onReady={(() => {
                        setTextBlockState(true);
                    })}
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
