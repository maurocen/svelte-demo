import Dashboard from '../containers/Dashboard.svelte';
import Login from '../containers/Login.svelte';
import Ranking from '../containers/Ranking.svelte';
import NewQuote from '../containers/NewQuote.svelte';

export const routes = {
  LOGIN: 'login',
  RANKING: 'ranking',
  DASHBOARD: '',
  NEW_QUOTE: '/submit-quote',
  NOT_FOUND: '*',
}

export default [
  { route: routes.LOGIN, component: Login },
  { route: routes.RANKING, component: Ranking, protectedRoute: true },
  { route: routes.DASHBOARD, component: Dashboard, protectedRoute: true },
  { route: routes.NEW_QUOTE, component: NewQuote, protectedRoute: true },
];
