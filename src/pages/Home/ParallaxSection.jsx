import img from '../../../src/assets/image/assets/home/img1.jpg'
import Title from '../../share/Title';

const ParallaxSection = () => {
    return (
        <div>
            <div className=" " style={{ backgroundImage: `url(${img})` }}>
                <div className="hero-overlay bg-opacity-90"></div>
                <div className="py-20">
                    <div className='text-white mb-10'>
                        <Title heading='---Check it out---' paragraph='FROM OUR MENU'></Title>
                    </div>

                    <div className='lg:flex lg:px-40 px-4  items-center gap-5 max-w-6xl mx-auto'>
                        <div>
                            <img src={img} className='lg:w-[850px] w-full h-60  object-cover' alt="" />
                        </div>
                        <div className='text-white'>
                            <p className="mb-5">March 20, 2023</p>
                            <p>WHERE CAN I GET SOME?</p>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                            <button className="btn btn-outline border-b-4  mt-3 text-white">Get Started</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ParallaxSection;