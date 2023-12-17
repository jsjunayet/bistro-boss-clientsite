import Title from "../../share/Title";
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';
import { Pagination } from 'swiper/modules';
import img1 from '../../../src/assets/image/assets/home/slide1.jpg'
import img2 from '../../../src/assets/image/assets/home/slide2.jpg'
import img3 from '../../../src/assets/image/assets/home/slide3.jpg'
import img4 from '../../../src/assets/image/assets/home/slide4.jpg'
import img5 from '../../../src/assets/image/assets/home/slide5.jpg'


const SwipteSection = () => {

    return (
        <div className="mb-10 max-w-7xl mx-auto">
            <Title heading="---From 11:00am to 10:00pm---" paragraph='ORDER ONLINE'></Title>
            <div className="my-10">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className="">
                        <div className="w-full rounded lg:h-full h-96 lg:w-96 relative">
                            <img className=" " src={img1} alt="" />
                            <p className="absolute bottom-10 lg:left-32 left-52 drop-shadow-2xl font-semibold text-white">Salads</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full rounded lg:h-full h-96 lg:w-96 relative">
                            <img src={img2} alt="" />
                            <p className="absolute bottom-10 lg:left-32 left-52 drop-shadow-2xl font-semibold text-white">pizzas</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full rounded lg:h-full h-96 lg:w-96 relative">
                            <img src={img3} alt="" />
                            <p className=" absolute bottom-10 lg:left-32 left-52 drop-shadow-2xl font-semibold text-white">Soups</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className=" w-full rounded lg:h-full h-96 lg:w-96 relative">
                            <img src={img4} alt="" />
                            <p className=" absolute bottom-10 lg:left-32 left-52 drop-shadow-2xl font-semibold text-white">desserts</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full rounded lg:h-full h-96 lg:w-96 relative">
                            <img src={img5} alt="" />
                            <p className=" absolute bottom-10 lg:left-32 left-52 drop-shadow-2xl font-semibold text-white">soups</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full rounded lg:h-full h-96 lg:w-96 relative"  >
                            <img src={img4} alt="" />
                            <p className=" absolute bottom-10 lg:left-32 left-52 drop-shadow-2xl font-semibold text-white">desserts</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full rounded lg:h-full h-96 lg:w-96 relative">
                            <img src={img2} alt="" />
                            <p className=" absolute bottom-10 lg:left-32 left-52 drop-shadow-2xl font-semibold text-white">pizzas</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full rounded lg:h-full h-96 lg:w-96 relative">
                            <img src={img1} alt="" />
                            <p className=" absolute bottom-10 lg:left-32 left-52 drop-shadow-2xl font-semibold text-white">Salads</p>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    );
};

export default SwipteSection;