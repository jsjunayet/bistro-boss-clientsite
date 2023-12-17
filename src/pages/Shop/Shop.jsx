import ShareBannar from "../../component/ShareBannar";
import shopimg from '../../../src/assets/image/assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../Hooks/useMenu";
import ShareCard from "../../component/ShareCard";
import OrderItem from "../../component/OrderItem";
import { useParams } from "react-router-dom";

const Shop = () => {
    const catagoryes = ['salad', 'pizza', 'soup', 'dessert']
    const { category } = useParams()
    const initailze = catagoryes.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initailze);
    const [menu] = useMenu()

    const desserts = menu.filter((item) => item.category == 'dessert')
    const pizzas = menu.filter((item) => item.category == 'pizza')
    const soups = menu.filter((item) => item.category == 'soup')
    const salads = menu.filter((item) => item.category == 'salad')
    const drinks = menu.filter((item) => item.category == 'drinks')
    return (
        <div>
            <ShareBannar img={shopimg} text='Would you like to try a dish?' title='OUR SHOP'></ShareBannar>
            <div className=" max-w-7xl  mx-auto my-10">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} >
                    <div className="text-center">
                        <TabList>
                            <Tab>Salad</Tab>
                            <Tab>pizza</Tab>
                            <Tab>soups</Tab>
                            <Tab>desserts</Tab>
                            <Tab>drinks</Tab>
                        </TabList>
                    </div>

                    <TabPanel>
                        <OrderItem items={salads}></OrderItem>
                    </TabPanel>
                    <TabPanel>
                        <OrderItem items={pizzas}></OrderItem>
                    </TabPanel>
                    <TabPanel>
                        <OrderItem items={soups}></OrderItem>
                    </TabPanel>
                    <TabPanel>
                        <OrderItem items={desserts}></OrderItem>
                    </TabPanel>
                    <TabPanel>
                        <OrderItem items={drinks}></OrderItem>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Shop;