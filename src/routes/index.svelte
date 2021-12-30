<script>
	import '../styles/app.scss';
	import Input from "../Input/Input.svelte";
	import Check from '../Check/Check.svelte';
	import Output from "../Output/Output.svelte";
</script>

<svelte:head>
	<title>Country guesser</title>
</svelte:head>

<header>
	<h1>Country guesser</h1><small class="beta">beta</small>
</header>
<main class="page-main">
	<Input />
	<Check />
	<Output />
</main>
