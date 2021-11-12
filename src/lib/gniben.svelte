<script lang="ts" context="module">
</script>

<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
	import { createPopper } from '@popperjs/core';
	import type { Instance, Placement } from '@popperjs/core';
	import type { HTMLAttributes } from './types';

	type Direction = 'top' | 'bottom' | 'left' | 'right';

	export let placement: Placement = 'bottom-end';
	export let containerProperties: HTMLAttributes = {
		class: 'inline'
	};
	export let targetProperties: HTMLAttributes = {
		class: 'cursor-pointer inline marker-none rounded focus:outline-none focus:ring ring-indigo-500'
	};
	export let contentProperties: HTMLAttributes = {
		class: 'rounded-md bg-white border border-gray-300 shadow-lg flex flex-col overflow-hidden'
	};
	export let disabled = false;
	export let matchWidth = false;
	export let moveContent = false;

	const offsetModifier = {
		name: 'offset',
		options: {
			offset: [0, 8]
		}
	};

	function getDirection(placement: Placement): Direction {
		if (['top', 'top-start', 'top-end'].includes(placement)) return 'top';
		if (['bottom', 'bottom-start', 'bottom-end'].includes(placement)) return 'bottom';
		if (['left', 'left-start', 'left-end'].includes(placement)) return 'left';
		if (['right', 'right-start', 'right-end'].includes(placement)) return 'right';
	}

	let hydrated = false;
	let element: HTMLDetailsElement;
	let target: HTMLElement;
	let targetWidth: number;
	let contentOuter: HTMLDivElement;
	let content: HTMLDivElement;
	let instance: Instance;
	let observer: MutationObserver;
	let open: boolean;
	$: direction = getDirection(placement);

	onMount(() => {
		hydrated = true;

		return () => {
			if (instance) instance.destroy();
			if (observer) observer.disconnect();
			document.removeEventListener('click', handleClick, { capture: true });
			document.removeEventListener('keydown', handleKeys, { capture: true });
		};
	});

	onDestroy(() => {
		content?.remove();
	});

	function handleClick(event: MouseEvent) {
		if (!event.target) return;
		if (event.target instanceof HTMLElement) {
			if (
				event.target.hasAttribute('data-gniben-close') &&
				event.target.getAttribute('data-gniben-close') !== 'false'
			) {
				element.open = false;
			}
		}
		if (event.target)
			if (!content.contains(event.target as Node) && !element.contains(event.target as Node)) {
				element.open = false;
			}
	}

	function handleKeys(event: KeyboardEvent) {
		const { code } = event;

		const handledKeys = ['ArrowDown', 'ArrowUp', 'Escape', 'Tab'];
		if (!handledKeys.includes(code)) return;

		// Handle Escape
		if (code === 'Escape' && element.hasAttribute('open')) {
			element.open = false;
			target.focus();
			event.stopPropagation();
			return;
		}

		const focusedElement = document.activeElement as FocusableElement;
		const focusAbleElements = getFocusableElements(content);

		if (focusAbleElements.length === 0) return;

		// Handle Tab
		if (code === 'Tab') {
			const lastElementHasFocus =
				focusedElement === focusAbleElements[focusAbleElements.length - 1];
			const firstElementHasFocus = focusedElement === focusAbleElements[0];
			if (!focusAbleElements.includes(focusedElement) && focusAbleElements.length > 0) {
				focusAbleElements[0].focus();
			}
			if (firstElementHasFocus && event.shiftKey) {
				event.preventDefault();
			}
			if (lastElementHasFocus && !event.shiftKey) {
				event.preventDefault();
			}
			return;
		}

		// Handle key up / down
		if (!focusedElement) {
			if (code === 'ArrowDown') {
				focusAbleElements[0].focus();
			} else {
				focusAbleElements[focusAbleElements.length - 1].focus();
			}
			return;
		}

		if (!content.contains(focusedElement)) {
			if (code === 'ArrowDown') {
				focusAbleElements[0].focus();
			} else {
				focusAbleElements[focusAbleElements.length - 1].focus();
			}
			return;
		}

		const currentIndex = focusAbleElements.indexOf(focusedElement);
		const targetIndex = code === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
		const targetElement = focusAbleElements[targetIndex];
		if (targetElement) {
			targetElement.focus();
		}
	}

	type FocusableElement =
		| HTMLAnchorElement
		| HTMLButtonElement
		| HTMLTextAreaElement
		| HTMLInputElement
		| HTMLSelectElement
		| HTMLDetailsElement;

	function getFocusableElements(element: Element | undefined): FocusableElement[] {
		if (element) {
			const elements = Array.from(
				element.querySelectorAll(
					'a, button:not(:disabled), input:not(:disabled):not([tabindex="-1"]), textarea:not(:disabled), select:not(:disabled), summary, [tabindex]:not([tabindex="-1"])'
				)
			) as Array<FocusableElement>;
			return elements;
		}
		return [];
	}

	function handleToggle() {
		if (element.hasAttribute('open')) {
			handleOpen();
		} else {
			handleClose();
		}
	}

	function handleClose() {
		if (instance) {
			instance.setOptions({
				modifiers: [offsetModifier, { name: 'eventListeners', enabled: false }]
			});
		}

		document.removeEventListener('keydown', handleKeys, { capture: true });
		document.removeEventListener('click', handleClick, { capture: true });

		if (observer) {
			observer.disconnect();
		}

		open = false;

		if (moveContent) {
			contentOuter.appendChild(content);
		}
	}

	function init() {
		if (!instance)
			instance = createPopper(target, content, {
				placement,
				strategy: 'fixed',
				modifiers: [{ name: 'eventListeners', enabled: false }]
			});

		if (!observer)
			observer = new MutationObserver(() => {
				instance.update();
			});
	}

	async function handleOpen() {
		init();
		if (matchWidth) {
			targetWidth = target.clientWidth;
		}
		await tick();
		instance.setOptions({
			modifiers: [offsetModifier, { name: 'eventListeners', enabled: true }]
		});
		instance.forceUpdate();

		open = true;

		observer.observe(content, {
			subtree: true,
			childList: true
		});

		document.addEventListener('keydown', handleKeys, { capture: true });
		document.addEventListener('click', handleClick, { capture: true });

		if (moveContent) {
			document.body.appendChild(content);
		}

		await tick();
		const elementToFocus = content.querySelector('[autofocus]');
		if (elementToFocus && 'focus' in elementToFocus) {
			(elementToFocus as FocusableElement).focus();
		}
	}
