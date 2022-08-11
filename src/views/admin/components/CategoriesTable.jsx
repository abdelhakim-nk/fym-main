/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';
import CategorieItem from './CategorieItem';

const CategoriesTable = ({ filteredCategories }) => (
  <div>
    {filteredCategories.length > 0 && (
      <div className="grid grid-product grid-count-6">
        <div className="grid-col" />
        <div className="grid-col">
          <h5>Nom</h5>
        </div>

      </div>
    )}
    {filteredCategories.length === 0 ? new Array(10).fill({}).map((categorie, index) => (
      <CategorieItem
        // eslint-disable-next-line react/no-array-index-key
        key={`categorie-skeleton ${index}`}
        categorie={categorie}
      />
    )) : filteredCategories.map((categorie) => (
      <CategorieItem
        key={categorie.id}
        categorie={categorie}
      />
    ))}
  </div>
);

CategoriesTable.propTypes = {
  filteredCategories: PropType.array.isRequired
};

export default CategoriesTable;
