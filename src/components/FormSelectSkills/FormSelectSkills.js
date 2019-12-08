import React from 'react';

const FormSelectSkills = ({ value, onChange, type = 'checkbox' }) => {
    return (
      <div className="group">
        <input type={type} value="Cooking" onChange={event => onChange(event.target.value)} />
        Cooking
        <br/>
      </div>
    );
  }

export default FormSelectSkills;