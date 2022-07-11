function Categories({ id, onChangeCategory }) {
  console.log(id);
  const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category}
            onClick={() => onChangeCategory(index)}
            className={id === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
