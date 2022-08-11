import { EDIT_PRODUCT } from 'constants/routes';
import { displayActionMessage } from 'helpers/utils';
import PropType from 'prop-types';
import React, { useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { removeCategorie } from '../../../redux/actions/categorieActions';

const CategorieItem = ({ categorie }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const categorieRef = useRef(null);

  const onClickEdit = () => {
    history.push(`${EDIT_PRODUCT}/${categorie.id}`);
  };

  const onDeleteCategorie = () => {
    categorieRef.current.classList.toggle('item-active');
  };

  const onConfirmDelete = () => {
    dispatch(removeCategorie(categorie.id));
    displayActionMessage('Item successfully deleted');
    categorieRef.current.classList.remove('item-active');
  };

  const onCancelDelete = () => {
    categorieRef.current.classList.remove('item-active');
  };

  return (
    <SkeletonTheme
      color="#e1e1e1"
      highlightColor="#f2f2f2"
    >
      <div
        className={`item item-products ${!categorie.id && 'item-loading'}`}
        ref={categorieRef}
      >
        <div className="grid grid-count-1">
          <div className="grid-col item-img-wrapper">
            <span className="text-overflow-ellipsis">{categorie.name || <Skeleton width={50} />}</span>
          </div>
        </div>

        {categorie.id && (
          <div className="item-action">
            <button
              className="button button-border button-small"
              onClick={onClickEdit}
              type="button"
            >
              Edit
            </button>
            &nbsp;
            <button
              className="button button-border button-small button-danger"
              onClick={onDeleteCategorie}
              type="button"
            >
              Delete
            </button>
            <div className="item-action-confirm">
              <h5>Are you sure you want to delete this?</h5>
              <button
                className="button button-small button-border"
                onClick={onCancelDelete}
                type="button"
              >
                No
              </button>
              &nbsp;
              <button
                className="button button-small button-danger"
                onClick={onConfirmDelete}
                type="button"
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

CategorieItem.propTypes = {
  categorie: PropType.shape({
    id: PropType.string,
    name: PropType.string
  }).isRequired
};

export default withRouter(CategorieItem);
