<script>
  import { onMount } from 'svelte';
  import WithLayout from '../hocs/WithLayout.svelte';

  import Table from '../components/Table.svelte';
  import quotesStore from '../stores/quotes';
  import { getRanking } from '../actions/quotes';

  let ranking = [];
  const headers = ['Name', 'Quotes count'];
  const keys = ['name', 'total_quotes'];

  onMount(() => {
    getRanking();
  });

  quotesStore.subscribe(({ authors }) => {
    ranking = authors;
  });
</script>

<WithLayout>
  <div class="ranking">
    <Table
      className="ranking__table"
      {headers}
      {keys}
      data={ranking}
      emptyMessage={ranking.length === 0}
    />
  </div>
</WithLayout>

<svelte:head>
  <title>Ranking</title>
</svelte:head>

<style lang="scss">
  @import '../styles/containers/Ranking.scss';
</style>
