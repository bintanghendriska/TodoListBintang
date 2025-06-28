import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    nextId: 1,
  }),

  actions: {
    addTodo(text) {
      if (!text.trim()) return;
      this.todos.push({ id: this.nextId++, text, done: false });
    },

    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },

    toggleTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) todo.done = !todo.done;
    },
  },

  getters: {
    unfinishedCount: (state) => {
      return state.todos.filter(todo => !todo.done).length;
    },
  },
});
