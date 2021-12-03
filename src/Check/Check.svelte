<script>
	import { OPTIONS, CUSTOM } from '$lib/../store.js';
	import round from 'lodash/round';

	function selectCustomMatch (input, id) {
		CUSTOM.update((d) => {
			d[input] = id;
			return d;
		})
	}
</script>

<div>
<ul>
	{#each $OPTIONS as [input, treffer, status]}
	<li>
		<i>{#if status === 'WARNING'}⚠️{:else if status === 'ERROR'}🚫{:else}✅{/if}</i>
		<strong>{input}</strong>
		{#if treffer && treffer.length}
		<ul>
			{#each treffer as { label, score, id }}
			<li on:click={() => selectCustomMatch(input, id)}>{ label } ({ round(score) })</li>
			{/each}
		</ul>
		{/if}
	</li>
	{/each}
</ul>
</div>