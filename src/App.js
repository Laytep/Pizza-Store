import React, { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://62c02a12c134cf51ceca3b76.mockapi.io/Items')
      .then((res) => {
        return res.json();
      })
      .then((json) => setItems(json));
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Bestsellers</h2>
            <div className="content__items">
              {items.map((obj) => (
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
        </div>
      </div>
    </div>
  );
}

export default App;
