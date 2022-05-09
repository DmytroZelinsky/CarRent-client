import React from 'react';
import '../Card/Card.css'

type Props = {
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined,
    children : any,
    className?: any,
    pointer?: boolean,
    style?: React.CSSProperties,
    bodyStyle?: React.CSSProperties,
}

const Card = ({ children, onClick, className, pointer, style } : Props) => {
    let subComponentList = Object.keys(Card);

    let subComponents = subComponentList.map((key) => {
        return React.Children.map(children, (child) =>
            child.type.name === key ? child : null
        );
    });

    return (
        <>
            <div onClick={onClick} className={className + ' card-info'}  style={style}>
                {subComponents.map((component) => component)}
            </div>
        </>
    );
};

const Header = (props : any) => <div className='card-info-header'><b>{props.children}</b></div>;
Card.Header = Header;

const Body = (props : any) => <div style={props.style} className='card-info-body'>{props.children}</div>;
Card.Body = Body;

const Footer = (props: any) => <div className='card-footer'>{props.children}</div>;
Card.Footer = Footer;

export default Card;
