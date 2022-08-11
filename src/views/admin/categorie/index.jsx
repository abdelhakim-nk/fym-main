/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from 'components/common';
import { CategorieAppliedFilters, CategorieList } from 'components/categorie';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from 'selectors/selector';
import CategoriesTable from '../components/CategoriesTable';
import CategoriesNavbar from '../components/CategoriesNavbar';

const Categorie = () => {
  useDocumentTitle('liste Categorie | SNKRS Paris Admin');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredCategories: selectFilter(state.categorie.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    categories: state.categorie
  }));

  return (
    <Boundary>
      <CategoriesNavbar
        categoriesCount={store.categories.items.length}
        totalCategoriesCount={store.categories.total}
      />
      <div className="categorie-admin-items">
        <CategorieList {...store}>
          <CategorieAppliedFilters filter={store.filter} />
          <CategoriesTable filteredCategories={store.filteredCategories} />
        </CategorieList>
      </div>
    </Boundary>
  );
};

export default withRouter(Categorie);
