import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from '../../components/Card';

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
    return (
        <SearchPageStyles>
            <p className="total">{`${totalCount} results`}</p>
            <ArticlesStyles>
                {articles.map((article) => (
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
        </SearchPageStyles>
    );
}

export async function getServerSideProps(context) {
    const { data } = await axios.get(
        `https://www.ricardo.ch/api/frontend/recruitment/search?searchText=${context.params.text}&apiToken=${process.env.apiToken}`
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
