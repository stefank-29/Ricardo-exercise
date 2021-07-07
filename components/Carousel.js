import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CarouselStyles from '../styles/CarouselStyles';
import Card from './Card';

export default function Carousel({ items, title }) {
    const [translate, setTranslate] = useState(0);

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
        if (translateLeft < -(items.length - 5) * 240 + 80) {
            setTranslate(-(items.length - 5) * 240 + 80);
        } else {
            setTranslate(translateLeft);
        }
    }

    return (
        <CarouselStyles translate={translate}>
            <h1 className="title">{title}</h1>
            <div className="container">
                <div className="arrow left" onClick={moveLeft}>
                    <FaChevronLeft />
                </div>
                <div className="arrow right" onClick={moveRight}>
                    <FaChevronRight />
                </div>

                <div className="carousel">
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
        </CarouselStyles>
    );
}
