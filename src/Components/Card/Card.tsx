import React from 'react';
import '../Card/Card.css'
const Card = ({ children, onClick }) => {
    let subComponentList = Object.keys(Card);

    let subComponents = subComponentList.map((key) => {
        return React.Children.map(children, (child) =>
            child.type.name === key ? child : null
        );
    });

    return (
        <>
            <div onClick={onClick} className='card-info'>
                {subComponents.map((component) => component)}
            </div>
        </>
    );
};

const Header = (props) => <div className='card-info-header'>{props.children}</div>;
Card.Header = Header;

const Body = (props) => <div className='card-info-body'>{props.children}</div>;
Card.Body = Body;

export default Card;