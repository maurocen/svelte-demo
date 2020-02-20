<script>
  import { navigate } from 'svelte-routing';
  import { onMount } from 'svelte';
  import authData from '../stores/auth.js';

  let authorized = false;

  onMount(() => {
    authData.subscribe(({ username, token }) => {
      if (username && token) {
        authorized = true;
      } else {
        navigate(unauthorizedRedirect, { replace: true });
      }
    });
  });

  export let unauthorizedRedirect = '/login';
</script>

{#if authorized}
  <slot></slot>
{/if}
