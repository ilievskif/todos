// import axios from "axios";
import gql from "./gql";

const state = {
  todos: []
};

const getters = {
  allTodos: (state) => state.todos
};

const actions = {

  fetchTodos({ commit }) {
    gql(`query allTodos {
            todos{
              id
              title
              completed
              userId
            }
          }`).then(resp => commit("setTodos", resp.data.data.todos));

  },

  addTodo({ commit }, title) {
    gql(
      `mutation addTodo($userId :String!, $title: String!){
            action: insert_todos(objects: {userId: $userId, title: $title, completed: false }){
              returning{
                id
                title
                completed
                userId
              }
            }
          }`,
      {
        userId: "1",
        title: title,
      }
    ).then((resp) => commit("newTodo", resp.data.data.action.returning[0]));
  },

  deleteTodo({ commit }, id) {
    // await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    gql(`mutation deleteTodo($id:Int!){
            delete_todos(where: {id : {_eq: $id}}){
              affected_rows
            }
          }`,
      {
        id: id,
      }).then(commit('removeTodo', id));
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

  updateTodo({ commit }, updTodo) {

    // const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);
    gql(`mutation updateTodo($id: Int!, $completed: Boolean!) {
      update_todos_by_pk(pk_columns: {id: $id}, _set: {completed: $completed}) {
        id
        title
        completed
        userId
      }
    }`,
      {
        id: updTodo.id,
        completed: updTodo.completed
      }).then(resp => commit('updateTodo', resp.data.data.update_todos_by_pk));
    // console.log(response.data);
    // commit('updateTodo', response.data);

  },

  // Edit TODO
  editTodo({ commit }, edTodo) {
    gql(`mutation editTodo($id: Int!, $title: String!) {
      update_todos_by_pk(pk_columns: {id: $id}, _set: {title: $title}){
        id
        title
        completed
        userId
      }
    }`,
      {
        id: edTodo.id,
        title: edTodo.title
      }).then(resp => commit('editTodo', resp.data.data.update_todos_by_pk));

    // commit('removeTodo', edTodo.id);
    location.reload();

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
  },
  editTodo(state, edTodo) {
    const index = state.todos.findIndex(todo => todo.id === edTodo.id);

    if (index !== -1) {
      state.todos.push(index, 1, edTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};