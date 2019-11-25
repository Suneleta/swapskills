import React from 'react';
import { connect } from 'react-redux';

import {
  incrementMale,
  decrementMale,
  incrementFemale,
  decrementFemale
} from '../../redux/actions/discoActions';

const DiscoButtons = ({ male, female, incrementMale, decrementMale, incrementFemale, decrementFemale }) => {

  return (
    <div>
      <div>Counter: H: {male} | M: {female}</div>
      <div>
        <div>MALE</div>
        <button onClick={() => incrementMale('france')}>+ francés</button>
        <button onClick={() => incrementMale('brasil')}>+ brasileiro</button>
        <button onClick={decrementMale}>-</button>
      </div>
      <div>
        <div>FEMALE</div>
        <button onClick={incrementFemale}>+</button>
        <button onClick={decrementFemale}>-</button>
      </div>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//  incrementMale: () => dispatch(incrementMale()) 
// })

const mapDispatchToProps = (dispatch) => {
  const dispatchs = {
    incrementMale: (country) => dispatch(incrementMale(country)),
    decrementMale: () => dispatch(decrementMale()),
    incrementFemale: () => dispatch(incrementFemale()),
    decrementFemale: () => dispatch(decrementFemale()),
  };
  return dispatchs;
};

const mapStateToProps = (state) => ({
  male: state.discoState.male,
  female: state.discoState.female,
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoButtons);