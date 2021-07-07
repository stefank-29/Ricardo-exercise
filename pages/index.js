import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import FormStyles from '../styles/FormStyles';
import ButtonStyles from '../styles/ButtonStyles';
import Carousel from '../components/Carousel';
import { useBookmarks } from '../lib/bookmarksState';
import Head from 'next/head';

const HomeStyles = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
    const { bookmarks } = useBookmarks();

    useEffect(() => setBookmarkedArticles(bookmarks), []);

    const router = useRouter();

    function handleChange(e) {
        if (e.target.value !== '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

        setSearchQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        router.push(`/search/${encodeURIComponent(searchQuery)}/`);
    }

    return (
        <>
            <Head>
                <title>Ricardo - Buy & sell</title>
            </Head>
            <HomeStyles>
                <FormStyles onSubmit={handleSubmit}>
                    <fieldset className="input-container">
                        <legend>Search text</legend>
                        <input
                            onChange={handleChange}
                            placeholder="Search articles"
                            type="text"
                            value={searchQuery}
                        />
                    </fieldset>
                    <ButtonStyles className="submit-btn" disabled={disabled}>
                        <FaSearch className="icon" />
                        <span>Search</span>
                    </ButtonStyles>
                </FormStyles>
                <Carousel title="Bookmarks" items={bookmarkedArticles} />
            </HomeStyles>
        </>
    );
}
