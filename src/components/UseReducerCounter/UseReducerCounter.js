import React, { useReducer } from 'react';

const INITIAL_STATE = { male: 0, female: 0 };

const rafelsFunction = (state, action) => {
  const MAX_PEOPLE = 4;
  const { male, female } = state;

  switch(action.type){
    case 'INCREMENT_MALE': {
      if (action.country === 'brasil') return { male: male + 1, female };

      const maleAmount = male + female < MAX_PEOPLE ? male + 1 : male;
      return { male: maleAmount, female };
    }
    case 'DECREMENT_MALE': {
      const maleAmount = male > 0 ? male - 1 : 0;
      return { male: maleAmount, female };
    }
    case 'INCREMENT_FEMALE': {
      const femaleAmount = male + female < MAX_PEOPLE ? female + 1 : female;
      return { male, female: femaleAmount };
    }
    case 'DECREMENT_FEMALE': {
      const femaleAmount = female > 0 ? female - 1 : 0;
      return { male, female: femaleAmount };
    }
  }
}

const UseReducerCounter = () => {
  const [state, dispatch] = useReducer(rafelsFunction, INITIAL_STATE);

  return (
    <div>
      <div>Counter: H: {state.male} | M: {state.female}</div>
      <div>
        <div>MALE</div>
        <button onClick={() => dispatch({type: 'INCREMENT_MALE', country: 'france'})}>+ francés</button>
        <button onClick={() => dispatch({type: 'INCREMENT_MALE', country: 'brasil'})}>+ brasileiro</button>
        <button onClick={() => dispatch({type: 'DECREMENT_MALE'})}>-</button>
      </div>
      <div>
        <div>FEMALE</div>
        <button onClick={() => dispatch({type: 'INCREMENT_FEMALE'})}>+</button>
        <button onClick={() => dispatch({type: 'DECREMENT_FEMALE'})}>-</button>
      </div>
    </div>
  );
}
 
export default UseReducerCounter;