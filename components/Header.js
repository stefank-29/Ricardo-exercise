import styled from 'styled-components';
import Image from 'next/image';

const HeaderStyles = styled.header`
    position: relative;
    width: 100%;
    padding: 0 30rem;
    background-color: #ffffff;
    .container {
        width: 100%;
        padding: 2.5rem 0 5rem;
        .logo {
            position: relative;
            width: 12rem;
            height: 3.5rem;
            cursor: pointer;
        }
    }
`;

export default function Header() {
    return (
        <HeaderStyles>
            <div className="container">
                <div className="logo">
                    <Image
                        src="/logo.svg"
                        alt="Logo of Ricardo"
                        layout="fill"
                    />
                </div>
            </div>
        </HeaderStyles>
    );
}
