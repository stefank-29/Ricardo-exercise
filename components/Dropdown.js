import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

const DropdownStyles = styled.div`
    position: absolute;
    top: 3rem;
    left: 0;
    width: auto;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #fefefe;
    white-space: nowrap;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
    z-index: 10;
    .item {
        padding: 1rem 1.5rem;
        :hover {
            background-color: #f3f3f3;
        }
    }
`;

function Dropdown({ items, onItemClick, onClickOutside }) {
    Dropdown.handleClickOutside = () => onClickOutside();

    return (
        <DropdownStyles>
            {items.map((item) => (
                <div
                    key={item.id}
                    className="item"
                    onClick={() => onItemClick(item)}
                >
                    {item.text}
                </div>
            ))}
        </DropdownStyles>
    );
}

const clickOutsideConfig = {
    handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
