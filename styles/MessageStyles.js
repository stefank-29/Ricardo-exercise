import styled from 'styled-components';

const MessageStyles = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .header {
        margin: 2rem;
        font-size: 4rem;
        font-weight: 500;
    }
    .image {
        position: relative;
        width: 25rem;
        height: 25rem;
    }
    .info {
        width: 30%;
        text-align: center;
        margin: 2rem auto;
    }
`;

export default MessageStyles;
