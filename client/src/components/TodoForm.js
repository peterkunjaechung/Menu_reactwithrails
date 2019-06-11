import React from 'react';
import { Form, } from "semantic-ui-react";

class TodoForm extends React.Component {
  state = { name: "", };

  handleChange = (e) => {
    this.setState({ name: e.target.value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.name);
    this.setState({ name: "", });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Menu"
          placeholder="Menu Item"
          required
          value={this.state.name}
          onChange={this.handleChange}
        />
      </Form>
    )
  }
}

export default TodoForm;
