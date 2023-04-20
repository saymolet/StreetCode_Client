import './InterestingFacts.styles.scss';

import { useEffect } from 'react';
import BlockSlider from '@features/SlickSlider/InterestingFactSliderSlickSlider.component';
import { useAsync } from '@hooks/stateful/useAsync.hook';
import { useRouteId } from '@hooks/stateful/useRouter.hook';
import useMobx from '@stores/root-store';
import BlockHeading from '@streetcode/HeadingBlock/BlockHeading.component';
import InterestingFactItem from '@streetcode/InterestingFactsBlock/InterestingFactItem/InterestingFactItem.component';

const InterestingFactsComponent = () => {
    const streetcodeId = useRouteId();
    const { factsStore: { fetchFactsByStreetcodeId, getFactArray } } = useMobx();

    useAsync(
        () => fetchFactsByStreetcodeId(streetcodeId),
        [streetcodeId],
    );
    const sliderArray = getFactArray.length === 3 || getFactArray.length === 2 ? getFactArray.concat(getFactArray) : getFactArray;
    // const blockToUpdateMargin = document.querySelector('.interestingFactsWrapper') as HTMLElement;
    // getFactArray.length === 1 ? blockToUpdateMargin.style.marginBottom = '200px' : null;
    
    const setings = {
        dots: getFactArray.length > 3,
        swipeOnClick: true,
        centerMode: true,
        swipe: false,
        centerPadding: '-12px',
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    centerPadding: '-48px',
                    swipe: true,
                    dots: true,
                },
            },
            {
                breakpoint: 769,
                settings: {
                    centerPadding: '-31px',
                    swipe: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1025,
                settings: {
                    centerPadding: '-34.5px',
                    centerlMode: true,
                    arrows: false,
                    swipe: true,
                    dots: true,
                },
            },

        ],

    };

    return (
        <div className={`interestingFactsWrapper ${getFactArray.length === 1 ? 'single' : ''}`}>
            <div className="interestingFactsContainer">
                <BlockHeading headingText="Wow-факти" />
                <div className="interestingFactsSliderContainer">
                    <div style={{ height: '100%' }}>
                        {(getFactArray.length === 1) ? (
                            <div className="singleSlideContainer">
                                <InterestingFactItem
                                    numberOfSlides={1}
                                    fact={getFactArray[0]}
                                />
                            </div>
                        ) : (
                            <BlockSlider
                                className="heightContainer"
                                // dots={getFactArray.length > 3}
                                // swipeOnClick
                                // swipe
                                // centerMode
                                // centerPadding="-12px"
                                {...setings}
                            >
                                {sliderArray.map((fact) => (
                                    <InterestingFactItem
                                        key={fact.id}
                                        fact={fact}
                                        numberOfSlides={sliderArray.length}
                                    />
                                ))}
                            </BlockSlider>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterestingFactsComponent;
