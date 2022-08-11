/* eslint-disable react/forbid-prop-types */
import { Boundary, MessageDisplay } from 'components/common';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/actions/miscActions';
import { getCategorie } from 'redux/actions/categorieActions';

const CategorieList = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    categories, filteredCategories, isLoading, requestStatus, children
  } = props;
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const fetchCategories = () => {
    setFetching(true);
    dispatch(getCategorie(categories.lastRefKey));
  };

  useEffect(() => {
    if (categories.items.length === 0 || !categories.lastRefKey) {
      fetchCategories();
    }

    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [categories.lastRefKey]);

  if (filteredCategories.length === 0 && !isLoading) {
    return (
      <MessageDisplay message={requestStatus?.message || 'No categories found.'} />
    );
  } if (filteredCategories.length === 0 && requestStatus) {
    return (
      <MessageDisplay
        message={requestStatus?.message || 'Something went wrong :('}
        action={fetchCategories}
        buttonLabel="Try Again"
      />
    );
  }
  return (
    <Boundary>
      {children}
      {/* Show 'Show More' button if products length is less than total products */}
      {categories.items.length < categories.total && (
        <div className="d-flex-center padding-l">
          <button
            className="button button-small"
            disabled={isFetching}
            onClick={fetchCategories}
            type="button"
          >
            {isFetching ? 'Fetching Items...' : 'Show More Items'}
          </button>
        </div>
      )}
    </Boundary>
  );
};

CategorieList.defaultProps = {
  requestStatus: null
};

CategorieList.propTypes = {
  categories: PropType.object.isRequired,
  filteredCategories: PropType.array.isRequired,
  isLoading: PropType.bool.isRequired,
  requestStatus: PropType.string,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default CategorieList;
