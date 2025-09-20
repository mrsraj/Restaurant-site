import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const images = [
    './images/restaurant.jpg',
];

export default function Hero() {
    return (
        <div className="relative h-[400px] overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="h-full"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="h-full w-full bg-center bg-cover"
                            style={{ backgroundImage: `url(${img})` }}
                        ></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                    Welcome to MyRestaurant
                </h1>
            </div>
        </div>
    );
}
