import React from 'react';
import '../FormSelectDistrict/formselect.scss';

const FormSelectInterests = ({ value, onChange }) => (
  <>
    <div className="select">
      <select id="interest" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="Sewing">Sewing</option>
        <option value="Woodwork">Woodwork</option>
        <option value="German classes">German classes</option>
        <option value="Babysitting">Babysitting</option>
        <option value="Helping with schoolwork">Helping with schoolwork</option>
        <option value="Repairs">Repairs</option>
        <option value="English classes">English classes</option>
        <option value="Dogwalking">Dogwalking</option>
        <option value="Household">Household</option>
      </select>
    </div>
  </>
);

export default FormSelectInterests;
