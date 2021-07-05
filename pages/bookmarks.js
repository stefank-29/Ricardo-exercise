import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useBookmarks } from '../lib/bookmarksState';

const BookmarksPageStyles = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 3rem;
    .title {
        font-size: 4rem;
        font-weight: 500;
        margin-bottom: 3rem;
    }
`;

export default function BookmarksPage() {
    const { bookmarks } = useBookmarks();
    const [articles, setArticles] = useState([]);

    useEffect(() => setArticles(bookmarks));

    return (
        <BookmarksPageStyles>
            <div className="title">My bookmarks</div>
            {articles.map((article) => (
                <div key={article.articleId}>{article.articleId}</div>
            ))}
        </BookmarksPageStyles>
    );
}
