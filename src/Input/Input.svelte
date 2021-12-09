<script>
	import { INPUT_RAW } from '$lib/../store.js';
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
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  class:bx--form-item="{true}"
>
  <label
    for="{id}"
    class:label="{true}"
    class:bx--label--disabled="{disabled}"
  >
    {labelText}
  </label>
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
  textarea {
    padding: calc(var(--spacing-1) / 3);
    resize: none;
    background-color: var(--gray-1);
    border: 0;
    border: 1px solid var(--gray-2);
    transition: border-color var(--transition);
    width: 100%;

    &:focus {
      border-color: var(--color-interactive);
      outline: none;
    }
  }

  .bx--text-area__wrapper {
    width: 100%;
  }

</style>