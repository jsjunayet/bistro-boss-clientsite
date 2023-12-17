

const ShareMenu = ({ item }) => {
    const { price, name, image, recipe } = item
    return (
        <div className="flex items-center gap-3 px-3">
            <img style={{ borderRadius: '0 200px 200px 200px' }} src={image} className="w-[120px]" alt="" />
            <div className="">
                <p>{name} -------------</p>
                <p className=" ">{recipe}</p>
            </div>
            <div className="whitespace-nowrap">$ {price}</div>
        </div>
    );
};

export default ShareMenu;