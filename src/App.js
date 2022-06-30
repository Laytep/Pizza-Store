import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
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
              <PizzaBlock title="Chiken pizza" price={55} />
              <PizzaBlock title="Cottage pizza" price={49} />
              <PizzaBlock title="Kebab pizza" price={67} />
            </div>
            <h2 className="content__title">Hot deals</h2>
            <div className="content__items">
              <PizzaBlock />
              <PizzaBlock />
              <PizzaBlock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
