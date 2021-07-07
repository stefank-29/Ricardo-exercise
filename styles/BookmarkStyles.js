import styled from 'styled-components';

const BookmarkStyles = styled.div`
    display: flex;
    align-items: center;
    min-width: 100%;
    padding: 2rem;
    margin: 0.5rem 0;
    background-color: #fefefe;
    border: 1px solid var(--lightGrey);
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
    .image-container {
        position: relative;
        width: 14rem;
        height: 14rem;
        cursor: pointer;
        margin: 0 1rem;
        .img {
            object-fit: contain;
        }
    }
    & > * + :not(.image-container) {
        flex: 1;
        margin: 0 1rem;
    }
    .article-title {
        font-size: 1.8rem;
        font-family: Ubuntu, sans-serif;
        font-weight: 700;
        color: var(--darkBlue);
        .icon {
            font-size: 0.9rem;
            margin-left: 0.2rem;
            color: var(--grey);
        }
    }
    .seller {
        font-size: 1.7rem;
        padding-left: 4rem;
    }
    .price {
        font-size: 1.7rem;
        padding-left: 4rem;
        font-weight: 700;
        .currency {
            margin-left: 0.2rem;
        }
    }
    .bookmark {
        flex: 1;
        margin-left: auto;
        color: var(--orange);
        font-size: 2rem;
        text-align: center;
        cursor: pointer;
    }
    a {
        display: inline-block;
    }
`;

export default BookmarkStyles;
