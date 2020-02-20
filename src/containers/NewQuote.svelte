<script>
  import SvelteCalendar from 'svelte-calendar';
  import WithLayout from '../hocs/WithLayout.svelte';
  import quotesStore from '../stores/quotes';
  import { postQuote } from '../actions/quotes';
  import format from 'date-fns/format';
  import parse from 'date-fns/parse';
  import { capitalize } from '../helpers/stringHelpers';

  let submitSuccess = false;
  let submitError = false;

  $: success = submitSuccess && !(quoteInfo.quote || quoteInfo.authors || quoteInfo.context);

  let quoteInfo = {
    quote: '',
    authors: '',
    context: '',
    date: format(new Date(), 'dd/MM/yyyy'),
  };

  let selectedDate;

  const submitQuote = async (e) => {
    e.preventDefault();
    const {
      quote,
      authors: rawAuthors,
      context,
      date: rawDate,
    } = quoteInfo;

    const authors = capitalize(rawAuthors).split(/,\s*/);

    const date = parse(rawDate, 'dd/MM/yyyy', new Date());

    if (quote && context && authors.length > 0 && date) {
      try {
        await postQuote({ quote, context, authors, date });
        quoteInfo = {
          quote: '',
          authors: '',
          context: '',
          date: format(new Date(), 'dd/MM/yyyy'),
        };
        submitSuccess = true;
        submitError = false;
      } catch (error) {
        submitSuccess = false;
        submitError = true;
      }
    }
  }
</script>

<WithLayout>
  <form class="new-quote form" on:submit={submitQuote}>
    <div class="new-quote__title">Submit new quote</div>
    <label>
      <div>
        Quote
      </div>
      <textarea bind:value={quoteInfo.quote} />
    </label>
    <label>
      <div>
        Context
      </div>
      <input bind:value={quoteInfo.context} />
    </label>
    <div class="form__label">
      <div>
        Date
      </div>
      <SvelteCalendar
        bind:formattedSelected={quoteInfo.date}
        bind:selected={selectedDate}
        format={(date) => format(date, 'dd/MM/YYY')}
        start={new Date(2016, 1, 26)}
        end={new Date()}
      />
    </div>
    <label>
      <div>
        Authors (comma separated)
      </div>
      <input bind:value={quoteInfo.authors} />
    </label>
    {#if success}
      <span class="form__message--success">Quote submitted</span>
    {/if}
    {#if submitError}
      <span class="form__message--error">An error occurred</span>
    {/if}
    <button type="submit" class="form__submit">Submit quote</button>
  </form>
</WithLayout>

<svelte:head>
  <title>Submit new quote</title>
</svelte:head>

<style lang="scss">
  @import '../styles/containers/NewQuote.scss';
</style>
