import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CarouselStyles from '../styles/CarouselStyles';
import Card from './Card';
import Message from './Message';

export default function Carousel({ items, title }) {
    const [translate, setTranslate] = useState(0);

    const carouselRef = useRef();

    const move = 900;

    function moveLeft() {
        const translateRight = translate + move;
        if (translateRight > 0) {
            setTranslate(0);
        } else {
            setTranslate(translateRight);
        }
    }

    function moveRight() {
        const translateLeft = translate - move;
        const limit =
            -carouselRef.current.scrollWidth + carouselRef.current.offsetWidth;
        if (translateLeft < limit) {
            setTranslate(limit);
        } else {
            setTranslate(translateLeft);
        }
    }

    return (
        <CarouselStyles translate={translate}>
            <h1 className="title">{title}</h1>
            {items.length > 0 ? (
                <div className="container">
                    <div className="arrow left" onClick={moveLeft}>
                        <FaChevronLeft />
                    </div>
                    <div className="arrow right" onClick={moveRight}>
                        <FaChevronRight />
                    </div>

                    <div className="carousel" ref={carouselRef}>
                        {items.map((item) => (
                            <Card
                                key={item.articleId}
                                articleId={item.articleId}
                                imageUrl={item.imageUrl}
                                price={item.price}
                                title={item.title}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="info">
                        You don't have any saved articles yet
                    </h3>
                    <p className="message">
                        As soon as you see articles that you like, add them to
                        your wish list! So you won't miss a sale.
                    </p>
                </>
            )}
        </CarouselStyles>
    );
}
