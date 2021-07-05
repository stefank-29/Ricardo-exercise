import styled from 'styled-components';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import { useBookmarks } from '../lib/bookmarksState';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CardStyles from '../styles/CardStyles';

export default function Card({ articleId, title, endDate, imageUrl, price }) {
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
    const [bookmarked, setBookmarked] = useState();

    useEffect(() => {
        setBookmarked(isBookmarked(articleId));
    });

    return (
        <Link href={`/article/${articleId}`} passHref>
            <CardStyles>
                <div className="container">
                    {bookmarked ? (
                        <FaBookmark
                            className="bookmark checked"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeBookmark(articleId);
                            }}
                        />
                    ) : (
                        <FaRegBookmark
                            className="bookmark"
                            onClick={async (e) => {
                                e.stopPropagation();
                                const { data: article } = await axios.get(
                                    `https://www.ricardo.ch/api/frontend/recruitment/article-details?articleId=${articleId}&apiToken=${process.env.NEXT_PUBLIC_API_TOKEN}`
                                );
                                const { data: seller } = await axios.get(
                                    `https://www.ricardo.ch/api/frontend/recruitment/user?userId=${article.sellerId}&apiToken=${process.env.NEXT_PUBLIC_API_TOKEN}`
                                );

                                addBookmark({
                                    articleId: article.id,
                                    title: article.title,
                                    price: article.price,
                                    imageUrl: article.imageUrl,
                                    sellerName: seller.name,
                                });
                            }}
                        />
                    )}
                    <div className="image-container">
                        <Image
                            src={imageUrl}
                            alt="article image"
                            layout="fill"
                            className="image"
                        />
                    </div>
                    <div className="article-info">
                        <p className="title">{title}</p>
                        <div className="end-date">
                            <span className="label">Ending on:</span>
                            <span className="date">
                                {format(new Date(endDate), 'yyyy-MM-dd')}
                                {' at '}
                                {format(new Date(endDate), 'hh:mm:ss')}
                            </span>
                        </div>
                        <div className="price">
                            <span>{price}</span>
                            {price && <span className="currency">CHF</span>}
                        </div>
                    </div>
                </div>
            </CardStyles>
        </Link>
    );
}

Card.propTypes = {
    articleId: PropTypes.string,
    endDate: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
};
