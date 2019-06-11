import React from 'react';
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Container, Header, } from "semantic-ui-react";

class App extends React.Component {
  state = { todos: [], };

  componentDidMount() {
    axios.get("/api/items")
      .then( res => {
        this.setState({ todos: res.data, });
      })
      .catch( err => {
        console.log(err);
      })
  };

  addItem = (name) => {
    axios.post("/api/items", { name, })
      .then( res => {
        this.setState({ todos: [...this.state.todos, res.data], });
      })
  };

  updateTodo = (id) => {
    axios.put(`/api/items/${id}`)
      .then( res => {
        const todos = this.state.todos.map( t => {
          if (t.id === id)
            return res.data;
          return t;
        });
        this.setState({ todos, });
      })
  };

  deleteTodo = (id) => {
    axios.delete(`/api/items/${id}`)
      .then( res => {
        const { todos, } = this.state;
        this.setState({ todos: todos.filter( t => t.id !== id ), })
      })
  };

  render() {
    return (
      <Container style={{ padding: "30px 0", }}>
        <Header as="h1">Menu List</Header>
        <br />
        <TodoForm addItem={this.addItem} />
        <br />
        <br />
        <TodoList 
          todos={this.state.todos}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
        />
      </Container>
    );
  };
};

export default App;