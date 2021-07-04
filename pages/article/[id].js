import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useLayoutEffect, useRef } from 'react';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import { useBookmarks } from '../../lib/bookmarksState';

const DetailsPageStyles = styled.div`
    width: 100%;
    display: flex;
    padding: 4rem 0;
`;

const InfoStyles = styled.div`
    position: relative;
    flex: 1;
    max-width: 50%;
    max-height: ${(props) => props.maxHeight};
    overflow: hidden;
    margin-left: 3rem;
    padding: 3rem;
    padding-bottom: ${(props) => props.paddingBottom};
    background-color: #f7f7f7;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
    .details-container {
        overflow-x: auto;
        .header {
            margin-bottom: 5rem;
            .title {
                font-size: 3.4rem;
                font-weight: 700;
                margin-bottom: 1rem;
            }
            .subtitle {
                font-size: 2.2rem;
                margin-bottom: 1rem;
            }
        }
        .sell-info {
            display: block;
            ::before {
                content: '';
                display: block;
                height: 2px;
                width: 85%;
                margin: 0 auto 3rem;
                background-color: var(--lightGrey);
            }
            ::after {
                content: '';
                display: block;
                height: 2px;
                width: 85%;
                margin: 3rem auto 0;
                background-color: var(--lightGrey);
            }
            .label {
                font-weight: 700;
            }
            .seller {
                margin: 0.5rem 0;
            }
            .price {
                margin: 0.5rem 0;
                .currency {
                    margin-left: 0.1rem;
                }
            }
        }
    }
    .description {
        padding-top: 2rem;
    }
    .show-more {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #fefefe;
        box-shadow: ${(props) => props.shadow};
        span {
            padding: 1.5rem;
            font-weight: 600;
            cursor: pointer;
        }
    }
`;

export default function DetailsPage({
    articleId,
    title,
    subtitle,
    price,
    descriptionHtml,
    imageUrl,
    sellerId,
    sellerName,
}) {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

    const { addBookmark } = useBookmarks();

    const cleanedHtml = DOMPurify.sanitize(descriptionHtml);
    const detailsRef = useRef();

    useLayoutEffect(() => {
        if (detailsRef.current.clientHeight < detailsRef.current.scrollHeight) {
            setIsOverflowing(true);
        }
    }, [detailsRef]);

    function handleOverflow() {
        setShowMore(!showMore);
    }

    function zoomPicture(e) {
        const walk = 200;
        let { offsetWidth: width, offsetHeight: height } = e.target;
        let { offsetX: x, offsetY: y } = e.nativeEvent;

        setCoordinates({
            x: -((x / width) * walk - walk / 2),
            y: -((y / height) * walk - walk / 2),
        });
    }

    return (
        <DetailsPageStyles>
            <ImageStyles
                translateImg={`translate(${coordinates.x}px, ${coordinates.y}px)`}
            >
                <div className="image-container" onMouseMove={zoomPicture}>
                    <Image
                        className="image"
                        src={imageUrl}
                        alt="Article image"
                        layout="fill"
                    />
                </div>
            </ImageStyles>
            <InfoStyles
                ref={detailsRef}
                maxHeight={showMore ? 'auto' : '70rem'}
                shadow={
                    showMore ? '' : '0 -20px 35px 15px rgba(255, 255, 255, 0.9)'
                }
                paddingBottom={isOverflowing ? '6rem' : '3rem'}
            >
                <div className="details-container">
                    <div className="header">
                        <div className="title">{title}</div>
                        {subtitle && <div className="subtitle">{subtitle}</div>}
                    </div>
                    <div className="sell-info">
                        <div className="seller">
                            <span className="label">Seller: </span>
                            <span>{sellerName}</span>
                        </div>
                        {price && (
                            <div className="price">
                                <span className="label">Price: </span>
                                <span>{price}</span>
                                <span className="currency">CHF</span>
                            </div>
                        )}
                    </div>
                    <div
                        className="description"
                        dangerouslySetInnerHTML={{
                            __html: cleanedHtml,
                        }}
                    ></div>
                </div>
                {isOverflowing && (
                    <div className="show-more" onClick={handleOverflow}>
                        <span>SHOW MORE</span>
                    </div>
                )}
            </InfoStyles>
        </DetailsPageStyles>
    );
}

export async function getServerSideProps(context) {
    const { data: articleDetails } = await axios.get(
        `https://www.ricardo.ch/api/frontend/recruitment/article-details?articleId=${context.params.id}&apiToken=${process.env.apiToken}`
    );

    const { data: seller } = await axios.get(
        `https://www.ricardo.ch/api/frontend/recruitment/user?userId=${articleDetails.sellerId}&apiToken=${process.env.apiToken}`
    );

    return {
        props: {
            articleId: articleDetails.id,
            title: articleDetails.title,
            subtitle:
                articleDetails.subtitle !== undefined
                    ? articleDetails.subtitle
                    : null,
            price: articleDetails.price,
            imageUrl: articleDetails.imageUrl,
            descriptionHtml: articleDetails.descriptionHtml,
            sellerId: articleDetails.sellerId,
            sellerName: seller.name,
        },
    };
}

const ImageStyles = styled.div.attrs((props) => ({
    translateImg: props.translateImg,
}))`
    position: relative;
    flex: 1;
    height: 55rem;
    overflow: hidden;
    background-color: #f3f3f3;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
    z-index: 3;
    .image-container {
        width: 100%;
        height: 100%;
        :hover {
            transform: scale(1.5) ${(props) => props.translateImg};
        }
        .image {
            border-radius: 5px;
            object-fit: contain;
            transition: all 0.5s;
            :hover {
                object-fit: cover;
            }
        }
    }
`;

DetailsPage.propTypes = {
    articleId: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    price: PropTypes.number,
    descriptionHtml: PropTypes.string,
    imageUrl: PropTypes.string,
    sellerId: PropTypes.number,
    sellerName: PropTypes.string,
};
