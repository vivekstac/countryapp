import React, { useState } from "react";
import { Carousel, Col } from "react-bootstrap";
import PrevArrow from "../assets/img/prev-arrow.svg";
import NextArrow from "../assets/img/next-arrow.svg";
import MediaImg from "../assets/img/media.svg";

const Slider = ({ loading }) => {
    const slides = [
        { id: 1, text: "Slide 1" },
        { id: 2, text: "Slide 2" },
        { id: 3, text: "Slide 3" },
        { id: 4, text: "Slide 4" },
    ];

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => setIndex(selectedIndex);

    const goNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const goPrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="slider-container">
            <Col sm={9} className="p-0 image-items slider-item">
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    controls={false}
                    indicators={false}
                    interval={null}
                    className="slider-carousel"
                >
                    {slides.map((slide) => (
                        <Carousel.Item key={slide.id}>
                            <div className="d-flex media-container justify-content-center align-items-center h-100">
                                {loading ? "Loading..." : <img src={MediaImg} alt="Media" />}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>

                <div className="carousel-indicators">
                    <div className="prev-btn" onClick={goPrev}>
                        <img src={PrevArrow} alt="" />
                    </div>
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={i === index ? "active" : ""}
                            onClick={() => setIndex(i)}
                        ></button>
                    ))}
                    <div className="next-btn" onClick={goNext}>
                        <img src={NextArrow} alt="" />
                    </div>
                </div>
            </Col>
            <Col sm={3} className="p-0 image-items banner-item">
                <div className="d-flex media-container justify-content-center align-items-center h-100">
                    {loading ? "Loading..." : <img src={MediaImg} alt="Media" />}
                </div>
            </Col>
        </div>
    );
};

export default Slider;
