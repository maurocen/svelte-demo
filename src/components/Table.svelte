<script>
  import { fade } from 'svelte-transitions'
  export let headers = [];
  export let keys = [];
  export let data = [];
  export let className = '';
  export let emptyMessage;
</script>

<table class={className}>
  <thead>
    {#each headers as header}
      <th>{header}</th>
    {/each}
  </thead>
  <tbody>
    {#each data as datum}
      <tr>
        {#each keys as key (key)}
          <th>{datum[key]}</th>
        {/each}
      </tr>
    {/each}
    {#if emptyMessage}
      <tr class="table__empty-message">
        <th colspan="4">
          Sorry, no data available yet
        </th>
      </tr>
    {/if}
    <slot></slot>
  </tbody>
</table>

<style lang="scss">
  @import '../styles/components/Table.scss';
</style>
