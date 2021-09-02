# Gniben

A batteries included js optional popover

## Installation

```bash
npm i gniben
```

## Usage

```html
<script>
	import Gniben from 'gniben';
</script>

<Gniben>
	<button slot="target">Use to me toggle the popover</button>
	<div slot="content">
		Whatever you put here will be hidden/shown by pressing the button even without js enabled
	</div>
</Gniben>
```

## Slots

### Open

The open slot can be used for example to change content or styling based on whether or not the popover is open

```html
<Gniben let:open>
	<button slot="target">{#if open} i am now open {:else} i am closed {/if}</button>
	<div slot="content">...</div>
</Gniben>
```

### Elements

under the hood Gniben renders a [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) and [summary](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) element it exposes all relevant elements as slots so that you can reference them for focus management and what else you may need

```html
<!-- This -->
<Gniben let:element let:target let:content>
	<button slot="target">...</button>
	<div slot="content">...</div>
</Gniben>

<!-- Becomes -->
<details bind:this="{element}">
	<summary bind:this="{target}">
		<button>...</button>
	</summary>
	<div bind:this="{content}">...</div>
</details>
```
