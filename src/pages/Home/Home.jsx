import Location from "../../component/Location";
import TopBar from "../../component/navbar/TopBar";
import Title from "../../share/Title";
import Shop from "../Shop/Shop";
import Bannar from "./Bannar";
import Category from "./categroy/Category";
import OurSection from "./OurSection";
import ParallaxSection from "./ParallaxSection";
import Review from "./Review";
import SwipteSection from "./SwipteSection";

const Home = () => {
    return (
        <div>
            <Bannar></Bannar>
            <Category></Category>
            <Shop></Shop>
            <Location></Location>
        </div>



    );
};

export default Home;
