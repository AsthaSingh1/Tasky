<template>
  <div class="card-column expanded flex-1 m-1">
    <div class="flex justify-between mt-4 content-center">
      <p
        @keydown.enter="focusOut"
        @dblclick="makeEditable"
        @blur="updateTitle"
        spellcheck="false"
        class="column-title font-bold rounded-sm px-6 appearance-none"
      >
        {{ title }}
      </p>
      <button class="pr-4" @click="addTodoCard">
        <svg
          class="add-todo-btn select-none cursor-pointer"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            fill="var(--secondary)"
            d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
          />
        </svg>
      </button>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "column",
  props: {
    title: String,
    id: Number,
  },
  methods: {
    focusOut(e) {
      e.target.blur();
    },
    updateTitle(e) {
      this.removeEditable(e);
      this.$store.commit("updateColumnTitle", {
        id: this.id,
        title: e.target.innerText,
      });
    },
    makeEditable(e) {
      e.target.contentEditable = true;
      e.target.focus();
    },
    removeEditable(e) {
      e.target.contentEditable = false;
    },
    addTodoCard() {
      this.$store.commit("addTodoCard", this.id);
    },
  },
};
</script>

<style>
@screen md {
  .expanded {
    min-height: calc(100vh - 8rem);
  }
}
.column-title {
  font-size: 1.15rem;
  color: var(--text-strong);
  transition: all 200ms ease-out;
  text-decoration: none;
}
.column-title:focus {
  outline: none;
  background-color: var(--primary);
}
</style>
