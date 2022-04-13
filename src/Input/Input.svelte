<script>
	import { INPUT_RAW, SPLIT_CHAR } from '$lib/../store.js';
  import { SPLIT_CHARS, INPUT_TEMPLATE } from '$lib/../config.js';
  /** Specify the textarea value */
  export let value = "";
  /** Specify the placeholder text */
  export let placeholder = "";
  /** Specify the number of cols */
  export let cols = 50;
  /** Specify the number of rows */
  export let rows = 30;
  /** Set to `true` to enable the light variant */
  export let light = false;
  /**  Set to `true` to disable the input */
  export let disabled = false;
  /** Specify the helper text */
  export let helperText = "";
  /** Specify the label text */
  export let labelText = "Input the country list";
  /** Set to `true` to visually hide the label text */
  export let hideLabel = false;
  /** Set to `true` to indicate an invalid state */
  export let invalid = false;
  /** Specify the text for the invalid state */
  export let invalidText = "";
  /** Set an id for the textarea element */
  export let id = "ccs-" + Math.random().toString(36);
  /**
   * Specify a name attribute for the input
   * @type {string}
   */
  export let name = undefined;
  /** Obtain a reference to the textarea HTML element */
  export let ref = null;
  // import WarningFilled16 from "../icons/WarningFilled16.svelte";
  $: errorId = `error-${id}`;

  function useSampleData () {
    INPUT_RAW.set(INPUT_TEMPLATE);
  }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  class:bx--form-item="{true}"
  class="page-input"
>
  <header>
    <label
      for="{id}"
      class:label="{true}"
      class:bx--label--disabled="{disabled}"
    >
      <h2 class="label">{labelText}</h2>
      <p>Paste a list of country names in the left panel. Next, check and adjust the possible matches and copy the output list.</p>
    </label>
    <label class="setting">
      Element seperator
      <select bind:value={$SPLIT_CHAR}>
        {#each SPLIT_CHARS as { value, label }}
          <option value={value}>
            { label }
          </option>
        {/each}
      </select>
    </label>
    <input type="button" value="Insert sample data" on:click={useSampleData}/>
  </header>
  <div
    class:bx--text-area__wrapper="{true}"
    data-invalid="{invalid || undefined}"
  >
    <textarea
      bind:this="{ref}"
      aria-invalid="{invalid || undefined}"
      aria-describedby="{invalid ? errorId : undefined}"
      disabled="{disabled}"
      id="{id}"
      name="{name}"
      cols="{cols}"
      rows="{rows}"
      bind:value={$INPUT_RAW}
      placeholder="{placeholder}"
      class:bx--text-area="{true}"
      class:bx--text-area--light="{light}"
      class:bx--text-area--invalid="{invalid}"
      {...$$restProps}
      readonly="{$$restProps.readonly === true ? true : undefined}"
      on:change
      on:keydown
      on:keyup
      on:focus
      on:blur></textarea>
  </div>
</div>

<style type="scss">
  header {
    display: grid;
    grid-template-columns: auto 1fr 2fr;
    grid-column-gap: var(--spacing-1);
    grid-row-gap: var(--spacing-1);

    .label, label {
      grid-column-end: span 3;
    }
  }

  textarea {
    padding: calc(var(--spacing-1) / 3);
    resize: none;
    background-color: var(--gray-1);
    border: 0;
    border: 1px solid var(--gray-2);
    transition: border-color var(--transition);
    width: 100%;
    position: sticky;
    top: var(--spacing-1);

    &:hover {
      border-color: var(--color-accent-4);
    }

    &:focus {
      border-color: var(--color-accent-7);
      outline: none;
    }
  }

  .bx--text-area__wrapper {
    width: 100%;
  }

</style>