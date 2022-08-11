import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addCategorie } from 'redux/actions/categorieActions';

const CategorieForm = lazy(() => import('../components/CategorieForm'));

const AddCategorie = () => {
  useScrollTop();
  useDocumentTitle('Add New Categorie | SNKRS Paris');
  const isLoading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  const onSubmit = (categorie) => {
    dispatch(addCategorie(categorie));
  };

  return (
    <div className="product-form-container">
      <h2>Add New categorie</h2>
      <Suspense fallback={(
        <div className="loader" style={{ minHeight: '80vh' }}>
          <h6>Loading ... </h6>
          <br />
          <LoadingOutlined />
        </div>
            )}
      >
        <CategorieForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          categorie={{
            name: ''
          }}
        />
      </Suspense>
    </div>
  );
};

export default withRouter(AddCategorie);
