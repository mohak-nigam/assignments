/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todos = [];
  }

  add(todo) {
    this.todos = [...this.todos, todo];
  }

  remove(indexOfTodo) {
    this.todos = this.todos.filter((item, index) => index !== indexOfTodo);
  }

  update(index, updatedTodo) {
    this.todos = this.todos.map((item, idx) => {
      if (index === idx) {
        item = updatedTodo;
      }
      return item;
    });
  }

  getAll() {
    return this.todos;
  }

  get(indexOfTodo) {
    const filteredList = this.todos.filter((item, idx) => indexOfTodo === idx);
    return filteredList.length ? filteredList[0] : null;
  }

  clear() {
    this.todos = [];
  }
}

module.exports = Todo;
