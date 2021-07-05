import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useBookmarks } from '../lib/bookmarksState';
import Image from 'next/image';
import Link from 'next/link';
import { FaBookmark, FaExternalLinkAlt } from 'react-icons/fa';
import { ButtonStyles } from '../styles/InfoStyles';

const BookmarksPageStyles = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 3rem 0;
    .title {
        font-family: Ubuntu, sans-serif;
        font-size: 4rem;
        font-weight: 500;
        margin-bottom: 3rem;
    }
`;

const BookmarkStyles = styled.div`
    display: flex;
    align-items: center;
    min-width: 100%;
    padding: 2rem;
    margin: 0.5rem 0;
    background-color: #fefefe;
    border: 1px solid var(--lightGrey);
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
    .image-container {
        position: relative;
        width: 14rem;
        height: 14rem;
        cursor: pointer;
        margin: 0 1rem;
        .img {
            object-fit: contain;
        }
    }
    & > * + :not(.image-container) {
        flex: 1;
        margin: 0 1rem;
    }
    .article-title {
        font-size: 1.8rem;
        font-family: Ubuntu, sans-serif;
        font-weight: 700;
        color: var(--darkBlue);
        .icon {
            font-size: 0.9rem;
            margin-left: 0.2rem;
            color: var(--grey);
        }
    }
    .seller {
        font-size: 1.7rem;
        padding-left: 4rem;
    }
    .price {
        font-size: 1.7rem;
        padding-left: 4rem;
        font-weight: 700;
        .currency {
            margin-left: 0.2rem;
        }
    }
    .bookmark {
        flex: 1;
        margin-left: auto;
        color: var(--orange);
        font-size: 2rem;
        text-align: center;
        cursor: pointer;
    }
    a {
        display: inline-block;
    }
`;

const HeaderStyles = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    margin: 0.5rem auto 0.5rem 22rem;
    .article-title {
        flex: 1;
    }
    .seller {
        flex: 1;
        margin-right: 2rem;
    }
    .price {
        flex: 1;
    }
`;

export default function BookmarksPage() {
    const { bookmarks, removeBookmark } = useBookmarks();
    const [articles, setArticles] = useState([]);

    useEffect(() => setArticles(bookmarks));

    return (
        <BookmarksPageStyles>
            <div className="title">My bookmarks</div>
            <HeaderStyles>
                <div className="article-title">Article</div>
                <div className="seller">Seller</div>
                <div className="price">Price</div>
            </HeaderStyles>
            {articles.map(
                ({ articleId, title, price, imageUrl, sellerName }) => (
                    <BookmarkStyles key={articleId}>
                        <Link href={`/article/${articleId}`}>
                            <a>
                                <div className="image-container">
                                    <Image
                                        src={imageUrl}
                                        alt="article photo"
                                        layout="fill"
                                        className="img"
                                    />
                                </div>
                            </a>
                        </Link>
                        <div className="article-title">
                            <Link href={`/article/${articleId}`}>
                                <a target="_blank">
                                    <span>{title}</span>
                                    <FaExternalLinkAlt className="icon" />
                                </a>
                            </Link>
                        </div>
                        <div className="seller">{sellerName}</div>

                        <div className="price">
                            {price && (
                                <>
                                    <span>{price}</span>
                                    <span className="currency">CHF</span>
                                </>
                            )}
                        </div>
                        <Link href={`/article/${articleId}`} passHref>
                            <ButtonStyles>Buy now</ButtonStyles>
                        </Link>
                        <div
                            className="bookmark"
                            onClick={() => removeBookmark(articleId)}
                        >
                            <FaBookmark />
                        </div>
                    </BookmarkStyles>
                )
            )}
        </BookmarksPageStyles>
    );
}
