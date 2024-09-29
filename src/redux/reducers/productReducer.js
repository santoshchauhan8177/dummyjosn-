const initialState = {
    products: [],
    total: 0,
    page: 1,
    searchQuery: '',
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return { ...state, products: [...state.products, ...action.payload] };
      case 'SET_PAGE':
        return { ...state, page: action.payload };
      case 'SET_SEARCH_QUERY':
        return { ...state, searchQuery: action.payload };
      default:
        return state;
    }
  };
  
  export default productReducer;
  