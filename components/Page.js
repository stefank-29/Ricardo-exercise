import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
    html{
        font-size: 62.5%;
        box-sizing: border-box;

        --black: #222222;
        --orange: #EF7310;
        --grey: #555555;
        --darkGrey: #404040;
        --lightGrey: #d9d9d9;
        --blue: #0066ff;
        --darkBlue: #0d34bf;
        --purple: #3366ff;
        --lightPurple: rgba(51, 99, 255, 0.7);
    }

    body{
        padding: 0;
        margin: 0;
        font-family: 'Roboto', Arial, Helvetica, sans-serif;
        font-size: 1.5rem;
        background-color: #f3f3f3;
    }

    a{
        color: inherit;
        text-decoration: none;
    }

    *, *:before, *:after{
        box-sizing: inherit;
    }
`;

const InnerStyles = styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 1320px;
    min-height: calc(100vh - 12rem);
    @media all and (max-width: 1320px) {
        max-width: 900px;
        width: 100%;
        padding: 2rem;
    }
`;

export default function Page({ children }) {
    return (
        <div>
            <GlobalStyles />
            <Header />
            <InnerStyles>{children}</InnerStyles>
        </div>
    );
}

Page.propTypes = {
    children: PropTypes.any,
};
