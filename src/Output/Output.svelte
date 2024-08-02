<script>
	import { PAIRS, OUTPUT, DELIMITER, INCLUDE_INPUT, INCLUDE_NAME } from '$lib/store.js';
	import { OUTPUT_OPTIONS, DELIMITERS } from '$lib/config.js';
	import isUndefined from 'lodash/isUndefined.js';
	</script>

<div class="page-output">
	<header>
		<h2 class="label">Copy matchings</h2>
		<label class="setting">
			Output country codes
			<select bind:value={$OUTPUT}>
				{#each OUTPUT_OPTIONS as question}
					<option value={question.value}>
						{question.label}
					</option>
				{/each}
			</select>
		</label>
		<label class="setting-left">
			<input type="checkbox" bind:checked={$INCLUDE_INPUT}>
			Include input value
		</label>
		<label class="setting-left">
			<input type="checkbox" bind:checked={$INCLUDE_NAME}>
			Include common name
		</label>
		<label class="setting">
			Separate output by
			<select bind:value={$DELIMITER} disabled={!$INCLUDE_INPUT && !$INCLUDE_NAME}>
				{#each DELIMITERS as { value, label }}
					<option value={value}>
						{ label }
					</option>
				{/each}
			</select>
		</label>
	</header>
	<div>
		{#if $PAIRS.length}
		<pre class="pairs">
			{#each $PAIRS as [input, code, name]}
			{#if $INCLUDE_INPUT}{input}{ @html $DELIMITER }{/if}{#if $INCLUDE_NAME}{name}{ @html $DELIMITER }{/if}{isUndefined(code) ? 'unknown' : code}<br />
			{/each}
		</pre>
		{/if}
	</div>
</div>

<style lang="scss">
	.page-output {
		.pairs {
			position: sticky;
    	top: var(--spacing-1);
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

		header {
			display: grid;
			grid-template-columns: auto 1fr 2fr;
			grid-column-gap: var(--spacing-1);
			grid-row-gap: var(--spacing-1);

			.label, label {
				grid-column-end: span 3;
			}
		}
	}

</style>
