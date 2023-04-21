import axios from 'axios';
import {
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/categoryConstants';

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORY_REQUEST });
    const { data } = await axios.get(`/api/v1/get-all-category`);
    dispatch({ type: GET_ALL_CATEGORY_SUCCESS, payload: data.cateogries });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};
