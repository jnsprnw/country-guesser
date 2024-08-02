<script>
	import { COUNTRIES } from '$lib/store.js';

	$: countries = $COUNTRIES.length;
</script>

<p>{ countries }</p>
