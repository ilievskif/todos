<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box"></span> = Incomplete
      </span>
      <span>
        <span class="complete-box"></span> = Complete
      </span>
    </div>
    <div class="todos">
      <div
        @dblclick="onDblClick(todo)"
        v-for="todo in allTodos"
        :key="todo.id"
        class="todo"
        v-bind:class="{'is-complete':todo.completed}"
      >
        {{todo.title}}
        <div class="icon-group">
          <i
            @click="handleSelectItem(todo)"
            v-on:click="isHidden = !isHidden"
            class="fas fa-edit"
            title="Edit this Todo"
          ></i>

          <i @click="deleteTodo(todo.id)" class="fas fa-trash-alt" title="Delete this Todo"></i>
        </div>
      </div>
    </div>
    <!--  -->
    <div v-for="todo in allTodos" :key="todo.id">
      <div v-if="!isHidden && todo.id === selectedTodo.id">
        <h3>Edit Todo with id: {{ todo.id }} and title: {{ todo.title }}</h3>
        <div class="edit">
          <form>
            <input type="text" v-model="todo.title" placeholder="Insert New Title ..." />
            <input
              type="submit"
              value="Change Title"
              v-on:click="isHidden = !isHidden"
              @click="onSubmit(todo)"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todos",
  data() {
    return {
      isHidden: true,
      outputTitle: "",
    };
  },
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo", "editTodo"]),

    handleSelectItem(todo) {
      this.selectedTodo = todo;
      //console.log(this.selectedTodo.id);
    },

    onSubmit(todo) {
      const edTodo = {
        id: todo.id,
        title: todo.title,
      };

      this.editTodo(edTodo);
    },

    onDblClick(todo) {
      const updTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
      };

      this.updateTodo(updTodo);
    },
  },
  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  },

  showEvent({ nativeEvent, event }) {
    const open = () => {
      this.selectedEvent = event;
      this.selectedElement = nativeEvent.target;
      setTimeout(() => (this.selectedOpen = true), 10);
    };

    if (this.selectedOpen) {
      this.selectedOpen = false;
      setTimeout(open, 10);
    } else {
      open();
    }

    nativeEvent.stopPropagation();
  },
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.icon-group {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}

.fas,
.fa-trash-alt,
.fa-edit {
  padding-right: 5px;
  padding-bottom: 10px;
}

.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}

form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}
input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px solid #41b883;
  cursor: pointer;
}
</style>>

