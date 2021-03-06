<template>
  <nav
    class="navbar flex fixed w-full items-center justify-between px-3 md:px-6 h-16 z-10"
  >
    <div class="flex items-center">
      <button class="mr-2" aria-label="Open Menu" @click="drawer">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-6 h-6"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <span class="text-2xl font-bold inline">Tasky</span>

    <div class="flex-grow-1"></div>
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        @keydown.esc="isOpen = false"
        v-show="isOpen"
        class="z-10 fixed inset-0 transition-opacity"
      >
        <div
          @click="isOpen = false"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>
    <aside
      class="drawer flex flex-col transform top-0 left-0 w-64 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <span
        @click="isOpen = false"
        class="drawer-header flex w-full items-center p-4 h-16"
      >
        <h2 class="text-2xl">Tasky</h2>
      </span>
      <span class="drawer-item flex items-center justify-between p-4">
        <span>Theme</span>
        <dropdown
          @input="changeTheme"
          :selected="selectedTheme"
          :options="themes"
          class="ml-2"
        />
      </span>

      <div class="hidden md:flex items-center justify-around my-3">
        <button class="column-btn ripple" @click="dec">-</button>
        <span class="font-bold"
          >Columns: {{ this.$store.state.columns.length }}</span
        >
        <button class="column-btn ripple" @click="inc">+</button>
      </div>
    </aside>
  </nav>
</template>

<script>
import dropdown from "@/components/Dropdown";
import { setTheme } from "../services/themer";

export default {
  name: "navbar",
  components: {
    dropdown,
  },
  data() {
    return {
      isOpen: false,
      themes: ["Light", "Dark"],
    };
  },
  computed: {
    selectedTheme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
    inc() {
      this.$store.commit("increaseCols");
    },
    dec() {
      this.$store.commit("decreaseCols");
    },
    changeTheme(theme) {
      this.$store.commit("setTheme", theme);
      setTheme(theme);
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  beforeCreate() {
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });

    setTheme(this.selectedTheme);
  },
};
</script>

<style>
.navbar {
  background-color: var(--header-bg-color);
  color: var(--text-strong);
  border-bottom: 2px solid var(--secondary);
  border-right: 2px solid var(--secondary);
  border-bottom-right-radius: 12px;
}
.add-todo-card-fab {
  @apply absolute;
  bottom: -90vh;
  right: 2%;
}
.drawer {
  background-color: var(--header-bg-color);
}
.drawer-header {
  @apply border-b-2;
  border-color: var(--secondary);
}
.drawer-item:hover {
  background-color: var(--secondary);
  color: white;
}
.column-btn {
  @apply py-2;
  @apply w-10;
  @apply mx-2;
  @apply rounded-full;
  background-color: var(--primary);
}
.column-btn:hover {
  background-color: var(--primary-light);
}
.column-btn:focus {
  outline: none;
  background-color: var(--primary-light);
}
.add-widget {
  transition: all 400ms;
  position: absolute;
  right: 2rem;
  top: calc(calc(var(--vh, 1vh) * 99) - 5rem);
}
</style>
