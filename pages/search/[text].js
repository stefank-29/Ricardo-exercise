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
import Slider from '@material-ui/core/Slider';
import useDidMountEffect from '../../lib/useDidMountEffect';
import Head from 'next/head';
import Message from '../../components/Message';

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
    const [priceFilter, setPriceFilter] = useState([0, Infinity]);
    const [rangeLimit, setRangeLimit] = useState({ min: 0, max: 100 });

    const router = useRouter();

    const articlesPerPage = 20;
    const marks = [
        {
            value: rangeLimit.min,
            label: rangeLimit.min,
        },

        {
            value: rangeLimit.max,
            label: rangeLimit.max,
        },
    ];

    function handleRangeChange(event, newValue) {
        setPriceFilter(newValue);
    }

    function sortArticles(sortedArticles, type) {
        let sorted = [];
        switch (type) {
            case 'relevance':
                sorted = sortedArticles.sort(() => Math.random() - 0.5);
                break;
            case 'lowest':
                sorted = sortedArticles.sort((a, b) => {
                    return (
                        (a.buyNowPrice != null ? a.buyNowPrice : Infinity) -
                        (b.buyNowPrice != null ? b.buyNowPrice : Infinity)
                    );
                });
                break;
            case 'highest':
                sorted = sortedArticles.sort(
                    (a, b) =>
                        (b.buyNowPrice != null ? b.buyNowPrice : -Infinity) -
                        (a.buyNowPrice != null ? a.buyNowPrice : -Infinity)
                );
                break;
            case 'alphabetical':
                sorted = sortedArticles.sort((a, b) =>
                    a.title > b.title ? 1 : -1
                );
                break;
            case 'ending':
                sorted = sortedArticles.sort(
                    (a, b) => new Date(a.endDate) - new Date(b.endDate)
                );
                break;
            default:
                break;
        }

        setSortedArticles([...sorted]);
    }

    function filterArticles() {
        if (sortedArticles.length == 0) return;
        let filtered = articles.filter((article) => {
            if (article.buyNowPrice === null) {
                return true;
            }
            if (
                article.buyNowPrice >= priceFilter[0] &&
                article.buyNowPrice <= priceFilter[1]
            ) {
                return true;
            } else {
                return false;
            }
        });
        const pagesNum = Math.ceil(filtered.length / articlesPerPage);
        setNumOfPages(pagesNum);

        sortArticles(filtered, selectedSort.type);
    }

    useEffect(() => {
        // number of pages
        const pagesNum = Math.ceil(articles.length / articlesPerPage);
        setNumOfPages(pagesNum);
        setSortedArticles([...articles]);

        // range limit
        const min = articles.reduce((min, article) => {
            if (article.buyNowPrice === null) return min;
            return article.buyNowPrice < min ? article.buyNowPrice : min;
        }, Infinity);
        const max = articles.reduce((max, article) => {
            if (article.buyNowPrice === null) return max;
            return article.buyNowPrice > max ? article.buyNowPrice : max;
        }, -Infinity);
        setPriceFilter([min, max]);
        setRangeLimit({ min, max });
    }, []);

    // page number
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
    }, [router.asPath]);

    // sorting
    useDidMountEffect(() => {
        sortArticles(sortedArticles, selectedSort.type);
    }, [selectedSort]);

    //filtering
    useDidMountEffect(() => {
        filterArticles();
    }, [priceFilter]);

    return (
        <>
            <Head>
                <title>
                    Ricardo - The largest online marketplace in Switzerland
                </title>
            </Head>
            <SearchPageStyles>
                {sortedArticles.length > 0 ? (
                    <>
                        <HeaderStyles>
                            <p className="total">{`${totalCount} results`}</p>
                            <div className="filter">
                                <span className="label">Price:</span>
                                <Slider
                                    className="slider"
                                    value={priceFilter}
                                    onChange={handleRangeChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    marks={marks}
                                    min={rangeLimit.min}
                                    max={rangeLimit.max}
                                />
                            </div>
                            <div
                                className="sort"
                                onClick={() => setSortVisible(!sortVisible)}
                            >
                                <span className="label">Sorted by:</span>
                                <div className="select">
                                    <span className="selected">
                                        {selectedSort.text}
                                    </span>
                                    <FaChevronDown className="arrow" />
                                    {sortVisible && (
                                        <Dropdown
                                            items={sortings}
                                            onClickOutside={() =>
                                                setSortVisible(false)
                                            }
                                            onItemClick={(item) => {
                                                if (
                                                    item.type !==
                                                    selectedSort.type
                                                ) {
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
                                .slice(
                                    (page - 1) * articlesPerPage,
                                    page * articlesPerPage
                                )
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
                        <Pagination numOfPages={numOfPages} currPage={page} />{' '}
                    </>
                ) : (
                    <Message
                        buttonRoute="/"
                        buttonText="Return to Home"
                        header={`Sorry, we can't find anything for "${router.query.text}"`}
                        imageUrl="/not-found.png"
                    />
                )}
            </SearchPageStyles>
        </>
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
