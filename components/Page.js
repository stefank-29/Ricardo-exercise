import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    html{
        font-size: 62.5%;
        box-sizing: border-box;
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
    margin: 0 auto;
    max-width: 1200px;
`;

export default function Page({ children }) {
    return (
        <div>
            <GlobalStyles />
            <InnerStyles>{children}</InnerStyles>
        </div>
    );
}
