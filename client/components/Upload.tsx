import React from 'react';

export const Upload = ({ handleFile }) => {
  return (
    <div className='file'>
      <label className='file-label'>
        <input
          className='file-input'
          type='file'
          name='resume'
          onChange={handleFile}
        />
        <span className='file-cta'>
          <span className='file-icon'>
            <i className='fas fa-upload'></i>
          </span>
          <span className='file-label'>Choose a file…</span>
        </span>
      </label>
    </div>
  );
};
