<template>
  <main class="container">
    <div class="todo-box">
      <h1 class="title">To Do List</h1>

      <form @submit.prevent="addTodoAndClear" class="form">
        <input v-model="newTodo" type="text" placeholder="Tambah tugas..." class="input">
        <button type="submit" class="button">Tambah</button>
      </form>

      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <div class="todo-content">
            <input type="checkbox" :checked="todo.done" @change="toggleTodo(todo.id)">
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
          </div>
          <button @click="deleteTodo(todo.id)" class="delete-button">Hapus</button>
        </li>
      </ul>

      <p class="count">Tugas belum selesai: <strong>{{ unfinishedCount }}</strong></p>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/todo';
import { storeToRefs } from 'pinia';

const store = useTodoStore();
const { todos, unfinishedCount } = storeToRefs(store);
const { addTodo, deleteTodo, toggleTodo } = store;

const newTodo = ref('');

function addTodoAndClear() {
  addTodo(newTodo.value);
  newTodo.value = '';
}
</script>

<style>
body {
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  background-color: #f7f9fc;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.todo-box {
  background-color: #fff;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 550px;
  border: 1px solid #e0e0e0;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.25rem;
  font-weight: 600;
  background: linear-gradient(45deg, #4285F4, #9B59B6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  font-size: 1rem;
  background-color: #f1f3f4;
  transition: all 0.2s ease-in-out;
}

.input:focus {
  outline: none;
  border-color: #4285F4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.2);
}

.button {
  background: linear-gradient(45deg, #1A73E8, #8E44AD);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 24px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
}

.button:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f2f5;
  padding: 1rem 0.5rem;
  transition: background-color 0.2s ease;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item:hover {
  background-color: #f7f9fc;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.done {
  text-decoration: line-through;
  color: #909090;
}

.delete-button {
  background: none;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.delete-button:hover {
  color: #ef4444;
  background-color: #fee2e2;
}

.count {
  font-size: 0.9rem;
  color: #5f6368;
  text-align: center;
  margin-top: 2rem;
}
</style>
