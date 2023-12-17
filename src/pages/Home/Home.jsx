import Title from "../../share/Title";
import Bannar from "./Bannar";
import OurSection from "./OurSection";
import ParallaxSection from "./ParallaxSection";
import Review from "./Review";
import SwipteSection from "./SwipteSection";

const Home = () => {
    return (
        <div>
            <Bannar></Bannar>
            <SwipteSection></SwipteSection>
            <OurSection></OurSection>
            <ParallaxSection></ParallaxSection>
            <Review></Review>
        </div>



    );
};

export default Home;
