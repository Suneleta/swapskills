
const incrementMale = (country) => {
  return { type: 'INCREMENT_MALE', country };
}

const decrementMale = () => {
  return { type: 'DECREMENT_MALE' };
}

const incrementFemale = () => {
  return { type: 'INCREMENT_FEMALE' };
}

const decrementFemale = () => {
  return { type: 'DECREMENT_FEMALE' }
}

export {
  incrementMale,
  decrementMale,
  incrementFemale,
  decrementFemale
}