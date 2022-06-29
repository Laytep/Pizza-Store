import React from 'react';
import Categories from './components/Categories';
import Content from './components/Content';
import Header from './components/Header';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
  return (
    <div className="App">
      <div class="wrapper">
        <Header />
        <div class="content">
          <div class="container">
            <div class="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 class="content__title">Все пиццы</h2>
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
