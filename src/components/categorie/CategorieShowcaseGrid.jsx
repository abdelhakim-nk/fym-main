/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line import/named
import { CategorieFeatured } from 'components/categorie';
import PropType from 'prop-types';
import React from 'react';

const CategorieShowcase = ({ categories, skeletonCount }) => (
  <div className="product-display-grid">
    {(categories.length === 0) ? new Array(skeletonCount).fill({}).map((categorie, index) => (
      <CategorieFeatured
        // eslint-disable-next-line react/no-array-index-key
        key={`categorie-skeleton ${index}`}
        categorie={categorie}
      />
    )) : categories.map((categorie) => (
      <CategorieFeatured
        key={categorie.id}
        categorie={categorie}
      />
    ))}
  </div>
);

CategorieShowcase.defaultProps = {
  skeletonCount: 4
};

CategorieShowcase.propTypes = {
  categories: PropType.array.isRequired,
  skeletonCount: PropType.number
};

export default CategorieShowcase;
