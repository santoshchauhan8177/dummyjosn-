import axios from 'axios';

export const fetchCategories = () => async (dispatch) => {
  const response = await axios.get('https://dummyjson.com/products/categories');
  dispatch({ type: 'SET_CATEGORIES', payload: response.data });
};

export const selectCategory = (category) => ({
  type: 'SET_SELECTED_CATEGORY',
  payload: category,
});
