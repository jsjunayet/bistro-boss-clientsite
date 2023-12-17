
const ShareBannar = ({ img, title, text }) => {
    return (
        <div>
            <div className="" style={{ backgroundImage: `url(${img})` }}>
                <div className="hero-overlay bg-opacity-20"></div>
                <div className=" py-32  text-center">
                    <div className="lg:p-20 p-5  rounded-xl space-y-4 w-2/3 mx-auto  bg-[#15151599]">
                        <p className='text-5xl text-white uppercase'>{title}</p>
                        <p className='text-xl text-white'>{text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareBannar;