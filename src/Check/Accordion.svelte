<script>
	import { slide } from "svelte/transition";
	export let title;
	let isOpen = false;
	const toggle = () => isOpen = !isOpen;
	export let id = "ccs-" + Math.random().toString(36);
	export let iconDescription = "Expand/Collapse";
	export let isDisabled = false;
</script>

<fieldset aria-expanded={isOpen} aria-disabled={isDisabled}>
<dt class="list">
	<button
		aria-controls="{id}"
		id="{id}"
		on:click={toggle}
		aria-expanded={isOpen}
		disabled={isDisabled}>
		<svg
			aria-label="{iconDescription}"
			width="20"
			height="20"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			stroke="currentColor">
			<path d="M9 5l7 7-7 7" />
		</svg>
		<slot name="title" />
	</button>
</dt>
{#if isOpen}
<dd
	transition:slide={{ duration: 300 }}
	id="{id}">
	<slot name="content" />
</dd>
{/if}
</fieldset>

<style type="scss">
fieldset {
	margin: 0;
	padding: calc(var(--spacing-1) / 2);
	border: 1px solid transparent;
	border-radius: 3px;
	transition: border-color var(--transition), box-shadow var(--transition);
	box-shadow: var(--shadow-small-none);

	&[aria-disabled=false] {
		&:hover {
			border-color: var(--gray-2);

			button {
				cursor: pointer;
			}
		}
	}

	&[aria-disabled=true] {
		svg {
			color: var(--gray-2);
		}
	}

	&[aria-expanded=true] {
		border-color: var(--gray-2);
		box-shadow: var(--shadow-small-color);
	}
}
	dt {
		grid-column-start: 3;
  				grid-column-end: span 3;
	}

	dd {
		grid-column-start: 3;
  				grid-column-end: span 3;
	}
	svg {
		width: 1rem;
		margin-right: calc(var(--spacing-1) / 3);
	}
	button {
		display: flex;
	}
	button {
		border: none;
		background: none;
		color: inherit;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	svg { transition: transform 0.2s ease-in; }
	
	button[aria-expanded=true] svg { transform: rotate(0.25turn); }
</style>