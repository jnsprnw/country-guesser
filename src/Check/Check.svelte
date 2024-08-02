<script>
	import Accordion from './Accordion.svelte';
	import { OPTIONS, CUSTOM } from '$lib/store.js';
	import countBy from 'lodash/countBy.js';
	import chroma from 'chroma-js';
	import { KEY_LABEL, KEY_OFFICIAL, KEY_SCORE } from '$lib/config.js';

	const color = chroma.scale(['#f7f4f9', '#ce1256']).mode('lab').domain([200, 30]);

	function selectCustomMatch (input, id) {
		CUSTOM.update((d) => {
			d[input] = id;
			return d;
		})
	}

	$: ({ SUCCESS, WARNING, ERROR } = countBy($OPTIONS, ([, , status]) => status));
</script>

<div class="page-check">
	<header>
		<h2 class="label">Check for ambiguity</h2>
		<div class="legend">
			<dl>
				<dt>✅</dt>
				<dd class="dd-title">Successfully match</dd>
				<dd class="dd-title"><small>{ SUCCESS || 0 }</small></dd>
				<dd class="dd-info">At least one matching country was found with a high confidence.</dd>
				<dt>⚠️</dt>
				<dd class="dd-title">Ambiguous result</dd>
				<dd class="dd-title"><small>{ WARNING || 0 }</small></dd>
				<dd class="dd-info">Either one match with a low confidence was found or the top matches have a very similar confidence score rendering them both as plausible matches.</dd>
				<dt>🚫</dt>
				<dd class="dd-title">No suitable match</dd>
				<dd class="dd-title"><small>{ ERROR || 0 }</small></dd>
				<dd class="dd-info">No plausible match could be found for the specific input.</dd>
			</dl>
		</div>
	</header>
	{#if $OPTIONS.length}
	<ul class="inputs">
		{#each $OPTIONS as [input, treffer, status, selection, pair]}
		<Accordion isDisabled={treffer.length < 2} hasMatches={treffer && treffer.length}>
			<i slot="status">{#if status === 'WARNING'}⚠️{:else if status === 'ERROR'}🚫{:else}✅{/if}</i>
			<strong slot="input">{input}</strong>
			<strong class="current-selection" slot="current">{#if pair }<span class:is-custom="{ selection !== 0 }" title={pair[KEY_OFFICIAL]}>{ pair[KEY_LABEL] }</span>{/if} <i class="score" style="background-color: {color(pair[KEY_SCORE])}" title="Confidence score: { Math.round(pair[KEY_SCORE]) }" /></strong>
			<ul slot="content" class="options">
				{#each treffer as item, i}
				<li class="option" class:is-selected="{ selection === i }" on:click={() => selectCustomMatch(input, i)} title={item[KEY_OFFICIAL]}><span>{ item[KEY_LABEL] }</span><i class="score" style="background-color: {color(item[KEY_SCORE])}" title="Confidence score: { Math.round(item[KEY_SCORE]) }" /></li>
				{/each}
			</ul>
		</Accordion>
		{/each}
	</ul>
	{:else}
	<span>👈 Paste a list of countries on the left hand side.</span>
	{/if}
</div>

<style lang="scss">
	@import "../styles/mixin";
	@import "../styles/variables";

	.page-check {
		header {
			dl {
				display: grid;
				grid-template-columns: auto 2fr 1fr;
				grid-column-gap: var(--spacing-1);

				@include media-query($wide) {
			    grid-template-columns: auto 1fr 2fr;
			  }

				.dd-info {
					grid-column-start: 2;
					grid-column-end: span 2;
					margin-top: calc(var(--spacing-1) / 4);
					margin-bottom: calc(var(--spacing-1));

					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}

		.inputs {
			list-style: none;
			padding: 0;
			margin: 0;

			.input {
				display: grid;
				grid-column-gap: var(--spacing-1);
  			grid-template-columns: 10px 2fr 4fr;
  			margin-bottom: var(--spacing-1);

  			strong {
  				white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
  			}

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
					display: grid;
					grid-template-columns: subgrid;
					grid-column: 2 / 3;

					.option {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: calc(var(--spacing-1) / 2);

						/*&:first-child {
							margin-top: 0;
						}*/

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
