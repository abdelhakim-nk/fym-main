import { CheckOutlined } from '@ant-design/icons';
import { ImageLoader } from 'components/common';
import { displayMoney } from 'helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CategorieItem = ({ categorie, isItemOnBasket, addToBasket }) => {
  const history = useHistory();

  const onClickItem = () => {
    if (!categorie) return;

    if (categorie.id) {
      history.push(`/categorie/${categorie.id}`);
    }
  };

  const itemOnBasket = isItemOnBasket ? isItemOnBasket(categorie.id) : false;

  const handleAddToBasket = () => {
    if (addToBasket) addToBasket({ ...categorie, selectedSize: categorie.sizes[0] });
  };

  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`categorie-card ${!categorie.id ? 'product-loading' : ''}`}
        style={{
          border: categorie && itemOnBasket ? '1px solid #a6a5a5' : '',
          boxShadow: categorie && itemOnBasket ? '0 10px 15px rgba(0, 0, 0, .07)' : 'none'
        }}
      >
        {itemOnBasket && <CheckOutlined className="fa fa-check product-card-check" />}
        <div
          className="product-card-content"
          onClick={onClickItem}
          role="presentation"
        >
          <div className="product-card-img-wrapper">
            {categorie.image ? (
              <ImageLoader
                alt={categorie.name}
                className="product-card-img"
                src={categorie.image}
              />
            ) : <Skeleton width="100%" height="90%" />}
          </div>
          <div className="product-details">
            <h5 className="product-card-name text-overflow-ellipsis margin-auto">
              {categorie.name || <Skeleton width={80} />}
            </h5>
            <p className="product-card-brand">
              {categorie.brand || <Skeleton width={60} />}
            </p>
            <h4 className="product-card-price">
              {categorie.price ? displayMoney(categorie.price) : <Skeleton width={40} />}
            </h4>
          </div>
        </div>
        {categorie.id && (
        <button
          className={`product-card-button button-small button button-block ${itemOnBasket ? 'button-border button-border-gray' : ''}`}
          onClick={handleAddToBasket}
          type="button"
        >
          {itemOnBasket ? 'Remove from basket' : 'Add to basket'}
        </button>
        )}

      </div>
    </SkeletonTheme>
  );
};

CategorieItem.defaultProps = {
  isItemOnBasket: undefined,
  addToBasket: undefined
};

CategorieItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  categorie: PropType.object.isRequired,
  isItemOnBasket: PropType.func,
  addToBasket: PropType.func
};

export default CategorieItem;
