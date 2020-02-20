# NEOCOAST'S FRASES CÉLEBRES
A Svelte demo project

- [Svelte file structure](#svelte-file-structure)
- [Components](#components)
  - [Declaring props](#declaring-props)
  - [Using custom components](#using-custom-components)
  - [Component composition](#component-composition)
    - [Slots](#slots)
    - [Fallback slots](#fallback-slots)
    - [Named slots](#named-slots)
    - [Props in slots](#props-in-slots)
- [Svelte directives](#svelte-directives)
  - [Conditional rendering](#conditional-rendering)
  - [Rendering lists](#rendering-lists)
- [Svelte stores](#svelte-stores)
  - [Writable store](#writable-store)
  - [Readable store](#readable-store)
  - [Derived store](#derived-store)
  - [Custom stores](#custom-stores)

## Svelte file structure

A Svelte file consists of three sections:
- Script section: This is where you would write the component's logic, import other components and define variables and props.
- Style section: Anything related to styling (CSS, SASS, you name it).
- HTML section: Here's the rendered part. It's similar to Vue's `<template>` but it needs no wrapper tag, and you may return more than one HTML node.

## Components

### Declaring props

Props are declaring exporting variables (**NOT CONSTANTS**) in the `<script>` section of the component. You may specify a default value for a prop when declaring it.

```html
<script>
  export let propName;
  export let propWithDefaultValue = 'world';
</script>

<!-- USING THE PROPS -->
<div>
  <span>Hello {propWithDefaultValue}!</span>
  <span>Your prop value is: {propName}</span>
</div>
```

### Component composition

#### Slots

Slots are useful to reuse a component. When rendering a component, a slot is replaced with the component children.

```html
<!-- Component.js -->
<div class="component">
  <span>Hello,</span>
  <slot></slot>
</div>

<!-- OtherComponent.js -->
<script>
  import Component from './Component.js';
</script>

<Component>
  <span>World</span>
</Component>
```

Renders:

```html
<div class="component">
  <span>Hello,</span>
  <span>World</span>
</div>
```

#### Fallback slots

You can, when declaring a slot, give it children elements. These children elements will render only if no children are provided to the component.

```html
<div class="component">
  <slot>
    <span>No children passed to component</span>
  </slot>
</div>
```

#### Named slots

What happens if you want to put more than one thing in a component but those things are not together? In that case, you may find it useful to use named slots.

To do this, when declaring the slot you pass a `name` attribute to it, and when using the component you can pass the `slot` attribute to it, paying attention to use the same `slot` value as you used for the `name` attribute of the slot.

```html
<!-- Component.js -->
<div class="component">
  <slot name="name"></slot>
  <span>Works at NeoCoast, S.R.L.</span>
  <slot name="position"></slot>

<!-- OtherComponent -->
<script>
  import Component from './Component.js';
</script>

<Component>
  <span slot="name">NeoCoaster</span>
  <span slot="position">Developer</span>
</Component>
```

#### Props in slots

Props can be passed to slots, so they will be passed to the children of the component.

```html
<!-- Component.js -->
<div class="component">
  <slot on:click={onClick}"></slot>
</div>

<!-- OtherComponent.js -->
<script>
  import Component from './Component.js';
</script>

<Component>
  <span>Hi</span>
</Component>
```

Will result in

```html
<div class="component">
  <span on:click={onClick}">Hi</span>
</div>
```

### Using custom components

```html
<script>
  import Component from '../components/Component.svelte';
</script>

<Component
  propName={propWithDifferentName}
  {propnameShorthand} // If the prop is called the same as the variable you may use this shorthand
/>
```

## Svelte directives

### Conditional rendering

```js
{#if condition}
  <span>Condition is true!</span>
{:else if otherCondition}
  <span>First condition is false, but second one is true!</span>
{:else}
  <span>Neither condition is true</span>
{/if}
```

### Rendering lists

You can render items from a list with the `{#each}` directive. It is important to add a unique key after the declaration of the item name (between round brackets) in order to prevent possible rendering errors. This is the same as React or Vue.

```js
<script>
  const technologies = ['React', 'Vue', 'Svelte', 'Node.JS', 'React Native', 'Ruby on Rails'];
</script>

<ul>
  {#each technologies as technology (technology)}
    <li>{technology}</li>
  {/each}
</ul>
```

## Bindings

Sveltes provides an easy way of binding events, values and even props.

### Binding input values to variables

```html
<script>
  let name = '';
</script>

<input bind:value={name} />
```

### Binding grouped input values

```html
<script>
  let burger = '';
  let toppings = [];

  const burgerOptions = ['Cheeseburger', 'Double Cheeseburger', 'Veggie'];
  const toppingOptions = ['Mayonnaise', 'Ketchup', 'Mustard', 'Pickles', 'Lettuce', 'Tomato', 'Onions'];
</script>

<form>
  {#each burgerOptions as burger (burger)}
    <!--
      Radio buttons are mutually exclusive, so selecting
      an option will overwrite the previously selected
      option
     -->
    <label>
      <input type="radio" value={burger} bind:group={burger} />
      {burger}
    </label>
  {/each}
  {#each toppingOptions as topping (topping)}
    <!--
      Selecting a binded checkbox will add its value to
      an array of selected options
    -->
    <label>
      <input type="checkbox" value={topping} bind:group={toppings} />
      {topping}
    </label>
  {/each}
</form>
```

## Svelte stores

Svelte stores let you have a level of abstraction regarding data so that multiple components access the same data without having to pass it around and having to spend a lot of effort ensuring consistency.
Stores are basically objects with a `subscribe` method that lets you subscribe to changes in the information and react accordingly.
You have lots of stores options.

### Writable store

Writable store is the most basic store. It's a value (number, string, object, array, whatever you want) that can be updated by anyone who has access to it.

In addition to the common `subscribe` method, `writable` stores also have `set` and `update` methods. The first one completely overwrites the store value and the second one receives a function with the current store value as the first parameter.

```js
import { writable } from 'svelte/store';

const count = writable(0);

const resetCount = () => {
  count.set(0);
};

const increaseCount = () => {
  count.update(countValue => countValue + 2);
};
```

### Readable store

You usually don't need anyone to be able to update the store's data. In that case you can use a `readable` store. These stores don't have `set` or `update` methods and are declared a little bit different.

When you declare a `readable` store you pass two arguments: `initialValue` and `initializer`. The `initialValue` may be `undefined` or `null`, and the `initializer` is a function that receives a `set` function to set the store value and returns a `stop` function.

The `initializer` function is called when the store is first subscribed to and its `stop` return function is called when the last subscriber unsubscribes.


```js
import { readable } from 'svelte/store';

const date = (new Date(), (set) => {
  const interval = setInterval(() => {
    set(new Date());
  })

  return () => {
    clearInterval(interval);
  }
});
```

### Derived store

A derived store is a store that calculates its value depending on other stores.

```js
import { readable, derived } from 'svelte/store';

const followers = readable(...);

const followees = readable(...);

const friends = derived(
  [followers, followees], // if only deriving state from one store, you can pass the store without using an array
  ([$followers, $followees]) => ( // the order of the stores is the same as defined above
    $followers.filter((follower) => $followees.indexOf(follower) !== -1)
  ),
);
```

### Custom stores

You may define your own stores. One possible use for this is making an interface for a `writable` store, so the components may be able to requests updates on the store without directly updating it.

```js
  import { writable } from 'svelte/store';

  const users = () => {
    const { subscribe, set } = writable([]);

    const loadUsers = async () => {
      const users = await api.getUsers();
      set(users);
    }

    return {
      subscribe,
      loadUsers,
    }
  }

  export default users();
```

### Auto subscription to stores

You don't always need to subscribe to a store, you can sometimes use the auto subscription feature like this:

```html
<script>
  import { store } from '../stores/customStore.js';
</script>

<div>
  The store's value is: {$store}
</div>
```
