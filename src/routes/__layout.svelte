<script>
	import '../app.css';
</script>

<nav>
	<a href="/">Home</a>
	<a href="/examples">Examples</a>
	<a href="/demo">Properties demo</a>
</nav>

<div class="max-w-xl mx-auto space-y-20 flex flex-col">
	<slot />
</div>

<style global>
	body {
		@apply bg-gray-100;
	}
</style>
