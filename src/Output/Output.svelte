<script>
	import { PAIRS, OUTPUT } from '$lib/../store.js';
	import { OUTPUT_OPTIONS, DELIMITERS } from '$lib/../config.js';
	import isUndefined from 'lodash/isUndefined';
	import { writable } from 'svelte/store';
	const DELIMITER = writable(DELIMITERS[0].value);
	const INCLUDE_INPUT = writable(true);
</script>

<div class="page-output">
	<h2 class="label">Copy matchings</h2>
	<header>
		<label>
			<input type="checkbox" bind:checked={$INCLUDE_INPUT}>
			Include input
		</label>
		<select bind:value={$DELIMITER} disabled={!$INCLUDE_INPUT}>
			{#each DELIMITERS as { value, label }}
				<option value={value}>
					{ label }
				</option>
			{/each}
		</select>
		<select bind:value={$OUTPUT}>
			{#each OUTPUT_OPTIONS as question}
				<option value={question}>
					{question}
				</option>
			{/each}
		</select>
	</header>
	<pre class="pairs">
		{#each $PAIRS as [input, partner]}
		{#if $INCLUDE_INPUT}{input}{ @html $DELIMITER }{/if}{isUndefined(partner) ? '🚫' : partner}<br />
		{/each}
	</pre>
</div>

<style type="scss">
	.page-output {
		.pairs {
			user-select: all;
			background-color: var(--gray-1);
	    border: 0;
	    border: 1px solid var(--gray-2);
	    padding: calc(var(--spacing-1) / 3);
	    &:focus {
	      border-color: var(--color-interactive);
	      outline: none;
	    }
		}
	}

</style>