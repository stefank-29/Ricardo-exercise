import styled from 'styled-components';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { format } from 'date-fns';

const CardStyles = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 0;
    width: 100%;
    background-color: #fefefe;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    :hover {
        box-shadow: 0 0 7px 3px rgba(0, 0, 0, 0.2);
    }
    .image-container {
        position: relative;
        width: 100%;
        height: 22rem;
        background-color: #f3f3f3;
        border-radius: 5px 5px 0 0;
        .image {
            object-fit: contain;
            border-radius: 5px 5px 0 0;
        }
    }
    .article-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1rem;
        .title {
            margin: 0.5rem 0 auto;
            font-size: 1.6rem;
            font-weight: 500;
        }
        .end-date {
            margin: 1rem 0;
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
            height: 1.6rem;
            font-size: 1.6rem;
            .currency {
                margin-left: 0.3rem;
            }
        }
    }
`;

export default function Card({ id, title, endDate, imageUrl, price }) {
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
                    <span className="date">
                        {format(new Date(endDate), 'yyyy-MM-dd')}
                        {' at '}
                        {format(new Date(endDate), 'hh:mm:ss')}
                    </span>
                </div>
                <div className="price">
                    <span>{price}</span>
                    {price && <span className="currency">CHF</span>}
                </div>
            </div>
        </CardStyles>
    );
}

Card.propTypes = {};
