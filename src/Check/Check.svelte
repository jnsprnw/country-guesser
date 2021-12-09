<script>
	import Accordion from './Accordion.svelte';
	import { OPTIONS, CUSTOM } from '$lib/../store.js';
	import round from 'lodash/round';
	import chroma from 'chroma-js';

	const color = chroma.scale(['#f7f4f9', '#ce1256']).mode('lab').domain([200, 30]);

	function selectCustomMatch (input, id) {
		CUSTOM.update((d) => {
			d[input] = id;
			return d;
		})
	}
</script>

<div class="page-check">
	<h2 class="label">Check for ambiguity</h2>
	<ul class="inputs">
		{#each $OPTIONS as [input, treffer, status, selection, pair]}
		<li class="input">
			<i>{#if status === 'WARNING'}⚠️{:else if status === 'ERROR'}🚫{:else}✅{/if}</i>
			<strong>{input}</strong>
			{#if treffer && treffer.length}
			<Accordion isDisabled={treffer.length < 2}>
			<strong class="current-selection" slot="title">{#if pair }<span class:is-custom="{ selection !== 0 }">{ pair.label }</span>{/if} <i class="score" style="background-color: {color(pair.score)}" title="{ pair.score }" /></strong>
			<ul slot="content" class="options">
				{#each treffer as { label, score, id }, i}
				<li class="option" class:is-selected="{ selection === i }" on:click={() => selectCustomMatch(input, i)}><span>{ label }</span><i class="score" style="background-color: {color(score)}" title="{ score }" /></li>
				{/each}
			</ul>
			</Accordion>
			{/if}
		</li>
		{/each}
	</ul>
</div>

<style type="scss">
	.page-check {
		.inputs {
			list-style: none;
			padding: 0;
			margin: 0;

			.input {
				display: grid;
				grid-column-gap: var(--spacing-1);
  			grid-template-columns: 10px 2fr 4fr;
  			margin-bottom: var(--spacing-1);

  			.is-custom {
					background-color: yellow;
				}

				dt {
					grid-column-start: 3;
  				grid-column-end: span 3;
				}

				.current-selection {
					align-items: center;
				}

  			.options {
  				list-style: none;
					padding: 0;
					margin: 0;

					.option {
						display: flex;
						justify-content: space-between;
						align-items: center;

						&:not(.is-selected) {
							cursor: pointer;

							&:hover, &:focus {
								color: red;
							}
						}

		  			&.is-selected {
		  				font-weight: bold;

		  				&:not(:first-child) span {
		  					background-color: yellow;
		  				}
		  			}

		  			span {
		  				display: inline;
		  			}
					}
  			}
			}
		}
	}
</style>