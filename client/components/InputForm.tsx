import React from 'react';

export const InputForm = ({
  type,
  placeholder,
  icon,
  value,
  handleChange,
  name,
}) => {
  const [fasIcon, setFasIcon] = React.useState('fas fa-eye-slash');
  return (
    <div className='field'>
      <p className='control has-icons-left has-icons-right'>
        <input
          className='input'
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={name}
        />
        <span className='icon is-small is-left'>
          <i className={`fas ${icon}`}></i>
        </span>
      </p>
    </div>
  );
};
