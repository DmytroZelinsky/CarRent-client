import React from 'react';
import '../Card/Card.css'

type Props = {
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined,
    children : any
}

const Card = ({ children, onClick } : Props) => {
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

const Header = (props : any) => <div className='card-info-header'><p style={{fontSize:'24px', margin:'0'}}><b>{props.children}</b></p></div>;
Card.Header = Header;

const Body = (props : any) => <div className='card-info-body'>{props.children}</div>;
Card.Body = Body;

const Footer = (props: any) => <div className='card-footer'>{props.children}</div>;
Card.Footer = Footer;

export default Card;
