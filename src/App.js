import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import About from './components/pages/About';
import {v4 as uuid} from "uuid";
import './App.css';
import axios from 'axios';

class App extends Component {

state = {
  Todos: [

  ]
}

componentDidMount() {
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3')
    .then(res => this.setState({ Todos: res.data }))
}

// toggle completed. true or false
markComplete = (id) => {
  this.setState({ todos: this.state.Todos.map(todo => {
    if(todo.id === id) {
      todo.completed = !todo.completed
    }
    return todo;
  }) });
}

//delete todo
delTodo = (id) => {
  this.setState({ Todos: [...this.state.Todos.filter(todo => todo.id !== id)] });
}

// add a todo //
addTodo = (title) => {
  const newTodo = {
    id: uuid(),
    title: title,
    completed: false
  }
  this.setState({ Todos: [...this.state.Todos, newTodo] })
}

  render() {
    return(
      <Router>
        <div className="App">
          <div className="container">
            <Header/>
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.Todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path='/about' component={About}/>


          </div>
        </div>
      </Router>
    );
  }
}

export default App;
