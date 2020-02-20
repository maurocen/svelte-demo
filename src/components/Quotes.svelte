<script>
  import format from 'date-fns/format';
  import { fade} from 'svelte-transitions';

  import Table from './Table.svelte';

  export let quotes = [];
  export let onDelete = () => {};
  export let isAdmin = false;

  let wantToDelete = null;

  $: data = quotes.map(({ quote, authors, context, date, _id }) => ({
    quote,
    id: _id,
    authors: authors.join(', '),
    context: context || '-- NO CONTEXT --',
    date: format(new Date(date), 'dd/MM/yyyy'),
  }));

  const headers = ['Quote', 'Author', 'Context', 'Date', ''];

  const keys = ['quote', 'authors', 'context', 'date', 'delete'];
</script>

<Table
  className="quotes"
  headers={headers}
  keys={keys}
  emptyMessage={data.length === 0}
>
  {#each data as datum}
    <tr>
      <th>
        {datum.quote}
      </th>
      <th>
        {datum.authors}
      </th>
      <th>
        {datum.context}
      </th>
      <th>
        {datum.date}
      </th>
      {#if isAdmin}
        <th class="quotes__align-center">
          <button
            on:click={() => { wantToDelete = datum.id }}
            class="quotes__delete-button"
          >
            <img src="/delete.svg" height="16" alt="Delete" title="Delete quote" />
          </button>
          {#if wantToDelete === datum.id}
            <div class="quotes__confirmation-message" transition:fade>
              <div>
              Are you sure?
              </div>
              <div class="quotes__confirmation-buttons">
                <img
                  role="button"
                  src="/yes.svg"
                  height="24"
                  alt="Yes"
                  title="Yes, delete"
                  on:click={() => onDelete(datum.id)}
                />
                <img
                  role="button"
                  src="/no.svg"
                  height="20"
                  alt="No"
                  title="No, don't delete"
                  on:click={() => { wantToDelete = null}}
                />
              </div>
            </div>
          {/if}
        </th>
      {/if}
    </tr>
  {/each}
</Table>

<style lang="scss">
  @import '../styles/components/Quotes.scss';
</style>
