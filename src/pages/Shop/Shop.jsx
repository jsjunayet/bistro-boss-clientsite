import ShareBannar from "../../component/ShareBannar";
import shopimg from '../../../src/assets/image/assets/shop/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../Hooks/useMenu";
import OrderItem from "../../component/OrderItem";
import { useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Shop = () => {
    const categories = ['all',  'pizza', 'soup','salad', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialize = categories.indexOf(category) !== -1 ? categories.indexOf(category) : 0;
    const [tabIndex, setTabIndex] = useState(initialize);
    const [menu] = useMenu();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // asc for ascending, desc for descending
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredMenu = (category) => {
        let items = category === 'all' ? menu : menu.filter(item => item.category === category);

        // Filter items by search term
        items = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

        // Sort items by price
        items = items.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

        return items;
    };

    const paginate = (items) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    

    return (
        <div>
            <div className="max-w-6xl mx-auto my-10">
                <div className=" justify-center items-center mb-4 flex flex-col md:flex-row gap-y-4 md:gap-y-0 gap-x-[2px]">
                    <input 
                        type="text" 
                        placeholder="Name Search..." 
                        value={searchTerm} 
                        onChange={handleSearch} 
                        className="px-4 py-2 border rounded"
                    />
                    <div>
                    <button 
                        onClick={() => handleSortOrderChange('asc')} 
                        className={`md:ml-2 ml-0 px-4 py-2 border rounded ${sortOrder === 'asc' ? 'bg-gray-300' : ''}`}
                    >
                        Low Price
                    </button>
                    <button 
                        onClick={() => handleSortOrderChange('desc')} 
                        className={`ml-2 px-4 py-2 border rounded ${sortOrder === 'desc' ? 'bg-gray-300' : ''}`}
                    >
                        High Price
                    </button>
                    </div>
                </div>
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} >
                    <div className="text-center">
                        <TabList>
                            {categories.map((cat, index) => (
                                <Tab key={index}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Tab>
                            ))}
                        </TabList>
                    </div>
                   
                     {categories.map((cat, index) => (
                        <TabPanel key={index}>
                            <OrderItem  items={paginate(filteredMenu(cat))}></OrderItem>
                              <Stack spacing={2} className="mt-4 flex flex-col justify-center items-center">
                                <Pagination 
                                    count={Math.ceil(filteredMenu(cat).length / itemsPerPage)} 
                                    page={currentPage} 
                                    onChange={handlePageChange} 
                                    color="primary" 
                                />
                            </Stack>
                        </TabPanel>
                    ))}
                   
                </Tabs>
            </div>
        </div>
    );
};

export default Shop;

