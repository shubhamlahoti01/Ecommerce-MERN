import {
  CLEAR_ERRORS,
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
} from '../constants/categoryConstants';

export const categoryReducer = (
  state = {
    category: {},
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_CATEGORY_REQUEST:
      return { loading: true, categories: [] };
    case GET_ALL_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };
    case GET_ALL_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
