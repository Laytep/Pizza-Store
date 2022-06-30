import { useState } from 'react';

function Categories() {
  const [active, setActive] = useState(0);

  const onClickCategory = (index) => {
    setActive(index);
  };

  const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li onClick={() => onClickCategory(index)} className={active === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
