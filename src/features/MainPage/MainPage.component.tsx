import './MainPage.styles.scss';
import ScrollToTopBtn from "../../app/common/components/ScrollToTopBtn/ScrollToTopBtn.component";
import Footer from "../../app/layout/footer/Footer.component";
import DonateBtn from "../StreetcodePage/DonateBtn/DonateBtn.component";
import TopCarouselComponent from './TopCarousel/TopCarousel.component';
import StreetcodeSliderComponent from './StreetcodeSlider/StreetcodeSlider.component';
import TeamComponent from './TeamSlider/TeamComponent.component';
const mainPageContent = () => {
    return (
        <div className="mainPageContainer">
            <div className="sticky">
                <div className="sticky-content">
                    <ScrollToTopBtn />
                    <DonateBtn />
                </div>
            </div>
            <TopCarouselComponent/>
            <StreetcodeSliderComponent />
            <TeamComponent />
            <Footer />
        </div>
    );
}

export default mainPageContent;
