<script context="module" lang="ts">
	export const hydrate = true;
</script>

<script lang="ts">
	import Gniben from '$lib/gniben.svelte';

	function getPromise(ms: number) {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, ms);
		});
	}
</script>

<div class="max-w-xl mx-auto space-y-20">
	<div>
		<h4 class="header">Simple</h4>
		<Gniben>
			<div slot="target" class="button">i contain more information</div>
			<div slot="content" class="py-1 px-2">content</div>
		</Gniben>
	</div>
	<div>
		<h4 class="header">Menu example</h4>
		<Gniben>
			<div slot="target" class="button">More</div>
			<div slot="content" class="flex flex-col w-44">
				<a href="" class="hover:bg-gray-100">Link # 1</a>
				<a href="" class="hover:bg-gray-100">Link # 2</a>
				<a href="" class="hover:bg-gray-100">Link # 3</a>
			</div>
		</Gniben>
	</div>
	<div>
		<h4 class="header">Nested global</h4>
		<Gniben moveContent>
			<div slot="target" class="button">More</div>
			<div slot="content" class="flex flex-col w-44">
				<Gniben moveContent>
					<div slot="target" class="button">even more</div>
			<div slot="content" class="flex flex-col w-44">inner</div>
				</Gniben>
			</div>
		</Gniben>
	</div>
	<div>
		<h4 class="header">Autofocus</h4>
		<p class="subtitle">
			Will automatically autofocus the first element with the autofocus attribute
		</p>
		<Gniben>
			<div slot="target" class="button">Open me</div>
			<div slot="content" class="py-1 px-2 flex flex-col space-y-2">
				<label>
					Input without autofocus
					<input class="border" type="text" />
				</label>
				<label>
					Input with autofocus
					<input class="border" autofocus type="text" />
				</label>
			</div>
		</Gniben>
	</div>
	<div>
		<h4 class="header">Async content (preloaded)</h4>
		<p class="subtitle">Will load content async as soon as page is loaded</p>
		<Gniben>
			<div slot="target" class="button">Open me</div>
			<div slot="content" class="py-1 px-2 flex flex-col space-y-2">
				{#await getPromise(5000)}
					Loading...
				{:then d}
					Data
				{/await}
			</div>
		</Gniben>
	</div>
	<div>
		<h4 class="header">Async content</h4>
		<p class="subtitle">Will start loading content after popover has been opened</p>
		<Gniben let:open>
			<div slot="target" class="button">Open me</div>
			<div slot="content" class="py-1 px-2 flex flex-col space-y-2">
				{#if open}
					{#await getPromise(2000)}
						Loading...
					{:then d}
						Data
					{/await}
				{/if}
			</div>
		</Gniben>
	</div>
	<div>
		<h4 class="header">Keyboard navigation</h4>
		<p class="subtitle">Open and use arrow up / down</p>
		<Gniben>
			<div slot="target" class="button">Open me</div>
			<div slot="content" class="py-1 px-2 flex flex-col space-y-2">
				<a href="" class="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">Link # 1</a>
				<a href="" class="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">Link # 2</a>
				<a href="" class="hover:bg-gray-100 focus:bg-gray-100 focus:outline-none">Link # 3</a>
			</div>
		</Gniben>
	</div>

	<div>
		<h4 class="header">Close on click</h4>
		<p class="subtitle">
			add <code>data-gniben-close</code> to the element whose click events should close
		</p>
		<Gniben>
			<div slot="target" class="button">Open me</div>
			<div slot="content">
				<button class="button border-0" data-gniben-close>Click me to close</button>
			</div>
		</Gniben>
	</div>
	<div>
		<h4 class="header">Match width</h4>
		<p class="subtitle" />
		<Gniben matchWidth>
			<div slot="target" class="button">Open me</div>
			<div slot="content">
				<button class="button border-0" data-gniben-close>Click me to close</button>
			</div>
		</Gniben>
	</div>
	<div>
		<h4 class="header">Nested</h4>
		<Gniben id="outer" debug>
			<div slot="target" class="button">Open me</div>
			<div slot="content" class="flex flex-col p-2 space-y-2">
				<button autofocus tabindex="0" class="button">does nothing</button>
				<input type="text" value="some value">
				<Gniben id="inner" debug>
					<svelte:fragment slot="target">
						<div class="button border-0">Click me to open nested</div>
					</svelte:fragment>
					<div slot="content">
						<input type="text" autofocus value="some value">
						<button class="button border-0" data-gniben-close
							>Click me to close the nested menu</button
						>
					</div>
				</Gniben>
			</div>
		</Gniben>
	</div>
	<div class="mt-auto">
		<h4 class="header">Positional</h4>
		<p class="subtitle">Resize window to attempt to overflow</p>
		<Gniben>
			<div slot="target" class="button">Open me</div>
			<div slot="content">
				<button class="button border-0" data-gniben-close
					>Resize window to attempt overflow me</button
				>
			</div>
		</Gniben>
	</div>

	<div>
		<h4 class="header">Wrapped in transform</h4>
		<div class="bg-green-100 w-80 h-80 transform translate-x-0">
			<Gniben>
				<div slot="target" class="button">Open me</div>
				<div slot="content">
					<button class="button border-0" data-gniben-close
						>Click me</button
					>
				</div>
			</Gniben>
		</div>
	</div>
</div>

<style lang="postcss" global>
	.button {
		@apply py-1 px-2 bg-white rounded shadow border border-gray-300 hover:bg-gray-100 active:bg-gray-200;
	}

	.header {
		@apply text-lg;
	}

	.subtitle {
		@apply text-sm;
	}
</style>
