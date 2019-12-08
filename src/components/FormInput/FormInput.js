import React from 'react';
import "./forminput.scss";

const FormInput = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div className="group">
      <input type={type} value={value} onChange={event => onChange(event.target.value)} />
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>{label}</label><br/>
    </div>
  );
}

export default FormInput;