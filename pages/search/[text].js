import axios from 'axios';
import { useRouter } from 'next/router';
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
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
`;

export default function SearchPage({ articles, totalCount }) {
    const router = useRouter();
    const { text } = router.query;
    console.log(articles);
    console.log(totalCount);

    return (
        <SearchPageStyles>
            <p className="total">{`${totalCount} results`}</p>
            <ArticlesStyles>{}</ArticlesStyles>
        </SearchPageStyles>
    );
}

export async function getServerSideProps(context) {
    const res = await axios.get(
        `https://www.ricardo.ch/api/frontend/recruitment/search?searchText=${context.params.text}&apiToken=${process.env.apiToken}`
    );

    return {
        props: {
            articles: res.data.articles,
            totalCount: res.data.totalCount,
        },
    };
}

SearchPage.propTypes = {
    articles: PropTypes.array,
    totalCount: PropTypes.number,
};
