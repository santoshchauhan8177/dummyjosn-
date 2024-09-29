import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategory } from './redux/actions/categoryActions';
import { fetchProducts } from './redux/actions/productActions';
import { useSearchParams } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categories);
  const selectedCategory = useSelector(state => state.category.selectedCategory);
  const products = useSelector(state => state.product.products);
  const page = useSelector(state => state.product.page);
  const searchQuery = useSelector(state => state.product.searchQuery);
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch categories on load
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch products based on category, search query, and page
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    dispatch(fetchProducts(category, page, search));
  }, [selectedCategory, page, searchQuery, searchParams, dispatch]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSearchParams(prevParams => ({
      ...Object.fromEntries(prevParams), // Keeps the existing search params (like search query)
      category, // Sets the new category
    }));
    dispatch(selectCategory(category)); // Update Redux with the selected category
  };

  // Handle search
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchParams({ category: selectedCategory, search });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: search });
  };

  return (
    <div>
    <h1>Products</h1>
    <input
      type="text"
      placeholder="Search products..."
      onChange={handleSearch}
    />
    
    {/* Categories List */}
    <div>
      <h3>Categories</h3>
      <ul>
        {categories.map(category => (
          <li
            key={category.slug}
            onClick={() => handleCategorySelect(category)} // Trigger the category selection
            style={{ cursor: 'pointer', fontWeight: category === selectedCategory ? 'bold' : 'normal' }} // Highlight selected category
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>

    {/* Products List */}
    <div>
      <h3>Products</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h4>{product.title}</h4>  {/* Display the product title */}
            <p>{product.description}</p>  {/* Display product description */}
          </li>
        ))}
      </ul>
      
      <button onClick={() => dispatch(fetchProducts(selectedCategory, page + 1, searchQuery))}>
        Load more
      </button>
    </div>
  </div>

  );
};

export default App;
