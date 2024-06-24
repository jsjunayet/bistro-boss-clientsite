import Location from "../../component/Location";
import Shop from "../Shop/Shop";
import Bannar from "./Bannar";
import Category from "./categroy/Category";

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
