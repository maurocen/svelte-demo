import { writable } from 'svelte/store';

const store = writable({
  username: '',
  token: '',
  error: false,
  authenticating: false,
});

let storeData = {};

store.subscribe((data) => {
  storeData = data;
});

export const updateStore = (obj) => {
  store.set({
    ...storeData,
    ...obj,
  });
}

export default store;
