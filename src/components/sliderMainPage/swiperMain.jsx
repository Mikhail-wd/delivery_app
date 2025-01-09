import Slide from './slide/slide';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "./pagination.css"
import classes from './swiperMain.module.css'

export default function MainSwiper() {
    return (
        <div className={classes.swiperWrapper + " regular-padding"}>
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                breakpoints={{
                    "100": {
                        slidesPerView: 1,
                        spaceBetween: 10
                    }, "280": {
                        slidesPerView: 1,
                        spaceBetween: 10
                    }
                    , "410": {
                        slidesPerView: 1,
                        spaceBetween: 10
                    }
                }}
                centeredSlides={true}
                loop={false}
            >
                <SwiperSlide >
                    <Slide />
                </SwiperSlide>
                <SwiperSlide >
                    <Slide />
                </SwiperSlide>
                <SwiperSlide >
                    <Slide />
                </SwiperSlide>
            </Swiper >
        </div>
    )
}