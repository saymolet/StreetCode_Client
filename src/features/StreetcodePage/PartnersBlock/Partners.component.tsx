import './Partners.styles.scss';

import { useMemo } from 'react';
import SlickSlider from '@features/SlickSlider/SlickSlider.component';
import { useAsync } from '@hooks/stateful/useAsync.hook';
import useMobx from '@stores/root-store';

import PartnerItem from './PartnerItem/PartnerItem.component';

const PartnersComponent = () => {
    const { partnersStore, streetcodeStore: { getStreetCodeId } } = useMobx();
    const { fetchPartnersByStreetcodeId, getPartnerArray } = partnersStore;

    useAsync(
        () => Promise.all([
            fetchPartnersByStreetcodeId(getStreetCodeId),
        ]),
        [getStreetCodeId],
    );

    const useResponsiveSettings = (breakpoint: number, slidesToShow: number) => useMemo(() => ({
        breakpoint,
        settings: {
            slidesToShow: getPartnerArray.length > slidesToShow ? slidesToShow : getPartnerArray.length,
        },
    }), [getPartnerArray, breakpoint, slidesToShow]);

    const responsiveSettingsTablet = useResponsiveSettings(1024, 4);
    const responsiveSettingsMobile = useResponsiveSettings(780, 2);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 4000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [responsiveSettingsTablet, responsiveSettingsMobile],
    };

    const sliderItems = getPartnerArray.map((p) => (
        <PartnerItem
            partner={p}
        />
    ));

    return (
        <div className="partnersWrapper">
            <div className="partnerContainer">
                <SlickSlider
                    className="heightContainer"
                    {...settings}
                >
                    {sliderItems}
                </SlickSlider>
            </div>
        </div>
    );
};

export default PartnersComponent;
