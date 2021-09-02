<script lang="ts">
	import { onMount } from 'svelte';
	import { createPopper } from '@popperjs/core';
	import type { Instance, Placement } from '@popperjs/core';

	export let placement: Placement = 'bottom-end';
	export let disabled = false;
	export let detailsClasses = 'inline';
	export let targetClasses =
		'cursor-pointer inline marker-none rounded focus:outline-none focus:ring ring-indigo-500';
	export let contentClasses =
		'fixed mt-1 rounded-md bg-white border border-gray-300 shadow-lg flex flex-col overflow-hidden';

	const offsetModifier = {
		name: 'offset',
		options: {
			offset: [0, 8]
		}
	};

	let hydrated = false;
	let element: HTMLDetailsElement;
	let target: HTMLElement;
	let content: HTMLDivElement;
	let instance: Instance;
	let observer: MutationObserver;
	let open: boolean;

	interface $$Slots {
		content: {
			open: boolean;
			element: HTMLDetailsElement;
			target: HTMLElement;
			content: HTMLDivElement;
		};
		target: {
			open: boolean;
			element: HTMLDetailsElement;
			target: HTMLElement;
			content: HTMLDivElement;
		};
		default: {
			open: boolean;
			element: HTMLDetailsElement;
			target: HTMLElement;
			content: HTMLDivElement;
		};
	}

	onMount(() => {
		hydrated = true;
		instance = createPopper(target, content, {
			placement,
			strategy: 'fixed',
			modifiers: [{ name: 'eventListeners', enabled: false }]
		});

		observer = new MutationObserver((mutations) => {
			instance.update();
		});

		return () => {
			instance.destroy();
			observer.disconnect();
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
					'a, button, input, textarea, select, summary, [tabindex]:not([disabled]):not([tabindex="-1"])'
				)
			) as Array<FocusableElement>;
			return elements.filter((el) => !el.hasAttribute('disabled'));
		}
		return [];
	}

	function handleToggle(event: Event) {
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
	}

	function handleOpen() {
		open = true;

		observer.observe(content, {
			subtree: true,
			childList: true
		});

		document.addEventListener('keydown', handleKeys, { capture: true });
		document.addEventListener('click', handleClick, { capture: true });

		const elementToFocus = content.querySelector('[autofocus]');
		if (elementToFocus && 'focus' in elementToFocus) {
			(elementToFocus as FocusableElement).focus();
		}

		instance.forceUpdate();
		instance.setOptions({
			modifiers: [offsetModifier, { name: 'eventListeners', enabled: true }]
		});
	}
</script>

<details class={detailsClasses} on:toggle={handleToggle} bind:this={element} class:nojs={!hydrated}>
	<summary bind:this={target} class:pointer-events-none={disabled} class={targetClasses}>
		<slot {open} {element} {target} {content} name="target">Click me</slot>
	</summary>
	<div bind:this={content} class={contentClasses}>
		<slot {open} {element} {target} {content} name="content">popover content</slot>
	</div>
</details>

<style>
	.marker-none {
		list-style-type: none;
	}
	.marker-none::-webkit-details-marker {
		display: none;
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
