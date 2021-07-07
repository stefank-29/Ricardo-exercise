import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBookmark, FaExternalLinkAlt } from 'react-icons/fa';
import styled from 'styled-components';
import Message from '../components/Message';
import { useBookmarks } from '../lib/bookmarksState';
import BookmarkStyles from '../styles/BookmarkStyles';
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

    useEffect(() => setArticles(bookmarks), [bookmarks]);

    return (
        <>
            <Head>
                <title>Ricardo - Bookmarks</title>
            </Head>
            <BookmarksPageStyles>
                <div className="title">My bookmarks</div>
                {articles.length > 0 ? (
                    <>
                        <HeaderStyles>
                            <div className="article-title">Article</div>
                            <div className="seller">Seller</div>
                            <div className="price">Price</div>
                        </HeaderStyles>
                        {articles.map(
                            ({
                                articleId,
                                title,
                                price,
                                imageUrl,
                                sellerName,
                            }) => (
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
                                                <span className="currency">
                                                    CHF
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <Link
                                        href={`/article/${articleId}`}
                                        passHref
                                    >
                                        <ButtonStyles>Buy now</ButtonStyles>
                                    </Link>
                                    <div
                                        className="bookmark"
                                        onClick={() =>
                                            removeBookmark(articleId)
                                        }
                                    >
                                        <FaBookmark />
                                    </div>
                                </BookmarkStyles>
                            )
                        )}
                    </>
                ) : (
                    <Message
                        header="You don't have any saved articles yet"
                        info="As soon as you see articles that you like, add them to your wish
                    list! So you won't miss a sale."
                        buttonText="LET'S START LOOKING"
                        imageUrl="/empty.svg"
                        buttonRoute="/"
                    ></Message>
                )}
            </BookmarksPageStyles>
        </>
    );
}
