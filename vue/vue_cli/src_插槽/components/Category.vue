<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  myName: "Category",
  data() {
    return {
      age: 18,
    }
  },
};
</script>

<style>
</style>