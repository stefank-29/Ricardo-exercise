import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from '../../components/Card';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';

const SearchPageStyles = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    .total {
        font-size: 1.7rem;
        color: var(--grey);
        margin-bottom: 3rem;
    }
`;

const ArticlesStyles = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
    padding-bottom: 3rem;
`;

export default function SearchPage({ articles, totalCount }) {
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();

    const router = useRouter();

    const articlesPerPage = 20;

    useEffect(() => {
        const pagesNum = Math.ceil(articles.length / articlesPerPage);
        setNumOfPages(pagesNum);
        if (router.query.page === undefined) {
            setPage(1);
        } else {
            const pageNum = parseInt(router.query.page);
            if (pageNum > pagesNum) {
                setPage(numOfPages);
            } else {
                setPage(pageNum);
            }
        }
    });

    return (
        <SearchPageStyles>
            <p className="total">{`${totalCount} results`}</p>
            <ArticlesStyles>
                {articles
                    .slice((page - 1) * articlesPerPage, page * articlesPerPage)
                    .map((article) => (
                        <Card
                            key={article.id}
                            articleId={article.id}
                            endDate={article.endDate}
                            price={article.buyNowPrice}
                            imageUrl={article.imageUrl}
                            title={article.title}
                        />
                    ))}
            </ArticlesStyles>
            <Pagination numOfPages={numOfPages} currPage={page} />
        </SearchPageStyles>
    );
}

export async function getServerSideProps(context) {
    const { data } = await axios.get(
        `https://www.ricardo.ch/api/frontend/recruitment/search?searchText=${encodeURI(
            context.params.text
        )}&apiToken=${process.env.NEXT_PUBLIC_API_TOKEN}`
    );

    return {
        props: {
            articles: data.articles,
            totalCount: data.totalCount,
        },
    };
}

SearchPage.propTypes = {
    articles: PropTypes.array,
    totalCount: PropTypes.number,
};
