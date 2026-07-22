import React from 'react';
import './Button.css';

/**
 * Button
 * Usage:
 *   <Button>Default</Button>
 *   <Button variant="secondary">Secondary</Button>
 *   <Button variant="ghost" size="sm">Small ghost</Button>
 *   <Button as="a" href="/contact">Link styled as button</Button>
 *   <Button loading>Saving...</Button>
 */
const Button = ({
  children,
  variant = 'primary',   // 'primary' | 'secondary' | 'ghost'
  size = 'md',            // 'sm' | 'md' | 'lg'
  as = 'button',           // 'button' | 'a'
  loading = false,
  disabled = false,
  className = '',
  ...rest
}) => {
  const Tag = as;
  const classes = [
    'ui-btn',
    `ui-btn--${variant}`,
    `ui-btn--${size}`,
    loading ? 'ui-btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} disabled={as === 'button' ? disabled || loading : undefined} {...rest}>
      {loading && <span className="ui-btn__spinner" aria-hidden="true" />}
      <span className="ui-btn__label">{children}</span>
    </Tag>
  );
};

export default Button;
