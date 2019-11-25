const INITIAL_STATE = { male: 0, female: 0 };

const discoReducer = (state = INITIAL_STATE, action) => {
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
    default: {
      return state
    }
  }
}

export default discoReducer;