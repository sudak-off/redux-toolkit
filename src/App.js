import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./store/todoSlice";
import "./App.css";
import { InputField } from "./components/InputField";
import { TodoList } from "./components/TodoList";

function App() {
	const [text, setText] = useState("");

	const dispatch = useDispatch();

	const AddTask = () => {
		dispatch(addTodo({ text }));
		setText("");
	};

	const toggleTodoCompleted = (todoId) => {
		// setTodos(
		// 	todos.map((todo) => {
		// 		if (todo.id !== todoId) {
		// 			return todo;
		// 		}
		// 		return {
		// 			...todo,
		// 			completed: !todo.completed,
		// 		};
		// 	})
		// );
	};

	return (
		<div className="App">
			<InputField text={text} handleInput={setText} handleSubmit={AddTask} />

			<TodoList />
		</div>
	);
}

export default App;
