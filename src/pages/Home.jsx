import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import MyLoader from '../components/PizzaBlock/Loader';
import Sort from '../components/Sort';

const Home = () => {
  const { categoryId, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const selectedSort = sort.sortProperty;

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);

    const order = selectedSort.includes('-') ? 'asc' : 'desc';
    const sortBy = selectedSort.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://62c02a12c134cf51ceca3b76.mockapi.io/Items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      })
      .then(() => setIsLoading(false));
    window.scrollTo(0, 0);
  }, [categoryId, selectedSort, searchValue, currentPage]);

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
        key={obj.id}
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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <h2 className="content__title">Hot deals</h2>
      <div className="content__items"></div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
