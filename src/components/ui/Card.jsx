import React from 'react';
import './Card.css';

/**
 * Card
 * Generic content card — use for project cards, tool cards, blog previews, etc.
 * Usage:
 *   <Card hoverable onClick={...}>
 *     <Card.Eyebrow>Web App</Card.Eyebrow>
 *     <Card.Title>Project Name</Card.Title>
 *     <Card.Text>Short description of the project.</Card.Text>
 *   </Card>
 */
const Card = ({ children, hoverable = false, className = '', ...rest }) => {
  const classes = ['ui-card', hoverable ? 'ui-card--hoverable' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

const Eyebrow = ({ children }) => <span className="ui-card__eyebrow">{children}</span>;
const Title = ({ children }) => <h3 className="ui-card__title">{children}</h3>;
const Text = ({ children }) => <p className="ui-card__text">{children}</p>;
const Footer = ({ children }) => <div className="ui-card__footer">{children}</div>;

Card.Eyebrow = Eyebrow;
Card.Title = Title;
Card.Text = Text;
Card.Footer = Footer;

export default Card;
