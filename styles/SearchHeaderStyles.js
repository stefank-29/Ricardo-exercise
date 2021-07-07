import styled from 'styled-components';

const HeaderStyles = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .total {
        font-size: 1.7rem;
        color: var(--grey);
        margin-bottom: 3rem;
    }
    .filter {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
        margin-left: auto;
        margin-right: 5rem;
        .label {
            margin-right: 2rem;
        }
        .slider {
            width: 20rem;
        }
        .MuiSlider-colorPrimary {
            color: var(--darkBlue);
        }
        .MuiSlider-valueLabel {
            font-size: 1rem;
        }
        .MuiSlider-markLabel {
            font-size: 1.5rem;
            color: var(--grey);
        }
    }
    .sort {
        display: flex;
        align-items: center;
        justify-content: center;
        .label {
            margin-right: 0.5rem;
        }
        .select {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            background-color: #fefefeaa;
            box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            .selected {
                font-weight: 500;
                color: var(--darkBlue);
            }
            .arrow {
                margin-top: 0.2rem;
                margin-left: 0.2rem;
            }
        }
    }
`;

export default HeaderStyles;
