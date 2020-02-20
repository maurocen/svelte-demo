<script>
  import { Link } from 'svelte-routing';
  import { logout } from '../actions/auth.js';
  import { routes } from '../constants/routes.js';
  import neocoastLogo from '../assets/images/neocoast.svg';

  export let loggedIn = false;
</script>

<div class="topbar">
  <div class="topbar__left-side">
    <Link to="{routes.DASHBOARD}">
      <img src={neocoastLogo} class="topbar__logo" alt="neocoast logo" />
    </Link>
    <h3 class="topbar__title">Frases célebres</h3>
  </div>
  <div class="topbar__right-side">
    {#if loggedIn}
      <Link
        to="{routes.DASHBOARD}"
      >
        <button class="topbar__button">
          Dashboard
        </button>
      </Link>
      <Link
        to="{routes.NEW_QUOTE}"
      >
        <button class="topbar__button">
          New quote
        </button>
      </Link>
      <Link
        to="{routes.RANKING}"
      >
        <button class="topbar__button">
          Ranking
        </button>
      </Link>
      <button
        on:click={logout}
        class="topbar__button"
      >
        Sign out
      </button>
    {:else}
      <Link
        to="{routes.LOGIN}"
        getProps={() => ({ class: 'topbar__button' })}
      >
        <button class="topbar__button">
          Sign in
        </button>
      </Link>
    {/if}
  </div>
</div>

<style lang="scss">
  @import '../styles/components/Topbar.scss';
</style>
