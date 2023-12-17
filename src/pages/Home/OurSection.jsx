import { useEffect, useState } from "react";
import Title from "../../share/Title";
import ShareMenu from "../../component/ShareMenu";
import useMenu from "../../Hooks/useMenu";
import Shareitem from "../../component/Shareitem";

const OurSection = () => {
    // const [menu, setmenu] = useState([])
    // useEffect(() => {
    //     fetch('/menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popular = data.filter((item) => item.category == "popular")
    //             setmenu(popular)
    //         })
    // }, [])
    const [menu] = useMenu()
    const populars = menu.filter((item) => item.category == "popular")
    return (
        <div className="max-w-7xl mx-auto mb-10">
            <Title heading="---Check it out---" paragraph='FROM OUR MENU'></Title>
            <Shareitem items={populars}></Shareitem>
        </div>
    );
};

export default OurSection;