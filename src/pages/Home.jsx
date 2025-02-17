import { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';

import MyLoader from '../components/PizzaBlock/Loader';
import Sort, { list } from '../components/Sort';
import { useCallback } from 'react';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, isLoading } = useSelector((state) => state.pizza);

  const { searchValue } = useContext(SearchContext);

  const onChangeCategory = useCallback(
    (id) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  //Check first render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  // if there was a first render, we check URL-param and save in redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, [dispatch]);

  //if there was a first render, we fetch Pizzas
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      const selectedSort = sort.sortProperty;

      const getPizzas = async () => {
        const sortBy = selectedSort.replace('-', '');
        const order = selectedSort.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : ``;

        //If you need to add search in get req, add ${search} to .get, and update useEffect
        //const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(fetchPizzas({ sortBy, order, category, currentPage }));
      };

      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, currentPage, dispatch]);

  const skeletons = [...new Array(8)].map((_, index) => <MyLoader key={index} />);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((obj) => (
      <PizzaBlock
        key={obj.id + obj.title}
        id={obj.id}
        title={obj.title}
        price={obj.price}
        imageUrl={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
    ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories id={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Bestsellers</h2>
      {isLoading === 'error' ? (
        <div class="content__error-info">
          <h2>Loading error 😕</h2>
          <p>Sorry, failed to get pizza</p>
        </div>
      ) : (
        <div className="content__items">{isLoading === 'loading' ? skeletons : pizzas}</div>
      )}

      <div className="content__items"></div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
