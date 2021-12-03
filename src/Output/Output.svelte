<script>
	import { PAIRS } from '$lib/../store.js';
	import isUndefined from 'lodash/isUndefined';

	// $: countries = $INPUT.length;
</script>

<div>
<ul>
	{#each $PAIRS as match}
	<li><strong>{isUndefined(match) ? '🚫' : match}</strong></li>
	{/each}
</ul>
</div>