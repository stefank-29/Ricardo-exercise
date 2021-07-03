import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

const HomeStyles = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const FormStyles = styled.form`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 4rem;
    padding-right: 15rem;
    .input-container {
        flex: 1;
        margin-right: 2rem;
        margin-bottom: 0.6rem;
        border: 2px solid var(--lightPurple);
        border-radius: 4px;
        padding: 0.5rem 1rem;
        background-color: #fefefe77;
        :hover,
        :focus-within {
            box-shadow: 0 0 4px 1px #668aff55;
        }
        legend {
            color: var(--lightPurple);
        }
        input {
            width: 100%;
            height: 100%;
            padding: 0.6rem 1rem 0.8rem;
            font-size: 1.6rem;
            background: none;
            border: none;
            outline: none;
        }
    }
`;

const ButtonStyles = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.7rem 1.5rem;
    text-transform: uppercase;
    color: var(--purple);
    font-weight: 600;
    border: 1px solid var(--purple);
    border-radius: 4px;
    background-color: #e6ecff;
    transition: background 0.3s;
    cursor: pointer;
    :hover:not(:disabled) {
        background-color: #ccd8ff;
    }
    :disabled {
        cursor: default;
        opacity: 0.75;
    }
    .icon {
        margin-right: 1rem;
    }
`;

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [disabled, setDisabled] = useState(true);

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

        router.push(`/search/${searchQuery}`);
    }

    return (
        <HomeStyles>
            <FormStyles onSubmit={handleSubmit}>
                <fieldset className="input-container">
                    <legend>Search text</legend>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleChange}
                    />
                </fieldset>
                <ButtonStyles className="submit-btn" disabled={disabled}>
                    <FaSearch className="icon" />
                    <span>Search</span>
                </ButtonStyles>
            </FormStyles>
        </HomeStyles>
    );
}
