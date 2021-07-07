import styled from 'styled-components';

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

export default ButtonStyles;
