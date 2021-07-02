import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const HeaderStyles = styled.header`
    position: relative;
    width: 100%;
    padding: 0 30rem;
    background-color: #ffffff;
    .container {
        width: 100%;
        padding: 3.5rem 0 4.5rem;
        .logo {
            position: relative;
            width: 12rem;
            height: 3.5rem;
            cursor: pointer;
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
                    <div className="logo">
                        <Image
                            src="/logo.svg"
                            alt="Logo of Ricardo"
                            layout="fill"
                        />
                    </div>
                </Link>
            </div>
        </HeaderStyles>
    );
}
