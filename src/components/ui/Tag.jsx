import React from 'react';
import './Tag.css';

/**
 * Tag
 * Small removable/interactive chip — use for filter pills (e.g. "Web App", "Tool", "Mobile")
 * on your Work/Projects page.
 * Usage:
 *   <Tag active={activeFilter === 'web'} onClick={() => setFilter('web')}>Web App</Tag>
 *   <Tag onRemove={() => removeSkill(skill)}>React</Tag>
 */
const Tag = ({ children, active = false, onClick, onRemove, className = '', ...rest }) => {
  const classes = ['ui-tag', active ? 'ui-tag--active' : '', onClick ? 'ui-tag--clickable' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} onClick={onClick} {...rest}>
      {children}
      {onRemove && (
        <button
          type="button"
          className="ui-tag__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${children}`}
        >
          ×
        </button>
      )}
    </span>
  );
};

export default Tag;
