<script>
	import { onMount } from 'svelte';
	import { Router, Route } from 'svelte-routing';
	import routeComponents, { routes } from './constants/routes.js';
	import ProtectedRoute from './components/ProtectedRoute.svelte';

	import authStore from './stores/auth.js';
	import { setAuth, loginToken } from './actions/auth.js';

	let authData = {}
	let initialClicks = 0;

	authStore.subscribe(({ username, token }) => {
		const authData = { username, token };
	});

	$: authenticated = !!(authData.username && authData.token);

	onMount(() => {
		const username = localStorage.getItem('username');
		const token = localStorage.getItem('token');

		if (username && token) {
			setAuth({ username, token});
			loginToken();
		} else {
			authenticated = false;
		}
	});

</script>

<Router basePath="/">
	{#each routeComponents as { route, component: Component, protectedRoute }}
		{#if protectedRoute}
			<Route path="{route}">
				<ProtectedRoute>
					<Component />
				</ProtectedRoute>
			</Route>
		{:else}
			<Route path="{route}" component={Component} />
		{/if}
	{/each}
</Router >

<style lang="scss">
</style>
