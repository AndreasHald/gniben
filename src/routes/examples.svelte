<script lang="ts">
	import Gniben from '$lib/gniben.svelte';
</script>

<div class="space-y-8 px-8">
	<h4>Primary action with more actions</h4>

	<div class="items-center shadow inline-flex rounded">
		<a
			href=""
			class="py-1 px-2 bg-white rounded-l border-l border-t border-b border-gray-300 focus:outline-none focus:ring ring-indigo-500 hover:bg-gray-100 active:bg-gray-200"
			>Save</a
		>
		<Gniben
			targetClasses="cursor-pointer border-gray-300 border-r border-t border-b bg-white inline marker-none rounded-r focus:outline-none focus:ring ring-indigo-500 hover:bg-gray-100 active:bg-gray-200"
		>
			<div slot="target">
				<svg
					class="w-4 h-4 flex"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
					/></svg
				>
			</div>
			<div slot="content" class="flex flex-col">
				<a href="" class="hover:bg-gray-100 active:bg-gray-200 py-1 px-2">Save and open</a>
				<a href="" class="hover:bg-gray-100 active:bg-gray-200 py-1 px-2">Discard changes</a>
			</div>
		</Gniben>
	</div>
</div>

<style lang="postcss">
	.button {
		@apply py-1 px-2 bg-white rounded shadow border border-gray-300 hover:bg-gray-100 active:bg-gray-200;
	}
</style>
