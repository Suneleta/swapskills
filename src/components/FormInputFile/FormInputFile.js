import React,{ useState } from 'react';

import uploadFile from '../../services/storage';
import { getItem, getAllRealTime, deleteItem, addItem } from '../../services/database';

const FormInputFile = ({ value, onChange, type = 'file' }) => {
  const [fileUploadPercent, setFileUploadPercent] = useState('');
  const handleUploadFile = async (event) => {
    const file = event.target.files[0];

    const downloadURL = await uploadFile(file, setFileUploadPercent);

    const result = await addItem(
      'users',
      { file: downloadURL }
    );
  //  console.log('result: ',downloadURL);
    if (result) {
      setFileUploadPercent('');
    }
  };
    
  return (
    <>
    <input type={type} value={value} onChange={handleUploadFile}/>
    <div>{fileUploadPercent}</div>
    </>
  );
}


export default FormInputFile;