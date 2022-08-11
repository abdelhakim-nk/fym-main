import { useBasket } from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import CategorieItem from './CategorieItem';

const CategorieGrid = ({ categories }) => {
  const { addToBasket, isItemOnBasket } = useBasket();

  return (
    <div className="product-grid">
      {categories.length === 0 ? new Array(12).fill({}).map((categorie, index) => (
        <CategorieItem
          // eslint-disable-next-line react/no-array-index-key
          key={`categorie-skeleton ${index}`}
          categorie={categorie}
        />
      )) : categories.map((categorie) => (
        <CategorieItem
          key={categorie.id}
          isItemOnBasket={isItemOnBasket}
          addToBasket={addToBasket}
          categorie={categorie}
        />
      ))}
    </div>
  );
};

CategorieGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  categories: PropType.array.isRequired
};

export default CategorieGrid;
