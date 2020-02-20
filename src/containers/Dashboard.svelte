<script>
  import { onMount } from 'svelte';
  import { Link } from 'svelte-routing';
  import quotesStore from '../stores/quotes';
  import { getQuotes, deleteQuote } from '../actions/quotes';
  import authStore from '../stores/auth';

  import WithLayout from '../hocs/WithLayout.svelte';
  import Quotes from '../components/Quotes.svelte';

  let quotes = [];
  let isAdmin = false;

  const onDelete = async (id) => {
    await deleteQuote(id);
    quotes = quotes.filter(({ _id }) => _id !== id);
  }

  authStore.subscribe(({ admin }) => {
    isAdmin = admin;
  });

  quotesStore.subscribe(({ quotes: storeQuotes, loading, error }) => {
    quotes = storeQuotes;
  });

  onMount(() => {
    getQuotes();
  });
</script>

<WithLayout>
  <div class="dashboard">
    <Quotes
      {quotes}
      {onDelete}
      {isAdmin}
    />
  </div>
</WithLayout>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<style lang="scss">
  @import '../styles/containers/Dashboard.scss';
</style>
