import styled from 'styled-components';
import PropTypes from 'prop-types';
import Image from 'next/image';

const CardStyles = styled.div`
    margin: 2.5rem;
    width: 20rem;
    background-color: #fefefe;
    border-radius: 5px;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    .image-container {
        position: relative;
        width: 100%;
        height: 20rem;
        .image {
            object-fit: cover;
            border-radius: 5px 5px 0 0;
        }
    }
    .article-info {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        .title {
            margin: 0.5rem 0;
            font-size: 1.6rem;
            font-weight: 500;
        }
        .end-date {
            margin: 0.5rem 0;
            font-size: 1.3rem;
            line-height: 1.4;
            .label {
                color: var(--grey);
                margin-right: 0.3rem;
            }
            .date {
            }
        }
        .price {
            font-size: 1.6rem;
            .currency {
                margin-left: 0.3rem;
            }
        }
    }
`;

export default function Card({
    id,
    title = 'Fifa E-Football Anhänger',
    endDate = '2021-07-02T10:41:00Z',
    imageUrl = 'https://img.ricardostatic.ch/t_200x150/pl/1146437802/6/1/fifa-e-football-anhanger.jpg',
    price = 5,
}) {
    return (
        <CardStyles>
            <div className="image-container">
                <Image
                    src={imageUrl}
                    alt="article image"
                    layout="fill"
                    className="image"
                />
            </div>
            <div className="article-info">
                <p className="title">{title}</p>
                <div className="end-date">
                    <span className="label">Ending on:</span>
                    <span className="date">{endDate}</span>
                </div>
                <div className="price">
                    <span>{price}</span>
                    <span className="currency">CHF</span>
                </div>
            </div>
        </CardStyles>
    );
}

Card.propTypes = {};
