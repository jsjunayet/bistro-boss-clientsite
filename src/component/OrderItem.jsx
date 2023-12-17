import ShareCard from "./ShareCard";


const OrderItem = ({ items }) => {
    return (
        <div className='my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                items.map((item) => <ShareCard key={item._id} item={item}></ShareCard>)
            }
        </div>
    );
};

export default OrderItem;