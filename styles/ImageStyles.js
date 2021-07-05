import styled from 'styled-components';

const ImageStyles = styled.div.attrs((props) => ({
    translateImg: props.translateImg,
}))`
    position: relative;
    flex: 1;
    height: 55rem;
    overflow: hidden;
    background-color: #f3f3f3;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
    z-index: 3;
    .image-container {
        width: 100%;
        height: 100%;
        :hover {
            transform: scale(1.5) ${(props) => props.translateImg};
        }
        .image {
            border-radius: 5px;
            object-fit: contain;
            transition: all 0.5s;
            :hover {
                object-fit: cover;
            }
        }
    }
`;

export default ImageStyles;
