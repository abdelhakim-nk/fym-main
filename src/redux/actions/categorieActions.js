import {
  ADD_CATEGORIES,
  ADD_CATEGORIES_SUCCESS,
  CANCEL_GET_CATEGORIES,
  CLEAR_SEARCH_STATE,
  EDIT_CATEGORIES,
  EDIT_CATEGORIES_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  REMOVE_CATEGORIES,
  REMOVE_CATEGORIES_SUCCESS,
  SEARCH_CATEGORIES,
  SEARCH_CATEGORIES_SUCCESS
} from 'constants/constants';

export const getCategorie = (lastRef) => ({
  type: GET_CATEGORIES,
  payload: lastRef
});

export const getCategorieSuccess = (categorie) => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categorie
});

export const cancelGetCategorie = () => ({
  type: CANCEL_GET_CATEGORIES
});

export const addCategorie = (categorie) => ({
  type: ADD_CATEGORIES,
  payload: categorie
});

export const searchCategorie = (searchKey) => ({
  type: SEARCH_CATEGORIES,
  payload: {
    searchKey
  }
});

export const searchCategorieSuccess = (categorie) => ({
  type: SEARCH_CATEGORIES_SUCCESS,
  payload: categorie
});

export const clearSearchState = () => ({
  type: CLEAR_SEARCH_STATE
});

export const addCategorieSuccess = (categorie) => ({
  type: ADD_CATEGORIES_SUCCESS,
  payload: categorie
});

export const removeCategorie = (id) => ({
  type: REMOVE_CATEGORIES,
  payload: id
});

export const removeCategorieSuccess = (id) => ({
  type: REMOVE_CATEGORIES_SUCCESS,
  payload: id
});

export const editCategorie = (id, updates) => ({
  type: EDIT_CATEGORIES,
  payload: {
    id,
    updates
  }
});

export const editCategorieSuccess = (updates) => ({
  type: EDIT_CATEGORIES_SUCCESS,
  payload: updates
});
