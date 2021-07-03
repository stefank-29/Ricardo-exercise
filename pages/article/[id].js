import axios from 'axios';
import styled from 'styled-components';
import Image from 'next/image';

const DetailsPageStyles = styled.div`
    width: 100%;
    display: flex;
    padding-top: 4rem;
`;

const ImageStyles = styled.div`
    position: relative;
    flex: 1;
    height: 55rem;
    overflow: hidden;
    background-color: #f3f3f3;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
    .image {
        border-radius: 5px;
        object-fit: contain;
        transition: all 0.5s;
        :hover {
            object-fit: cover;
            transform: scale(1.1);
        }
    }
`;

const InfoStyles = styled.div`
    flex: 1;
    margin-left: 3rem;
    padding: 3rem;
    background-color: #f3f3f3;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
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
        .label {
            font-weight: 700;
        }
        .seller {
            margin: 0.5rem 0;
        }
        .price {
            margin: 0.5rem 0;
        }
    }
    .description {
        padding-top: 2rem;
    }
`;

export default function DetailsPage({
    articleId,
    title,
    subtitle,
    price,
    descriptionHtml,
    imageUrl,
    sellerId,
    sellerName,
}) {
    return (
        <DetailsPageStyles>
            <ImageStyles>
                <Image
                    className="image"
                    src={imageUrl}
                    alt="Article image"
                    layout="fill"
                />
            </ImageStyles>
            <InfoStyles>
                <div className="header">
                    <div className="title">{title}</div>
                    {subtitle && <div className="subtitle">{subtitle}</div>}
                </div>
                <div className="sell-info">
                    <div className="seller">
                        <span className="label">Seller: </span>
                        <span>{sellerName}</span>
                    </div>
                    <div className="price">
                        <span className="label">Price: </span>
                        <span>{price}</span>
                    </div>
                </div>
                <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                ></div>
            </InfoStyles>
        </DetailsPageStyles>
    );
}

export async function getServerSideProps(context) {
    const { data: articleDetails } = await axios.get(
        `https://www.ricardo.ch/api/frontend/recruitment/article-details?articleId=${context.params.id}&apiToken=${process.env.apiToken}`
    );

    const { data: seller } = await axios.get(
        `https://www.ricardo.ch/api/frontend/recruitment/user?userId=${articleDetails.sellerId}&apiToken=${process.env.apiToken}`
    );

    console.log(articleDetails.descriptionHtml);

    return {
        props: {
            articleId: articleDetails.id,
            title: articleDetails.title,
            subtitle:
                articleDetails.subtitle !== undefined
                    ? articleDetails.subtitle
                    : null,
            price: articleDetails.price,
            imageUrl: articleDetails.imageUrl,
            descriptionHtml: articleDetails.descriptionHtml,
            sellerId: articleDetails.sellerId,
            sellerName: seller.name,
        },
    };
}

// TODO
DetailsPage.propTypes = {};