</script>

<details
	on:click
	{...containerProperties}
	on:toggle={handleToggle}
	on:toggle
	bind:this={element}
	class:nojs={!hydrated}
>
	<summary {...targetProperties} bind:this={target} class:pointer-events-none={disabled}>
		<slot {open} {element} {target} {content} {hydrated} name="target">Click me</slot>
	</summary>
	<div bind:this={contentOuter} class="absolute {placement}">
		<div
			bind:this={content}
			style={matchWidth ? `width:${targetWidth}px;` : ''}
			class="absolute {placement}"
			class:invisible={open === false}
		>
			<div
				class:bottom-open={direction === 'bottom'}
				class:top-open={direction === 'top'}
				class:left-open={direction === 'left'}
				class:right-open={direction === 'right'}
				{...contentProperties}
			>
				<slot {open} {element} {target} {content} {hydrated} name="content">popover content</slot>
			</div>
		</div>
	</div>
</details>

<style lang="postcss">
	/* Animation styles */
	@keyframes bottom-open {
		0% {
			opacity: 0;
			transform: scale(0.9) translateY(-10px);
		}
		100% {
			opacity: 1;
			transform: scale(1) translateY(0px);
		}
	}
	@keyframes top-open {
		0% {
			opacity: 0;
			transform: scale(0.9) translateY(10px);
		}
		100% {
			opacity: 1;
			transform: scale(1) translateY(0px);
		}
	}
	@keyframes left-open {
		0% {
			opacity: 0;
			transform: scale(0.9) translateX(10px);
		}
		100% {
			opacity: 1;
			transform: scale(1) translateX(0px);
		}
	}
	@keyframes right-open {
		0% {
			opacity: 0;
			transform: scale(0.9) translateX(-10px);
		}
		100% {
			opacity: 1;
			transform: scale(1) translateX(0px);
		}
	}

	.bottom-open {
		animation: bottom-open 0.2s ease-in-out;
	}
	.top-open {
		animation: top-open 0.2s ease-in-out;
	}
	.left-open {
		animation: left-open 0.2s ease-in-out;
	}
	.right-open {
		animation: right-open 0.2s ease-in-out;
	}

	/* Placement nojs styles */

	/** 
	* BOTTOM
	*/

	/* All bottom elements should be placed beneath */
	.bottom,
	.bottom-end,
	.bottom-start {
		@apply top-full;
	}

	/* If js is not available all bottom elements should have margin top  */
	.nojs .bottom,
	.nojs .bottom-end,
	.nojs .bottom-start {
		@apply mt-1;
	}

	/* Specific styles to place different bottom elements */
	.bottom {
		@apply left-1/2;
		transform: translate(-50%, 0);
	}
	.bottom-end {
		@apply right-0;
	}
	.bottom-start {
		@apply left-0;
	}

	/** 
	* TOP
	*/

	/* All top elements should be placed on top */
	.top,
	.top-end,
	.top-start {
		@apply bottom-full;
	}

	/* If js is not available all top elements should have margin bottom  */
	.nojs .top,
	.nojs .top-end,
	.nojs .top-start {
		@apply mb-1;
	}

	/* Specific styles to place different top elements */
	.top {
		@apply left-1/2;
		transform: translate(-50%, 0);
	}
	.top-end {
		@apply right-0;
	}
	.top-start {
		@apply left-0;
	}

	/** 
	* LEFT
	*/

	/* All left elements should be placed on left */
	.left,
	.left-end,
	.left-start {
		@apply right-full;
	}

	/* If js is not available all left elements should have margin right  */
	.nojs .left,
	.nojs .left-end,
	.nojs .left-start {
		@apply mr-1;
	}

	/* Specific styles to place different left elements */
	.left {
		@apply top-1/2;
		transform: translate(0, -50%);
	}
	.left-end {
		@apply top-full;
	}
	.left-start {
		@apply top-0;
	}

	/** 
	* LEFT
	*/

	/* All left elements should be placed on right */
	.right,
	.right-end,
	.right-start {
		@apply left-full;
	}

	/* If js is not available all left elements should have margin left  */
	.nojs .right,
	.nojs .right-end,
	.nojs .right-start {
		@apply ml-1;
	}

	/* Specific styles to place different right elements */
	.right {
		@apply top-1/2;
		transform: translate(0, -50%);
	}
	.right-end {
		@apply top-full;
	}
	.right-start {
		@apply top-0;
	}

	/* Class to remove default details summary arrow */
	.marker-none {
		list-style-type: none;
	}
	.marker-none::-webkit-details-marker {
		display: none;
	}

	/* Class that is applied when JS is not available (during ssr) */
	.nojs {
		@apply relative;
	}
	.nojs[open] > summary::before {
		background: transparent;
		bottom: 0;
		content: ' ';
		cursor: default;
		display: block;
		left: 0;
		position: fixed;
		right: 0;
		top: 0;
	}
</style>
