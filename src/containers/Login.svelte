<script>
  import auth from '../stores/auth.js';
  import { login } from '../actions/auth.js';
  import { navigate } from 'svelte-routing';

  import neocoastLogo from '../assets/images/neocoast.svg';

  const submitLogin = (e) => {
    e.preventDefault();
    login(authData.username, authData.password)
  }

  let authData = {
    username: '',
    password: '',
    error: null,
  };

  const authStore = auth.subscribe(({ username, token, error }) => {
    if (error) {
      authData.error = error;
    }

    if (username && token) {
      navigate('/', { replace: true });
    }
  });
</script>

<div class="login">
  <form class="form" on:submit={submitLogin}>
    <img class="form__logo" src={neocoastLogo} alt="neocoast logo" />
    <span class="form__title">FRASES CÉLEBRES</span>
    <label for="username">
      <div>Username:</div>
      <input id="username" name="username" bind:value={authData.username} />
    </label>
    <label for="password">
      <div>Password:</div>
      <input id="password" class="password" type="password" bind:value={authData.password}>
    </label>
    {#if authData.error}
      <span class="form__message--error">An error has occurred</span>
    {/if}
    <button type="submit" class="form__submit">Login</button>
  </form>
</div>

<svelte:head>
  <title>Login</title>
</svelte:head>

<style lang="scss">
  @import '../styles/containers/Login.scss';
</style>
