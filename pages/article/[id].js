import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import styled from 'styled-components';
import { useBookmarks } from '../../lib/bookmarksState';
import ImageStyles from '../../styles/ImageStyles';
import { InfoStyles, ButtonStyles } from '../../styles/InfoStyles';
import Head from 'next/head';

const DetailsPageStyles = styled.div`
    width: 100%;
    display: flex;
    padding: 4rem 0;
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
    const [bookmarked, setBookmarked] = useState();

    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

    const cleanedHtml = DOMPurify.sanitize(descriptionHtml);
    const detailsRef = useRef();

    useEffect(() => {
        if (detailsRef.current.clientHeight < detailsRef.current.scrollHeight) {
            setIsOverflowing(true);
        }

        setBookmarked(isBookmarked(articleId));
    });

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
        <>
            <Head>
                <title>{`${title} | Buy on Ricardo`}</title>
            </Head>
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
                        showMore
                            ? ''
                            : '0 -20px 35px 15px rgba(255, 255, 255, 0.9)'
                    }
                    paddingBottom={isOverflowing ? '6rem' : '3rem'}
                >
                    <div className="details-container">
                        <div className="header">
                            <div className="title">{title}</div>
                            {subtitle && (
                                <div className="subtitle">{subtitle}</div>
                            )}
                        </div>
                        <div className="sell-info">
                            <div className="container-flex">
                                <div className="seller-container">
                                    <div className="seller">
                                        <span className="label">Seller: </span>
                                        <span>{sellerName}</span>
                                    </div>
                                    {price && (
                                        <div className="price">
                                            <span className="label">
                                                Price:{' '}
                                            </span>
                                            <span>{price}</span>
                                            <span className="currency">
                                                CHF
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <ButtonStyles
                                    onClick={() =>
                                        bookmarked
                                            ? removeBookmark(articleId)
                                            : addBookmark({
                                                  articleId,
                                                  title,
                                                  price,
                                                  imageUrl,
                                                  sellerName,
                                              })
                                    }
                                >
                                    {bookmarked ? (
                                        <>
                                            <FaBookmark className="icon" />
                                            <span>Bookmarked</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaRegBookmark className="icon" />
                                            <span>Bookmark</span>
                                        </>
                                    )}
                                </ButtonStyles>
                            </div>
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
        </>
    );
}

export async function getServerSideProps(context) {
    const { data: articleDetails } = await axios.get(
        `https://www.ricardo.ch/api/frontend/recruitment/article-details?articleId=${context.params.id}&apiToken=${process.env.NEXT_PUBLIC_API_TOKEN}`
    );

    const { data: seller } = await axios.get(
        `https://www.ricardo.ch/api/frontend/recruitment/user?userId=${articleDetails.sellerId}&apiToken=${process.env.NEXT_PUBLIC_API_TOKEN}`
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
