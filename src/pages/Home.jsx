import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import MyLoader from '../components/PizzaBlock/Loader';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://62c02a12c134cf51ceca3b76.mockapi.io/Items')
      .then((res) => {
        return res.json();
      })
      .then((json) => setItems(json))
      .then(() => setIsLoading(false));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Bestsellers</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <MyLoader key={index} />)
          : items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
              />
            ))}
      </div>
      <h2 className="content__title">Hot deals</h2>
      <div className="content__items"></div>
    </div>
  );
};

export default Home;
