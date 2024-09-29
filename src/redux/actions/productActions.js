import axios from 'axios';

export const fetchProducts = (category, page, searchQuery) => async (dispatch) => {
  let url = `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`;

  if (category) {
    url += `&category=${category}`;
  }
  if (searchQuery) {
    url += `&search=${searchQuery}`;
  }

  const response = await axios.get(url);
  dispatch({ type: 'SET_PRODUCTS', payload: response.data.products });
  dispatch({ type: 'SET_PAGE', payload: page });
};
