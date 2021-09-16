<script context="module" lang="ts">
	export const hydrate = true;
</script>

<script lang="ts">
	import Gniben from '$lib/gniben.svelte';
</script>

<div class="flex w-40">
	<a
		class="example-btn rounded-md rounded-r-none py-1 text-center focus:z-10"
		style="line-height:1.8rem;"
		href="">Save</a
	>
	<Gniben
		containerProperties={{ class: '-ml-px' }}
		targetProperties={{
			class: `example-btn marker-none rounded-md rounded-l-none py-2`
		}}
		contentProperties={{ class: 'example-popover w-52' }}
	>
		<svg
			slot="target"
			class="w-5 h-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 9l-7 7-7-7"
			/></svg
		>
		<svelte:fragment slot="content">
			<a class="example-popover-btn" href="">Save and exit</a>
			<a class="example-popover-btn" href="">Exit and discard changes</a>
		</svelte:fragment>
	</Gniben>
</div>

<style lang="postcss" global>
	.example-btn {
		@apply bg-white 
			placeholder-gray-400
			text-gray-800 
			border border-gray-300 
			shadow-sm
			hover:bg-gray-100
			active:bg-gray-200 
			outline-none
			focus:outline-none
			px-3 w-full
			transition ease-in-out duration-150 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500;
	}

	.example-popover {
		@apply rounded-md bg-white border border-gray-300 shadow-lg flex flex-col overflow-hidden;
	}

	.example-popover-btn {
		@apply focus:outline-none w-full
            text-left
            text-gray-700
            inline-flex 
            items-center
            px-4 py-2 text-sm
			active:bg-gray-200
            focus:bg-gray-100
            hover:bg-gray-100
            disabled:opacity-50
            disabled:cursor-not-allowed;
	}
</style>
