import { makeParsedRequest, makeRequest } from '../helpers/request';
import store, { updateStore } from '../stores/quotes';

let quotes = [];

store.subscribe(({ quotes: storeQuotes }) => {
  quotes = storeQuotes;
});

export const getQuotes = async () => {
  updateStore({ loading: true });
  try {
    const data = await makeParsedRequest('/quotes');
    updateStore(data);
  } catch (error) {
    updateStore({ error });
  } finally {
    updateStore({ loading: false });
  }
}

export const getRanking = async () => {
  updateStore({ loading: true });
  try {
    const authors = await makeParsedRequest('/authors/ranking');
    updateStore({ authors });
  } catch (error){
    updateStore({ error });
  } finally {
    updateStore({ loading: false });
  }
}

export const postQuote = async (quote) => {
  updateStore({ loading: true });
  try {
    await makeParsedRequest('/quotes', quote, { method: 'POST' });
  } catch (error) {
    updateStore({ error });
  } finally {
    updateStore({ loading: false });
  }
}

export const deleteQuote = async (quoteId) => {
  updateStore({ loading: true });
  try {
    await makeRequest(`/quotes/${quoteId}`, {}, { method: 'DELETE' });
    const newQuotes = quotes.filter(({ _id }) => quoteId !== _id);
    updateStore({ quotes: newQuotes });
  } catch (error) {
    updateStore({ error })
  } finally {
    updateStore({ loading: true });
  }
}
