import './MainBlock.styles.scss';
import Hrushevskyi from '@images/streetcode-card/Hrushevskyi.png';

import { Button } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';

import TagList from '@components/TagList/TagList.component';
import SimpleSlider from '@features/SlickSlider/SlickSlider.component';
import BreadCrumb from '@streetcode/MainBlock/BreadCrumb/BreadCrumb.component';

const MainBlock = () => {
    let slide = <img src={Hrushevskyi} className={'streetcodeImg'} alt="" />;

    return (
        <div className="blockCentering margin-82px bgr">
            <div className="mainContainer">
                <BreadCrumb separator={<div className={'separator'} />} />
                <div className="blockCentering">
                    <div className={'mainContent'}>
                        <div className={'card'}>
                            <div className={'leftSider'}>
                                <div className={'leftSiderContentContainer'}>
                                    <div className={'leftSiderContent'}>
                                        <SimpleSlider
                                            arrows={false}
                                            slidesToShow={1}
                                            slides={Array(4).fill(slide)}
                                            toChangeSlidesOnClick={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={'rightSider'}>
                                <div className={'headerContainer'}>
                                    <div>
                                        <div className={'streetcodeIndex'}>
                                            Стріткод #0001
                                        </div>
                                        <h2 className={'streetcodeTitle'}>
                                            Михайло Грушевський
                                        </h2>
                                        <div className={'streetcodeDate'}>
                                            29 вересня 1866 року — 26 листопада 1934 року
                                        </div>
                                        <TagList/>
                                        <p className={'teaserBlock'}>
                                            У вересні 1907 за участі Грушевського, що увійшов до його керівництва, було
                                            створене<br/>
                                            нелегальне позапартійне українське громадське об'єднання — Товариство
                                            українських<br/>
                                            поступовців, що згуртувало сили українства й до 1917 року було єдиною
                                            діяльною українською< br/>
                                            організацією ліберального напряму.<br/>
                                            <br/>
                                            Свою політичну платформу Грушевський базував у той час
                                            на принципах конституційного парламентаризму й автономії
                                        </p>
                                        <div className={'cardFooter'}>
                                            <Button type="primary" className={'audioBtn'}>
                                                <PlayCircleFilled className={'playCircle'}/>
                                                <span>Прослухати текст</span>
                                            </Button>
                                            <Button className={'animateFigureBtn'}>Оживити постать</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainBlock;