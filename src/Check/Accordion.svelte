<script>
	import { slide } from "svelte/transition";
	export let title;
	let isOpen = false;
	const toggle = () => isOpen = !isOpen;
	export let id = "ccs-" + Math.random().toString(36);
	export let iconDescription = "Expand/Collapse";
	export let isDisabled = false;
	export let hasMatches = false;
</script>

<li class="input" class:is-expanded={isOpen} on:click={toggle} aria-disabled={isDisabled}>
	<slot name="status" />
	<slot name="input" />
	<fieldset aria-expanded={isOpen} aria-disabled={isDisabled}>
		{#if hasMatches}
		<button
			aria-controls="{id}"
			id="{id}"
			on:click|stopPropagation={toggle}
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
			<slot name="current" />
		</button>
		{/if}
		{#if isOpen}
		<div
			class="options"
			transition:slide={{ duration: 300 }}
			id="{id}">
			<slot name="content" />
		</div>
		{/if}
	</fieldset>
</li>

<style type="scss">

	.input {
		transition: border-color var(--transition), box-shadow var(--transition);
		box-shadow: var(--shadow-small-none);
		display: grid;
		grid-column-gap: var(--spacing-1);
		grid-template-columns: 10px 2fr 4fr;
		margin-bottom: var(--spacing-1);
		padding: calc(var(--spacing-1) / 2);
		border: 1px solid transparent;
		border-radius: 3px;

		&.is-expanded {
			border-color: var(--gray-2);
			box-shadow: var(--shadow-small-color);
		}

		&[aria-disabled=false] {
			&, button {
				cursor: pointer;
			}

			&:hover {
				border-color: var(--gray-2);
			}
		}
	}
	
fieldset {
	margin: 0;
	border: 0;
	padding: 0;
	display: grid;
	grid-template-columns: auto 1fr;

	button, .options {
		grid-column: 1 / 3;
		display: grid;
		grid-template-columns: subgrid;
	}

	.options ul {
		
	}

	&[aria-disabled=true] {
		svg {
			color: var(--gray-2);
		}
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