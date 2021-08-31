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
