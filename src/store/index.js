import Vuex, { Store } from "vuex";
import Vue from "vue";

const saveStateLocal = (store) => {
  store.subscribe((mutation, state) => {
    const stateString = JSON.stringify(state);
    window.localStorage.setItem("app-state", stateString);
  });
};

Vue.use(Vuex);

export default new Store({
  state: {
    cardData: [
      [
        {
          id: 0,
          type: "todo",
          title: "List",
          body: [
            { id: 0, text: "This is a todo", done: true },
            { id: 1, text: "This is another todo", done: false },
          ],
        },
      ],
      [],
      [],
    ],
    counters: [1, 8],
    columns: [{ title: "To Do" }, { title: "In progress" }, { title: "Done" }],
    theme: "Dark",
    searchEngine: {
      name: "DuckDuckGo",
      url: "https://duckduckgo.com/?q=",
      icon: "https://duckduckgo.com/favicon.ico",
    },
    favSites: [{ key: 0, url: "https://medium.com" }],
  },
  mutations: {
    //Overwrite app state
    initialiseStore(state, savedState) {
      console.log("Restoring saved state");
      this.replaceState(Object.assign(state, savedState));
      state = savedState;
    },
    // Set theme
    setTheme(state, theme) {
      state.theme = theme;
    },
    // Columns
    increaseCols(state) {
      if (state.columns.length < 5) state.columns.push({ title: "New List" });
      if (state.cardData.length < 5) state.cardData.push([]);
    },
    decreaseCols(state) {
      if (state.columns.length > 2) {
        state.columns.pop();
        state.cardData.pop();
      }
    },
    updateColumnTitle(state, { id, title }) {
      const columns = [...state.columns];
      columns[id].title = title;
      state.columns = columns;
    },
    // All cards
    updateTitle(state, { id, title }) {
      for (let i = 0; i < state.cardData.length; i++) {
        const cards = state.cardData[i];
        let cardIndex = cards.findIndex((card) => card.id == id);
        if (cardIndex != -1) {
          state.cardData[i][cardIndex].title = title;
          break;
        }
      }
    },
    addTodoCard(state, idx) {
      state.cardData[idx].unshift({
        id: state.counters[0]++,
        type: "todo",
        title: `List ${state.counters[0]}`,
        body: [],
      });
    },
    reorderCards(state, { list, col }) {
      let newData = state.cardData;
      newData[col] = list;
      state.cardData = newData;
    },
    deleteCard(state, { id }) {
      for (let i = 0; i < state.cardData.length; i++) {
        const cards = state.cardData[i];
        let cardIndex = cards.findIndex((card) => card.id == id);
        if (cardIndex != -1) {
          let newCardList = cards.filter((card) => card.id != id);
          Vue.set(state.cardData, i, newCardList);
          break;
        }
      }
    },
    // Todos
    updateTodo(state, { id, todoId, todo }) {
      for (let i = 0; i < state.cardData.length; i++) {
        const cards = state.cardData[i];
        let cardIndex = cards.findIndex((card) => card.id == id);
        if (cardIndex != -1) {
          const todoList = state.cardData[i][cardIndex].body;
          let todoIndex = todoList.findIndex((todo) => todo.id == todoId);
          if (todoIndex != -1) {
            state.cardData[i][cardIndex].body[todoIndex].text = todo;
            break;
          }
        }
      }
    },
    markTodo(state, { id, todoId }) {
      for (let i = 0; i < state.cardData.length; i++) {
        const cards = state.cardData[i];
        let cardIndex = cards.findIndex((card) => card.id == id);
        if (cardIndex != -1) {
          const todoList = state.cardData[i][cardIndex].body;
          let todoIndex = todoList.findIndex((todo) => todo.id == todoId);
          if (todoIndex != -1) {
            let done = state.cardData[i][cardIndex].body[todoIndex].done;
            state.cardData[i][cardIndex].body[todoIndex].done = !done;
            break;
          }
        }
      }
    },
    removeTodo(state, { id, todoId }) {
      for (let i = 0; i < state.cardData.length; i++) {
        const cards = state.cardData[i];
        let cardIndex = cards.findIndex((card) => card.id == id);
        if (cardIndex != -1) {
          const todoList = state.cardData[i][cardIndex].body;
          let newList = todoList.filter((todo) => todo.id != todoId);
          state.cardData[i][cardIndex].body = newList;
          break;
        }
      }
    },
    addTodo(state, { id }) {
      for (let i = 0; i < state.cardData.length; i++) {
        const cards = state.cardData[i];
        let cardIndex = cards.findIndex((card) => card.id == id);
        if (cardIndex != -1) {
          state.cardData[i][cardIndex].body.push({
            id: state.counters[1]++,
            text: " ",
            done: false,
          });
          break;
        }
      }
    },
    reorderTodo(state, { id, todoList }) {
      for (let i = 0; i < state.cardData.length; i++) {
        const cards = state.cardData[i];
        let cardIndex = cards.findIndex((card) => card.id == id);
        if (cardIndex != -1) {
          state.cardData[i][cardIndex].body = todoList;
          break;
        }
      }
    },
  },
  plugins: [saveStateLocal],
});
