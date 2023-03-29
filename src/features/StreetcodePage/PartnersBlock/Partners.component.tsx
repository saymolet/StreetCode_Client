import './Partners.styles.scss';

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
                    slidesToShow={getPartnerArray.length >= 3 ? 3 : getPartnerArray.length}
                    autoplay
                    autoplaySpeed={3000}
                    arrows={false}
                    dots={false}
                >
                    {sliderItems}
                </SlickSlider>
            </div>
        </div>
    );
};

export default PartnersComponent;
