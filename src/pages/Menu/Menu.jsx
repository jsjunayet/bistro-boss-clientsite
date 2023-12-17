import ShareBannar from "../../component/ShareBannar";
import img1 from '../../assets/image/assets/menu/banner3.jpg'
import Title from "../../share/Title";
import Shareitem from "../../component/Shareitem";
import { useState } from "react";
import useMenu from "../../Hooks/useMenu";
import dessertimg from '../../../src/assets/image/assets/menu/dessert-bg.jpeg'
import pizzaimg from '../../../src/assets/image/assets/menu/pizza-bg.jpg'
import shoupimg from '../../../src/assets/image/assets/menu/soup-bg.jpg'
import saladimg from '../../../src/assets/image/assets/menu/salad-bg.jpg'


const Menu = () => {

    const [menu] = useMenu()
    const offereds = menu.filter((item) => item.category == 'offered')
    const desserts = menu.filter((item) => item.category == 'dessert')
    const pizzas = menu.filter((item) => item.category == 'pizza')
    const soups = menu.filter((item) => item.category == 'soup')
    const salads = menu.filter((item) => item.category == 'salad')
    return (
        <div>

            <ShareBannar img={img1} title="OUR MENU" text='Would you like to try a dish?'> </ShareBannar>
            <div className="mt-10">
                <Title heading="---Don't miss---" paragraph="TODAY'S OFFER"></Title>
                <Shareitem items={offereds}></Shareitem>
            </div>
            <Shareitem
                items={desserts}
                img={dessertimg}
                text='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                title='dessert'
            ></Shareitem>
            <Shareitem
                items={pizzas}
                img={pizzaimg}
                text='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                title='pizza'
            >
            </Shareitem>
            <Shareitem
                items={salads}
                img={saladimg}
                text="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                title="salad"
            >

            </Shareitem>
            <Shareitem
                items={soups}
                img={shoupimg}
                title='soup'
                text='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            >

            </Shareitem>

        </div>
    );
};

export default Menu;