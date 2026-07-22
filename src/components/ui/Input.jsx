import React, { useId } from 'react';
import './Input.css';

/**
 * Input
 * Labeled text input / textarea for forms (contact form, newsletter, etc).
 * Usage:
 *   <Input label="Your email" type="email" name="email" required />
 *   <Input label="Message" as="textarea" rows={5} name="message" />
 *   <Input label="Name" error="Name is required" />
 */
const Input = ({
  label,
  as = 'input',   // 'input' | 'textarea'
  error,
  className = '',
  id,
  ...rest
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const Tag = as;

  return (
    <div className={`ui-field ${className}`}>
      {label && (
        <label htmlFor={inputId} className="ui-field__label">
          {label}
        </label>
      )}
      <Tag
        id={inputId}
        className={`ui-field__control ${error ? 'ui-field__control--error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${inputId}-error`} className="ui-field__error">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
