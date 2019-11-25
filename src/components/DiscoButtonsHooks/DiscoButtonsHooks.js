import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import { 
  incrementMale,
  decrementMale,
  incrementFemale,
  decrementFemale
} from '../../redux/actions/discoActions';

const DiscoButtonsHooks = () => {
  const male = useSelector(state => state.discoState.male);
  const female = useSelector(state => state.discoState.female);
  const dispatch = useDispatch();

  return (
    <div>
      <div>Counter: H: {male} | M: {female}</div>
      <div>
        <div>MALE</div>
        <button onClick={() => dispatch(incrementMale('france'))}>+ francés</button>
        <button onClick={() => dispatch(incrementMale('brasil'))}>+ brasileiro</button>
        <button onClick={() => dispatch(decrementMale())}>-</button>
      </div>
      <div>
        <div>FEMALE</div>
        <button onClick={() => dispatch(incrementFemale())}>+</button>
        <button onClick={() => dispatch(decrementFemale())}>-</button>
      </div>
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//  incrementMale: () => dispatch(incrementMale()) 
// })

// const mapDispatchToProps = (dispatch) => {
//   const dispatchs = {
//     incrementMale: (country) => dispatch(incrementMale(country)) ,
//     decrementMale: () => dispatch(decrementMale()),
//     incrementFemale: () => dispatch(incrementFemale()),
//     decrementFemale: () => dispatch(decrementFemale())
//   }
//   return dispatchs;
// }


// export default connect(null, mapDispatchToProps)(DiscoButtonsHooks);

export default DiscoButtonsHooks;