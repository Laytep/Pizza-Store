import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="260" rx="10" ry="10" width="280" height="18" />
    <circle cx="130" cy="125" r="125" />
    <rect x="1" y="290" rx="10" ry="10" width="280" height="84" />
    <rect x="0" y="403" rx="10" ry="10" width="95" height="27" />
    <rect x="140" y="393" rx="20" ry="20" width="140" height="45" />
  </ContentLoader>
);

export default MyLoader;
