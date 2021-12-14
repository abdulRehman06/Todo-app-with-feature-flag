import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TotalCompleteItems from './components/TotalCompleteItems';
import {  withLDProvider  } from "launchdarkly-react-client-sdk";

const App = () => {
	return (
		<div className='container bg-white p-4 mt-5'>
			<h1>My Todo List</h1>
			<AddTodoForm />
			<TodoList />
			<TotalCompleteItems />
		</div>
	);
};

export default withLDProvider({
	clientSideID: "61b753a685766c0ca6b9d195", // test 
	// clientSideID: "61b753a685766c0ca6b9d196", // prod 
    user: {
      key: "aa0ceb",
      name: "Grace Hopper",
      email: "arkaimkhani06@gmail.com",
    },
  })(App);
