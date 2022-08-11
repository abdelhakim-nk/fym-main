/* eslint-disable indent */
import {
    ADD_CATEGORIES,
    EDIT_CATEGORIES,
    GET_CATEGORIES,
    REMOVE_CATEGORIES,
    SEARCH_CATEGORIES
} from 'constants/constants';
// eslint-disable-next-line import/named
import { ADMIN_CATEGORIES } from 'constants/routes';
import { displayActionMessage } from 'helpers/utils';
import {
    all, call, put, select
} from 'redux-saga/effects';
import { setLoading, setRequestStatus } from 'redux/actions/miscActions';
import { history } from 'routers/AppRouter';
import firebase from 'services/firebase';
import {
    addCategorieSuccess,
    clearSearchState, editCategorieSuccess, getCategorieSuccess,
    removeCategorieSuccess,
    searchCategorieSuccess
} from '../actions/categorieActions';

function* initRequest() {
    yield put(setLoading(true));
    yield put(setRequestStatus(null));
}

function* handleError(e) {
    yield put(setLoading(false));
    yield put(setRequestStatus(e?.message || 'Failed to fetch categorie'));
    console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
    if (location) yield call(history.push, location);
    yield call(displayActionMessage, message, status);
}

function* categorieSaga({ type, payload }) {
    switch (type) {
        case GET_CATEGORIES:
            try {
                yield initRequest();
                const state = yield select();
                const result = yield call(firebase.getCategorie, payload);

                if (result.categorie.length === 0) {
                    handleError('No items found.');
                } else {
                    yield put(getCategorieSuccess({
                        categorie: result.categorie,
                        lastKey: result.lastKey ? result.lastKey : state.categorie.lastRefKey,
                        total: result.total ? result.total : state.categorie.total
                    }));
                    yield put(setRequestStatus(''));
                }
                // yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
                yield put(setLoading(false));
            } catch (e) {
                console.log(e);
                yield handleError(e);
            }
            break;

        case ADD_CATEGORIES: {
            try {
                yield initRequest();

                const key = yield call(firebase.generateCategorieKey);
                const categorie = {
                    ...payload
                };

                yield call(firebase.addCategorie, key, categorie);
                yield put(addCategorieSuccess({
                    id: key,
                    ...categorie
                }));
                yield handleAction(ADMIN_CATEGORIES, 'Item succesfully added', 'success');
                yield put(setLoading(false));
            } catch (e) {
                yield handleError(e);
                yield handleAction(undefined, `Item failed to add: ${e?.message}`, 'error');
            }
            break;
        }
        case EDIT_CATEGORIES: {
            try {
                yield initRequest();

                const { image, imageCollection } = payload.updates;
                let newUpdates = { ...payload.updates };

                if (image.constructor === File && typeof image === 'object') {
                    try {
                        yield call(firebase.deleteCategorieImage, payload.id);
                    } catch (e) {
                        console.error('Failed to delete image ', e);
                    }

                    const url = yield call(firebase.storeCategorieImage, payload.id, image);
                    newUpdates = { ...newUpdates, image: url };
                }

                if (imageCollection.length > 1) {
                    const existingUploads = [];
                    const newUploads = [];

                    imageCollection.forEach((img) => {
                        if (img.file) {
                            newUploads.push(img);
                        } else {
                            existingUploads.push(img);
                        }
                    });

                    const imageKeys = yield all(newUploads.map(() => firebase.generateCategorieKey));
                    const imageUrls = yield all(newUploads.map((img, i) => firebase.storeCategorieImage(imageKeys[i](), img.file)));
                    const images = imageUrls.map((url, i) => ({
                        id: imageKeys[i](),
                        url
                    }));
                    // eslint-disable-next-line max-len
                    newUpdates = { ...newUpdates, imageCollection: [...existingUploads, ...images] };
                } else {
                    newUpdates = {
                        ...newUpdates,
                        imageCollection: [{ id: new Date().getTime(), url: newUpdates.image }]
                    };
                    // add image thumbnail to image collection from newUpdates to
                    // make sure you're adding the url not the file object.
                }

                yield call(firebase.editCategorie, payload.id, newUpdates);
                yield put(editCategorieSuccess({
                    id: payload.id,
                    updates: newUpdates
                }));
                yield handleAction(ADMIN_CATEGORIES, 'Item succesfully edited', 'success');
                yield put(setLoading(false));
            } catch (e) {
                yield handleError(e);
                yield handleAction(undefined, `Item failed to edit: ${e.message}`, 'error');
            }
            break;
        }
        case REMOVE_CATEGORIES: {
            try {
                yield initRequest();
                yield call(firebase.removeCategorie, payload);
                yield put(removeCategorieSuccess(payload));
                yield put(setLoading(false));
                yield handleAction(ADMIN_CATEGORIES, 'Item succesfully removed', 'success');
            } catch (e) {
                yield handleError(e);
                yield handleAction(undefined, `Item failed to remove: ${e.message}`, 'error');
            }
            break;
        }
        case SEARCH_CATEGORIES: {
            try {
                yield initRequest();
                // clear search data
                yield put(clearSearchState());

                const state = yield select();
                const result = yield call(firebase.searchCategorie, payload.searchKey);

                if (result.categorie.length === 0) {
                    yield handleError({ message: 'No categorie found.' });
                    yield put(clearSearchState());
                } else {
                    yield put(searchCategorieSuccess({
                        categorie: result.categorie,
                        // eslint-disable-next-line max-len
                        lastKey: result.lastKey ? result.lastKey : state.categorie.searchedCategorie.lastRefKey,
                        total: result.total ? result.total : state.categorie.searchedCategorie.total
                    }));
                    yield put(setRequestStatus(''));
                }
                yield put(setLoading(false));
            } catch (e) {
                yield handleError(e);
            }
            break;
        }
        default: {
            throw new Error(`Unexpected action type ${type}`);
        }
    }
}

export default categorieSaga;
