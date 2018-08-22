import { LOAD_LOCATION } from './locationAction';
const initState = {
  location: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_LOCATION:
      return { ...state, location: action.location };
    default:
      return state;
  }
};
