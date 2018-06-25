import { LOAD_LOCATION } from './locationAction';

export default (state, action) => {
  switch (action.type) {
    case LOAD_LOCATION:
      return { ...state, location: action.location };
    default:
      return state;
  }
};
