import { ImageLoader } from 'components/common';
import PropType from 'prop-types';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line react/prop-types

const CategorieFeatured = ({ categorie }) => {
  const history = useHistory();
  const onClickItem = () => {
    if (!categorie) return;

    // eslint-disable-next-line react/prop-types
    history.push(`/categorie/${categorie.id}`);
  };


  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div className="product-display" onClick={onClickItem} role="presentation">
        <div className="product-display-img">
          {categorie.image ? (
            <ImageLoader
              className="product-card-img"
              src={categorie.image}
            />
          ) : <Skeleton width="100%" height="100%" />}
        </div>
        <div className="product-display-details">
          <h2>{categorie.name || <Skeleton width={80} />}</h2>
          <p className="text-subtle text-italic">
            {categorie.brand || <Skeleton width={40} />}
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

CategorieFeatured.propTypes = {
  categorie: PropType.shape({
    name: PropType.string,
    id: PropType.string
  }).isRequired
};

export default CategorieFeatured;
