<script>
	import '../styles/app.scss';
	import Input from "../Input/Input.svelte";
	import Check from '../Check/Check.svelte';
	import Output from "../Output/Output.svelte";
</script>

<header>
	<h1>Country guesser</h1><small class="beta">beta</small>
</header>
<main class="page-main">
	<Input />
	<Check />
	<Output />
</main>
