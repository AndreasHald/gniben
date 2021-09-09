<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { createPopper } from '@popperjs/core';
	import type { Instance, Placement } from '@popperjs/core';

	type Direction = 'top' | 'bottom' | 'left' | 'right';

	export let placement: Placement = 'bottom-end';
	export let disabled = false;
	export let matchWidth = false;
	export let detailsClasses = 'inline';
	export let targetClasses =
		'cursor-pointer inline marker-none rounded focus:outline-none focus:ring ring-indigo-500';
	export let contentClasses =
		'rounded-md bg-white border border-gray-300 shadow-lg flex flex-col overflow-hidden';

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

	function handleClick(event: MouseEvent) {
		if (!event.target) return;
		if (event.target instanceof HTMLElement) {
			if (event.target.hasAttribute('data-gniben-close')) {
				element.open = false;
			}
		}
		if (event.target)
			if (!element.contains(event.target as Node)) {
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
		instance.setOptions({
			modifiers: [offsetModifier, { name: 'eventListeners', enabled: false }]
		});

		document.removeEventListener('keydown', handleKeys, { capture: true });
		document.removeEventListener('click', handleClick, { capture: true });

		observer.disconnect();

		open = false;

		// contentOuter.appendChild(content);
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
		instance.setOptions({
			modifiers: [offsetModifier, { name: 'eventListeners', enabled: true }]
		});
		instance.forceUpdate();

		if (matchWidth) {
			targetWidth = target.clientWidth;
		}

		open = true;

		observer.observe(content, {
			subtree: true,
			childList: true
		});

		document.addEventListener('keydown', handleKeys, { capture: true });
		document.addEventListener('click', handleClick, { capture: true });

		// document.body.appendChild(content);

		await tick();
		const elementToFocus = content.querySelector('[autofocus]');
		if (elementToFocus && 'focus' in elementToFocus) {
			(elementToFocus as FocusableElement).focus();
		}
	}
</script>

<details class={detailsClasses} on:toggle={handleToggle} bind:this={element} class:nojs={!hydrated}>
	<summary bind:this={target} class:pointer-events-none={disabled} class={targetClasses}>
		<slot {open} {element} {target} {content} name="target">Click me</slot>
	</summary>
	<div bind:this={contentOuter}>
		<div
			bind:this={content}
			style={matchWidth ? `width:${targetWidth}px;` : ''}
			class="absolute {placement}"
			class:invisible={open === false}
		>
			<div class="{contentClasses} {direction}-open">
				<slot {open} {element} {target} {content} name="content">popover content</slot>
			</div>
		</div>
	</div>
</details>

<style lang="postcss">
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
		animation: bottom-open 0.1s ease-in-out;
	}
	.top-open {
		animation: top-open 0.1s ease-in-out;
	}
	.left-open {
		animation: left-open 0.1s ease-in-out;
	}
	.right-open {
		animation: right-open 0.1s ease-in-out;
	}

	/* Placement nojs styles */
	.bottom {
		@apply top-full;
		@apply mt-1;
		@apply left-1/2;
		transform: translate(-50%, 0);
	}
	.bottom-end {
		@apply top-full;
		@apply right-0;
		@apply mt-1;
	}
	.bottom-start {
		@apply top-full;
		@apply left-0;
		@apply mt-1;
	}

	.top {
		@apply bottom-full;
		@apply mb-1;
		@apply left-1/2;
		transform: translate(-50%, 0);
	}
	.top-end {
		@apply bottom-full;
		@apply right-0;
		@apply mb-1;
	}
	.top-start {
		@apply bottom-full;
		@apply left-0;
		@apply mb-1;
	}

	.left {
		@apply right-full;
		@apply top-1/2;
		@apply mr-1;
		transform: translate(0, -50%);
	}
	.left-end {
		@apply right-full;
		@apply top-full;
		@apply mr-1;
	}
	.left-start {
		@apply right-full;
		@apply top-0;
		@apply mr-1;
	}
	.right {
		@apply left-full;
		@apply top-1/2;
		@apply ml-1;
		transform: translate(0, -50%);
	}
	.right-end {
		@apply left-full;
		@apply top-full;
		@apply ml-1;
	}
	.right-start {
		@apply left-full;
		@apply top-0;
		@apply ml-1;
	}

	.marker-none {
		list-style-type: none;
	}
	.marker-none::-webkit-details-marker {
		display: none;
	}

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
		z-index: 80;
	}
</style>
