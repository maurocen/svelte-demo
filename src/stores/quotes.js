import { writable } from 'svelte/store';

const store = writable({
  quotes: [],
  authors: [],
  loading: false,
  error: false,
});

let storeData = {};

store.subscribe((data) => {
  storeData = data;
});

export const updateStore = (obj) => {
  store.set({
    ...storeData,
    ...obj
  });
}

export default store;
