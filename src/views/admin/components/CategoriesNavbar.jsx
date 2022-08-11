import { PlusOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ADD_CATEGORIE } from '../../../constants/routes';

const CategoriesNavbar = (props) => {
  const { categoriesCount, totalCategoriesCount } = props;
  const history = useHistory();

  return (
    <div className="product-admin-header">
      <h3 className="product-admin-header-title">
        Categories &nbsp;
        (
        {`${categoriesCount} / ${totalCategoriesCount}`}
        )
      </h3>


      <button
        className="button button-small"
        onClick={() => history.push(ADD_CATEGORIE)}
        type="button"
      >
        <PlusOutlined />
        &nbsp; Ajouter un categorie
      </button>
    </div>
  );
};

CategoriesNavbar.propTypes = {
  categoriesCount: PropType.number.isRequired,
  totalCategoriesCount: PropType.number.isRequired
};

export default CategoriesNavbar;
