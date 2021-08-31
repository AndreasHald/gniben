<script>
	import '../app.postcss';
</script>

<nav>
	<a href="/">Docs</a>
	<a href="/examples">Examples</a>
</nav>
<slot />

<style global>
	body {
		@apply bg-gray-100;
	}
</style>
