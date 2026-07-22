import React from 'react';
import './Badge.css';

/**
 * Badge
 * Small status/label pill. Use for tags like "Live", "In progress", tech stack labels.
 * Usage:
 *   <Badge>React</Badge>
 *   <Badge tone="success">Live</Badge>
 *   <Badge tone="warning">In progress</Badge>
 */
const Badge = ({ children, tone = 'neutral', className = '', ...rest }) => {
  const classes = ['ui-badge', `ui-badge--${tone}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
