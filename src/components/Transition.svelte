<script>
  import { fade } from 'svelte-transitions';

  export let visible = false;
</script>

{#if visible}
  <div transition:fade>
    Fading in/out
  </div>
  <div in:fade>
    Fading in, not out
  </div>
  <div out:fade>
    Fading out, not in
  </div>
{/if}

