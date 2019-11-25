import React, { useState } from 'react';

const UseStateCounter = () => {
  const [counter, setCounter] = useState({ male: 0, female: 0 });

  return (
    <div>
      <div>Counter: H: {counter.male} | M: {counter.female}</div>
      <div>
        <div>MALE</div>
        <button onClick={() => setCounter({male: counter.male + 1, female: counter.female})}>+</button>
        <button onClick={() => setCounter({male: counter.male -  1, female: counter.female})}>-</button>
      </div>
      <div>
        <div>FEMALE</div>
        <button onClick={() => setCounter({male: counter.male, female: counter.female + 1})}>+</button>
        <button onClick={() => setCounter({male: counter.male, female: counter.female - 1})}>-</button>
      </div>
    </div>
  );
}
 
export default UseStateCounter;