import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
    html{
        font-size: 62.5%;
        box-sizing: border-box;

        --black: #222222;
        --orange: #EF7310;
        --grey: #555555;
    }

    body{
        padding: 0;
        margin: 0;
        font-family: 'Roboto', Arial, Helvetica, sans-serif;
        font-size: 1.5rem;

    }

    a{
        color: inherit;
        text-decoration: none;
        :hover{
            text-decoration: underline;
        }
    }

    *, *:before, *:after{
        box-sizing: inherit;
    }
`;

const InnerStyles = styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 1300px;
    min-height: calc(100vh - 12rem);
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
