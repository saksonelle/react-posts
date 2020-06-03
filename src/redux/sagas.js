import { takeEvery, put, call } from 'redux-saga/effects';
import { REQUEST_POSTS } from './types';
import { showLoader, hideLoader, showAlert } from './actions';
import { FETCH_POSTS } from './types';

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker);
}

function* sagaWorker() {
  try {
    yield put(showLoader());
    const payload = yield call(fetchPost);
    yield put({ type: FETCH_POSTS, payload });
    yield put(hideLoader());
  } catch (e) {
    yield put(showAlert('Что-то пошло не так'));
    yield put(hideLoader());
  }
}

async function fetchPost() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  return await response.json();
}
