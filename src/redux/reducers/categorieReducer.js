import {
  ADD_CATEGORIES_SUCCESS,
  CLEAR_SEARCH_STATE, EDIT_CATEGORIES_SUCCESS,
  GET_CATEGORIES_SUCCESS, REMOVE_CATEGORIES_SUCCESS,
  SEARCH_CATEGORIES_SUCCESS
} from 'constants/constants';

const initState = {
  lastRefKey: null,
  total: 0,
  items: []
};

export default (state = {
  lastRefKey: null,
  total: 0,
  items: [],
  searchedCategorie: initState
}, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload.lastKey,
        total: action.payload.total,
        items: [...state.items, ...action.payload.categorie]
      };
    case ADD_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case SEARCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        searchedCategorie: {
          lastRefKey: action.payload.lastKey,
          total: action.payload.total,
          items: [...state.searchedCategorie.items, ...action.payload.categorie]
        }
      };
    case CLEAR_SEARCH_STATE:
      return {
        ...state,
        searchedCategorie: initState
      };
    case REMOVE_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: state.items.filter((categorie) => categorie.id !== action.payload)
      };
    case EDIT_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: state.items.map((categorie) => {
          if (categorie.id === action.payload.id) {
            return {
              ...categorie,
              ...action.payload.updates
            };
          }
          return categorie;
        })
      };
    default:
      return state;
  }
};
