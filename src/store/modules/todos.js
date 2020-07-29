import axios from "axios";
import gql from "./gql";

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const actions = {

  fetchTodos({ commit }) {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    gql(`query allTodos {
            todos{
              id
              title
              completed
              userId
            }
          }`).then(resp => commit("setTodos", resp.data.data.todos));

  },

  addTodo({ commit }) {
    // const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {title, complited: false});  
    gql(`mutation addTodo($userId :Int!, $title: String!, $complited: Boolean!){
            action: insert_todos(objects: {userId: $userId, title: $title, completed: $complited }){
              returning{
                id
                title
                completed
                userId
              }
            }
          }`).then(resp => commit("newTodo", resp.data)); // does not print title

    // commit('newTodo', response.data);
  },

  deleteTodo({ commit }, id) {
    // await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    gql(`mutation deleteTodo($id:Int!){
            delete_todos(where: {id : {_eq: $id}}){
              affected_rows
            }
          }`).then(commit('removeTodo', id));



    // commit('removeTodo', id);
  },

  filterTodos({ commit }, e) {
    // Get selected number
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
    // limit = 5 or 10 or 20...
    // const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

    gql(`query filterTodos($limit: Int!){
            todos(limit: ${limit}){
              id
              title
              completed
              userId
            }
          }
          `).then(resp => commit('setTodos', resp.data));
    // problem so limit kako da go zeme?
    // commit('setTodos', response.data);

  },

  async updateTodo({ commit }, updTodo) {

    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);

    commit('updateTodo', response.data);

  }

};

const mutations = {

  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);

    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};