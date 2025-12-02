import React from 'react';

export const ImageUploader = ({ onUpload }) => {
  return (
    <div>
      <input type="file" onChange={onUpload} />
    </div>
  );
};
