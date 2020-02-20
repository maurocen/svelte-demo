<script>
  import auth from '../stores/auth.js';
  import { fade } from 'svelte-transitions';
  import Topbar from '../components/Topbar.svelte';
</script>

<div class="layout">
  <Topbar
    loggedIn={$auth.token && $auth.username}
  />
  <div class="layout__content" transition:fade={{ duration: 200 }}>
    <slot></slot>
  </div>
</div>

<style lang="scss">
  @import '../styles/hocs/WithLayout.scss';
</style>
