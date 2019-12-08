import React from 'react';
import "./formselect.scss";

const FormSelectDistrict = ({ value, onChange }) => {
  return (
    <>
        <select value={value} onChange={event => onChange(event.target.value)}>
            <option value="Eixample">Eixample</option>
            <option value="Ciutat Vella">Ciutat Vella</option>
            <option value="Sants-Montjuic">Sants-Montjuic</option>
            <option value="Sarrià - Sant Gervasi">Sarrià - Sant Gervasi</option>
            <option value="Gràcia">Gràcia</option>
            <option value="Horta - Guinardó">Horta - Guinardó</option>
            <option value="Nou Barris">Nou Barris</option>
            <option value="Sant Andreu">Sant Andreu</option>
            <option value="Sant Martí">Sant Martí</option>
        </select>
    </>
  );
}

export default FormSelectDistrict;