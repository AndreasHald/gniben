<script lang="ts" context="module">
</script>

<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
	import { createPopper } from '@popperjs/core';
	import type { Instance, Placement } from '@popperjs/core';
	import type { HTMLAttributes } from './types';

	type Direction = 'top' | 'bottom' | 'left' | 'right';

	export let id: string = `${Math.random().toString(36).substring(2, 9)}`;
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
			offset: [0, 4]
		}
	};

	function getDirection(placement: Placement): Direction {
		if (['top', 'top-start', 'top-end'].includes(placement)) return 'top';
		if (['bottom', 'bottom-start', 'bottom-end'].includes(placement)) return 'bottom';
		if (['left', 'left-start', 'left-end'].includes(placement)) return 'left';
		if (['right', 'right-start', 'right-end'].includes(placement)) return 'right';
	}

	let hydrated = false;
	export let element: HTMLDetailsElement | undefined = undefined;
	export let target: HTMLElement | undefined = undefined;
	let contentOuter: HTMLDivElement;
	export let content: HTMLDivElement | undefined = undefined;
	let instance: Instance;
	let observer: MutationObserver;
	let open: boolean;
	$: direction = getDirection(placement);
	$: instance && instance.setOptions({ placement });

	onMount(() => {
		hydrated = true;

		return () => {
			if (instance) instance.destroy();
			if (observer) observer.disconnect();
			removeListeners();
		};
	});

	function addListeners() {
		content.addEventListener('click', handleClickInside);
		document.addEventListener('click', handleClickOutside);
		content.addEventListener('keydown', handleEscape);
		content.addEventListener('keydown', handleUpDown);
	}

	function removeListeners() {
		content.removeEventListener('click', handleClickInside);
		document.removeEventListener('click', handleClickOutside);
		content.removeEventListener('keydown', handleEscape);
		content.removeEventListener('keydown', handleUpDown);
	}

	onDestroy(() => {
		content?.remove();
	});

	function markChildren() {
		content.querySelectorAll('*').forEach((child) => {
			child.setAttribute('data-gniben-parent', id);
		});
	}

	function handleClickInside(event: MouseEvent) {
		if (!event.target) return;
		if (event.target instanceof HTMLElement) {
			if (
				event.target.hasAttribute('data-gniben-close') &&
				event.target.getAttribute('data-gniben-close') !== 'false' &&
				event.target.getAttribute('data-gniben-parent') === id
			) {
				element.open = false;
			}
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (event.target) {
			if (event.target instanceof HTMLElement) {
				const parent = event.target.getAttribute('data-gniben-parent');
				if (parent) {
					const targetWithInContent = content.querySelectorAll(`details[data-gniben-id="${parent}"]`);
					if (targetWithInContent.length > 0) {
						return;
					}
				}
			}
			if (!content.contains(event.target as Node) && !element.contains(event.target as Node)) {
				element.open = false;
			}
		}
	}

	function handleEscape(event: KeyboardEvent) {
		const { code } = event;
		if ((code === 'Escape' || code === 'Tab') && element.hasAttribute('open')) {
			event.stopPropagation();
			target.focus();
			element.open = false;
		}
	}

	function handleUpDown(event: KeyboardEvent) {
		const { code } = event;
		if (!['ArrowDown', 'ArrowUp'].includes(code)) return;
		const focusedElement = document.activeElement as FocusableElement;
		const focusableElements = getFocusableElements(content);
		if (focusableElements.length === 0) return;
		if (!focusedElement) {
			if (code === 'ArrowDown') {
				focusableElements[0].focus();
			} else {
				focusableElements[focusableElements.length - 1].focus();
			}
			return;
		}

		if (!content.contains(focusedElement)) {
			if (code === 'ArrowDown') {
				focusableElements[0].focus();
			} else {
				focusableElements[focusableElements.length - 1].focus();
			}
			return;
		}
		const currentIndex = focusableElements.indexOf(focusedElement);
		const targetIndex = code === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
		const targetElement = focusableElements[targetIndex];
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

		removeListeners();

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
				strategy: moveContent ? 'fixed' : 'absolute',
				modifiers: [{ name: 'eventListeners', enabled: false }]
			});

		if (!observer)
			observer = new MutationObserver(() => {
				instance.update();
				markChildren();
			});
	}

	async function handleOpen() {
		init();
		if (matchWidth) {
			content.style.width = `${target.clientWidth}px`;
		}

		if (moveContent) {
			document.body.appendChild(content);
		}

		instance.setOptions({
			modifiers: [offsetModifier, { name: 'eventListeners', enabled: true }]
		});
		instance.forceUpdate();

		open = true;

		observer.observe(content, {
			subtree: true,
			childList: true
		});

		markChildren();
		addListeners();

		const elementToFocus = content.querySelector('[autofocus]');
		if (elementToFocus && 'focus' in elementToFocus) {
			(elementToFocus as FocusableElement).focus();
		}
	}
</script>

<details
	data-gniben-id={id}
	on:click
	{...containerProperties}
	on:toggle={handleToggle}
	on:toggle
	bind:this={element}
	class:bottom-open={direction === 'bottom'}
	class:top-open={direction === 'top'}
	class:left-open={direction === 'left'}
	class:right-open={direction === 'right'}
	class:nojs={!hydrated}
	class:relative={true}
