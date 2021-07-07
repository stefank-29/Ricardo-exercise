import styled from 'styled-components';

const FormStyles = styled.form`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 4rem;
    /* padding-right: 15rem; */
    .input-container {
        flex: 1;
        margin-right: 2rem;
        margin-bottom: 0.6rem;
        border: 2px solid var(--lightPurple);
        border-radius: 4px;
        padding: 0.5rem 1rem;
        background-color: #fefefeaa;
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
            ::placeholder {
                font-weight: 700;
            }
        }
    }
`;

export default FormStyles;
