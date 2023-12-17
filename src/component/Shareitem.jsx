import { Link } from "react-router-dom";
import ShareBannar from "./ShareBannar";
import ShareMenu from "./ShareMenu";


const Shareitem = ({ items, title, text, img }) => {
    return (
        <div>
            {title && <ShareBannar title={title} text={text} img={img}></ShareBannar>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 max-w-7xl mx-auto my-10">
                {
                    items.map((item) => <ShareMenu key={item._id} item={item}></ShareMenu>)
                }
            </div>
            <div className="text-center my-4">
                <Link to={`/shop/${title}`} className=" btn btn-outline border-0 border-b-4 border-black">ORDER YOUR FAVOURITE FOOD</Link>
            </div>
        </div>
    );
};

export default Shareitem;