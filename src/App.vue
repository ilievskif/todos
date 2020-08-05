<template>
  <div id="app">
    <div class="container">
      <div class="icon-group">
        <i
          class="fas fa-plus-square fa-lg"
          title="Add new Todo"
          v-on:click="isHiddenAddTodo = !isHiddenAddTodo"
        ></i>
        <i
          class="fas fa-sort-amount-up fa-lg"
          title="Filter Todos"
          v-on:click="isHiddenFilterTodo = !isHiddenFilterTodo"
        ></i>
      </div>
      <div v-if="!isHiddenAddTodo">
        <AddTodo />
      </div>
      <div v-if="!isHiddenFilterTodo">
        <FilterTodos />
      </div>
      <Todos />
    </div>
  </div>
</template>

<script>
import Todos from "./components/Todos.vue";
import AddTodo from "./components/AddTodo.vue";
import FilterTodos from "./components/FilterTodos.vue";

export default {
  name: "App",
  data() {
    return {
      isHiddenAddTodo: true,
      isHiddenFilterTodo: true,
    };
  },
  components: {
    Todos,
    AddTodo,
    FilterTodos,
  },
};
</script>

<style>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}

.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}

.icon-group {
  /* position: absolute; */

  bottom: 10px;
  right: 10px;
  color: #41b883;
  cursor: pointer;
}

.fas {
  padding-right: 10px;
  padding-bottom: 10px;
}

.i.title:hover {
  color: #41b883;
}
</style>