>
	<summary {...targetProperties} bind:this={target} class:pointer-events-none={disabled}>
		<slot {open} {element} {target} {content} {hydrated} name="target">Click me</slot>
	</summary>
	<div bind:this={contentOuter} class="absolute {placement}-outer">
		<div
			bind:this={content}
			class:top={placement === 'top'}
			class:top-start={placement === 'top-start'}
			class:top-end={placement === 'top-end'}
			class:left={placement === 'left'}
			class:left-start={placement === 'left-start'}
			class:left-end={placement === 'left-end'}
			class:right={placement === 'right'}
			class:right-start={placement === 'right-start'}
			class:right-end={placement === 'right-end'}
			class:bottom={placement === 'bottom'}
			class:bottom-start={placement === 'bottom-start'}
			class:bottom-end={placement === 'bottom-end'}
			class:open-generic={true}
			{...contentProperties}
		>
			<slot {open} {element} {target} {content} {hydrated} name="content">popover content</slot>
		</div>
	</div>
</details>

<style lang="postcss">
	/* Animation styles */
	@keyframes bottom-open {
		0% {
			opacity: 0;
			transform: scale(0.9);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
	@keyframes top-open {
		0% {
			opacity: 0;
			transform: scale(0.9);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
	@keyframes left-open {
		0% {
			opacity: 0;
			transform: scale(0.9);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
	@keyframes right-open {
		0% {
			opacity: 0;
			transform: scale(0.9);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes open-generic {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.open-generic {
		animation: open-generic 0.2s ease-in-out;
	}

	.bottom-open[open] > *:not(summary) {
		animation: bottom-open 0.2s ease-in-out;
	}
	.top-open[open] > *:not(summary) {
		animation: top-open 0.2s ease-in-out;
	}
	.left-open[open] > *:not(summary) {
		animation: left-open 0.2s ease-in-out;
	}
	.right-open[open] > *:not(summary) {
		animation: right-open 0.2s ease-in-out;
	}

	/* Placement nojs styles */

	/** 
	* BOTTOM
	*/

	/* All bottom elements should be placed beneath */
	.bottom-outer,
	.bottom-end-outer,
	.bottom-start-outer {
		@apply top-full;
	}

	/* Bottom outer for % changes */
	.bottom-outer {
		@apply left-1/2;
	}
	.bottom-start-outer {
		@apply left-0;
	}
	.bottom-end-outer {
		@apply right-0;
	}

	/* If js is not available all bottom elements should have margin top  */
	.nojs .bottom-outer,
	.nojs .bottom-end-outer,
	.nojs .bottom-start-outer {
		@apply mt-1;
	}

	/* Specific styles to place different bottom elements */
	.bottom {
		@apply transform;
		@apply -translate-x-1/2;
	}

	/** 
	* TOP
	*/

	/* All top elements should be placed on top */
	.top-outer,
	.top-end-outer,
	.top-start-outer {
		@apply bottom-full;
	}

	.top-outer {
		@apply left-1/2;
	}
	.top-start-outer {
		@apply left-0;
	}
	.top-end-outer {
		@apply right-0;
	}

	/* If js is not available all top elements should have margin bottom  */
	.nojs .top-outer,
	.nojs .top-end-outer,
	.nojs .top-start-outer {
		@apply mb-1;
	}

	/* Specific styles to place different top elements */
	.top {
		@apply transform;
		@apply -translate-x-1/2;
	}

	/** 
	* LEFT
	*/

	/* All left elements should be placed on left */
	.left-outer,
	.left-end-outer,
	.left-start-outer {
		@apply right-full;
	}

	.left-outer {
		@apply top-1/2;
	}
	.left-start-outer {
		@apply top-0;
	}
	.left-end-outer {
		@apply top-full;
	}

	/* If js is not available all left elements should have margin right  */
	.nojs .left-outer,
	.nojs .left-end-outer,
	.nojs .left-start-outer {
		@apply mr-1;
	}

	/* Specific styles to place different left elements */
	.left {
		@apply transform;
		@apply -translate-y-1/2;
	}
	.left-end {
		@apply transform;
		@apply -translate-y-full;
	}

	/** 
	* RIGHT
	*/

	/* All left elements should be placed on right */
	.right-outer,
	.right-end-outer,
	.right-start-outer {
		@apply left-full;
	}

	/* If js is not available all left elements should have margin left  */
	.nojs .right-outer,
	.nojs .right-end-outer,
	.nojs .right-start-outer {
		@apply ml-1;
	}

	/* Specific styles to place different right elements */
	.right-outer {
		@apply top-1/2;
	}
	.right-end-outer {
		@apply top-full;
	}
	.right-start-outer {
		@apply top-0;
	}

	.right {
		@apply transform;
		@apply -translate-y-1/2;
	}
	.right-end {
		@apply transform;
		@apply -translate-y-full;
	}

	/* Class to remove default details summary arrow */
	.marker-none {
		list-style-type: none;
	}
	.marker-none::-webkit-details-marker {
		display: none;
	}

	/* Class that is applied when JS is not available (during ssr) */
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
