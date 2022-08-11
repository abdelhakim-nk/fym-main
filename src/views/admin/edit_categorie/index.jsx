import { LoadingOutlined } from '@ant-design/icons';
import { useCategorie, useDocumentTitle, useScrollTop } from 'hooks';
import PropType from 'prop-types';
import React, { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { editCategorie } from 'redux/actions/categorieActions';

const CategorieForm = lazy(() => import('../components/CategorieForm'));

const EditCategorie = ({ match }) => {
  useDocumentTitle('Edit Categorie | Lunetas-cam');
  useScrollTop();
  const { categorie, error, isLoading } = useCategorie(match.params.id);
  const dispatch = useDispatch();

  const onSubmitForm = (updates) => {
    dispatch(editCategorie(categorie.id, updates));
  };

  return (
    <div className="product-form-container">
      {error && <Redirect to="/dashboard/categories" />}
      <h2>Edit Categorie</h2>
      {categorie && (
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
            onSubmit={onSubmitForm}
            categorie={categorie}
          />
        </Suspense>
      )}
    </div>
  );
};

EditCategorie.propTypes = {
  match: PropType.shape({
    params: PropType.shape({
      id: PropType.string
    })
  }).isRequired
};

export default withRouter(EditCategorie);
