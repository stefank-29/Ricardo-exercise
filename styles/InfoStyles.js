import styled from 'styled-components';

const InfoStyles = styled.div`
    position: relative;
    flex: 1;
    max-width: 50%;
    max-height: ${(props) => props.maxHeight};
    overflow: hidden;
    margin-left: 3rem;
    padding: 3.5rem;
    padding-bottom: ${(props) => props.paddingBottom};
    background-color: #f7f7f7;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
    .details-container {
        overflow-x: auto;
        .header {
            margin-bottom: 5rem;
            .title {
                font-size: 3.4rem;
                font-weight: 700;
                margin-bottom: 1rem;
            }
            .subtitle {
                font-size: 2.2rem;
                margin-bottom: 1rem;
            }
        }
        .sell-info {
            display: block;
            align-items: center;
            justify-content: space-between;
            ::before {
                content: '';
                display: block;
                height: 2px;
                width: 85%;
                margin: 0 auto 3rem;
                background-color: var(--lightGrey);
            }
            ::after {
                content: '';
                display: block;
                height: 2px;
                width: 85%;
                margin: 3rem auto 0;
                background-color: var(--lightGrey);
            }
            .container-flex {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-right: 3rem;
                .label {
                    font-weight: 700;
                }
                .seller {
                    margin: 0.5rem 0;
                }
                .price {
                    margin: 0.5rem 0;
                    .currency {
                        margin-left: 0.1rem;
                    }
                }
                .bookmark-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    width: 14rem;
                    font-weight: 600;
                    cursor: pointer;
                    background-color: rgba(239, 115, 16, 0.1);
                    border: 1px solid var(--lightGrey);
                    border-radius: 5px;
                    transition: background 0.3s ease-in-out;
                    :hover {
                        background-color: rgba(239, 115, 16, 0.3);
                    }
                    .icon {
                        color: var(--orange);
                        font-size: 1.7rem;
                        margin-right: 0.3rem;
                    }
                }
            }
        }
    }
    .description {
        padding-top: 2rem;
    }
    .show-more {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #fefefe;
        box-shadow: ${(props) => props.shadow};
        span {
            padding: 1.5rem;
            font-weight: 600;
            cursor: pointer;
        }
    }
`;
export default InfoStyles;
