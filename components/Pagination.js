import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/router';
import PaginationStyles from '../styles/PaginationStyles';
import { PropTypes } from 'prop-types';

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

Pagination.propTypes = {
    numOfPages: PropTypes.number,
    currPage: PropTypes.number,
};
