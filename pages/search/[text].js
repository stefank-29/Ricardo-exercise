import axios from 'axios';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import { FaChevronDown } from 'react-icons/fa';
import HeaderStyles from '../../styles/SearchHeaderStyles';
import Dropdown from '../../components/Dropdown';
import { sortings } from '../../lib/dropdownItems';

const SearchPageStyles = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
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
    const [selectedSort, setSelectedSort] = useState({
        text: 'Relevance',
        type: 'relevance',
    });
    const [sortVisible, setSortVisible] = useState(false);
    const [sortedArticles, setSortedArticles] = useState([]);

    const router = useRouter();

    const articlesPerPage = 20;

    useEffect(() => {
        const pagesNum = Math.ceil(articles.length / articlesPerPage);
        setNumOfPages(pagesNum);
        setSortedArticles([...articles]);
    }, []);

    useEffect(() => {
        if (router.query.page === undefined) {
            setPage(1);
        } else {
            const pageNum = parseInt(router.query.page);
            if (pageNum > numOfPages) {
                setPage(numOfPages);
            } else {
                setPage(pageNum);
            }
        }
    });

    useEffect(() => {
        let sorted = [];
        switch (selectedSort.type) {
            case 'relevance':
                sorted = articles.sort(() => Math.random() - 0.5);
                break;
            case 'lowest':
                sorted = articles.sort((a, b) => {
                    return (
                        (a.buyNowPrice != null ? a.buyNowPrice : Infinity) -
                        (b.buyNowPrice != null ? b.buyNowPrice : Infinity)
                    );
                });
                break;
            case 'highest':
                sorted = articles.sort(
                    (a, b) =>
                        (b.buyNowPrice != null ? b.buyNowPrice : -Infinity) -
                        (a.buyNowPrice != null ? a.buyNowPrice : -Infinity)
                );
                break;
            case 'alphabetical':
                sorted = articles.sort((a, b) => (a.title > b.title ? 1 : -1));
                break;
            case 'ending':
                sorted = articles.sort(
                    (a, b) => new Date(a.endDate) - new Date(b.endDate)
                );
                break;
            default:
                break;
        }

        setSortedArticles([...sorted]);
    }, [selectedSort]);

    return (
        <SearchPageStyles>
            <HeaderStyles>
                <p className="total">{`${totalCount} results`}</p>
                <div
                    className="sort"
                    onClick={() => setSortVisible(!sortVisible)}
                >
                    <span className="label">Sorted by:</span>
                    <div className="select">
                        <span className="selected">{selectedSort.text}</span>
                        <FaChevronDown className="arrow" />
                        {sortVisible && (
                            <Dropdown
                                items={sortings}
                                onClickOutside={() => setSortVisible(false)}
                                onItemClick={(item) => {
                                    if (item.type !== selectedSort.type) {
                                        setSelectedSort({
                                            text: item.text,
                                            type: item.type,
                                        });
                                    }
                                }}
                                outsideClickIgnoreClass="select"
                            />
                        )}
                    </div>
                </div>
            </HeaderStyles>
            <ArticlesStyles>
                {sortedArticles
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
