function Categories({ id, setId }) {
  const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li key={category} onClick={() => setId(index)} className={id === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
