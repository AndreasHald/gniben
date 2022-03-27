<script context="module" lang="ts">
	export const hydrate = true;
</script>

<script lang="ts">
import { page } from '$app/stores';

	let placement: Placement = $page.url.searchParams.get('placement') as Placement ?? 'top';
	import Gniben from '$lib/gniben.svelte';
	import type { Placement } from '@popperjs/core';
</script>

<div class="w-80 h-80 bg-blue-200 grid gap-4 grid-cols-3 grid-rows-3">
	<div class="flex items-center justify-center">
		<label class="flex flex-col items-center">
			Top start
			<input type="radio" name="placement" value='top-start' bind:group={placement}>
		</label>
	</div>
	<div class="flex items-center justify-center">
		<label class="flex flex-col items-center">
			Top
			<input type="radio" name="placement" value='top' bind:group={placement}>
		</label>
	</div>
	<div class="flex items-center justify-center">
		<label class="flex flex-col items-center">
			Top end
			<input type="radio" name="placement" value='top-end' bind:group={placement}>
		</label>
	</div>
	<div class="flex items-center justify-center">
		<label class="flex flex-col items-center">
			Left
			<input type="radio" name="placement" value='left' bind:group={placement}>
		</label>
	</div>
	<div class="flex items-center justify-center">
		<Gniben targetProperties={{
			class: `example-btn marker-none rounded-md py-2`
		}} {placement} contentProperties={{class: 'w-40 h-20 bg-white'}}></Gniben>
	</div>
	<div class="flex items-center justify-center">
		<label class="flex flex-col items-center">
			Right
			<input type="radio" name="placement" value='right' bind:group={placement}>
		</label>
	</div>
	<div class="flex items-center justify-center">
		<label class="flex flex-col items-center">
			Bottom start
			<input type="radio" name="placement" value='bottom-start' bind:group={placement}>
		</label>
	</div>
	<div class="flex items-center justify-center">
		<label class="flex flex-col items-center">
			Bottom
			<input type="radio" name="placement" value='bottom' bind:group={placement}>
		</label>
	</div>
	<div class="flex items-center justify-center">
		<label class="flex flex-col items-center">
			Bottom end
			<input type="radio" name="placement" value='bottom-end' bind:group={placement}>
		</label>
	</div>
</div>

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
