import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegBookmark } from 'react-icons/fa';

const HeaderStyles = styled.header`
    position: relative;
    width: 100%;
    background-color: #ffffff;
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        max-width: 1320px;
        padding: 3.5rem 5rem 4.5rem 0;
        .logo {
            position: relative;
            width: 12rem;
            height: 3.5rem;
            cursor: pointer;
        }
        .bookmarks {
            display: flex;
            align-items: center;
            color: var(--darkGrey);
            font-weight: 700;
            font-size: 1.7rem;
            cursor: pointer;
            .icon {
                margin-right: 0.5rem;
                margin-top: 0.2rem;
            }
            .label {
                :hover {
                    color: var(--black);
                }
            }
        }
    }
    @media all and (max-width: 1320px) {
        padding: 0 2rem;
    }
`;

export default function Header() {
    return (
        <HeaderStyles>
            <div className="container">
                <Link href="/">
                    <a className="logo">
                        <Image
                            src="/logo.svg"
                            alt="Logo of Ricardo"
                            layout="fill"
                        />
                    </a>
                </Link>
                <Link href="/bookmarks">
                    <a className="menu">
                        <div className="bookmarks">
                            <FaRegBookmark className="icon" />
                            <span className="label">Bookmarks</span>
                        </div>
                    </a>
                </Link>
            </div>
        </HeaderStyles>
    );
}
