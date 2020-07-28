import React from 'react';

export const Upload = ({ handleFile, file }) => {
  return (
    <div className='field'>
      <label htmlFor=''>
        <strong>Avatar</strong>
      </label>
      <div className='file has-name'>
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
            <span className='file-label'>Upload a photo</span>
          </span>
          <span className='file-name'>{file ? file.name : null}</span>
        </label>
      </div>
    </div>
  );
};
