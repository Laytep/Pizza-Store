import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import MyLoader from '../components/PizzaBlock/Loader';
import Sort from '../components/Sort';

const Home = ({ searchValue, setSearchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategories, setActiveCategories] = useState(0);
  const [selectedSort, setSelectedSort] = useState({
    name: 'rating',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);

    const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = selectedSort.sortProperty.replace('-', '');
    const category = activeCategories > 0 ? `category=${activeCategories}` : '';

    fetch(
      `https://62c02a12c134cf51ceca3b76.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => setItems(json))
      .then(() => setIsLoading(false));
    window.scrollTo(0, 0);
  }, [activeCategories, selectedSort]);

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
        <Categories id={activeCategories} setId={(id) => setActiveCategories(id)} />
        <Sort selected={selectedSort} setSelected={(id) => setSelectedSort(id)} />
      </div>
      <h2 className="content__title">Bestsellers</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <h2 className="content__title">Hot deals</h2>
      <div className="content__items"></div>
      <Pagination />
    </div>
  );
};

export default Home;
