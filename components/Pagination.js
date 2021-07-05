import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

const PaginationStyles = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem auto 3rem;
    .number {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.2rem 1rem;
        margin: 0 0.3rem;
        color: var(--darkBlue);
        font-weight: 700;
        background-color: #fefefe;
        border: none;
        border-radius: 5px;

        cursor: pointer;
        &.active {
            color: #fefefe;
            background-color: var(--darkBlue);
        }
    }
    .arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.2rem 1.5rem;
        margin: 0 2rem;
        color: #bfbfbf;
        border-radius: 5px;
        pointer-events: none;
        transition: background 0.3s ease-in-out;
        &.active {
            color: var(--darkBlue);
            cursor: pointer;
            pointer-events: auto;
            :hover {
                background-color: rgba(13, 52, 191, 0.15);
            }
        }
    }
`;

export default function Pagination({ numOfPages, currPage }) {
    const router = useRouter();

    function prevPage() {
        if (currPage > 1) {
            router.push(`/search/${router.query.text}/?page=${currPage - 1}`);
        }
    }

    function nextPage() {
        if (currPage < numOfPages) {
            router.push(`/search/${router.query.text}/?page=${currPage + 1}`);
        }
    }

    function changeToPage(page) {
        router.push(`/search/${router.query.text}/?page=${page}`);
    }

    return (
        <PaginationStyles>
            <span
                className={`arrow ${currPage > 1 ? 'active' : ''}`}
                onClick={prevPage}
            >
                <FaChevronLeft />
            </span>
            {[...Array(numOfPages)].map((_, index) => (
                <div
                    key={index}
                    className={`number ${
                        currPage === index + 1 ? 'active' : ''
                    }`}
                    onClick={() => changeToPage(index + 1)}
                >
                    {index + 1}
                </div>
            ))}
            <span
                className={`arrow ${currPage < numOfPages ? 'active' : ''}`}
                onClick={nextPage}
            >
                <FaChevronRight />
            </span>
        </PaginationStyles>
    );
}
