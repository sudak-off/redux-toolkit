import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
	"todos/fetchTodos",
	async function () {
		const response = await fetch("https://jsonplaceholder.typicode.com/todos");
		const data = await response.json();
		return data;
	}
);

const todoSlice = createSlice({
	name: "todos",
	initialState: {
		todos: [],
		status: null,
		error: null,
	},
	reducers: {
		//...
		addTodo(state, action) {
			state.todos.push({
				id: new Date().toISOString(),
				text: action.payload.text,
				completed: false,
			});
		},

		toggleTodoCompleted(state, action) {
			const toggledTodo = state.todos.find(
				(todo) => todo.id === action.payload.id
			);
			toggledTodo.completed = !toggledTodo.completed;
		},

		removeTodo(state, action) {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
		},
	},
	extraReducers: {
		// pending - когда идет загрузка
		[fetchTodos.pending]: (state) => {
			state.status = "loading";
			state.error = null;
		},
		// когда успешно получены данные
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = "resolved";
			state.todos = action.payload;
		},
		// неполадка, обработка ошибки
		[fetchTodos.rejected]: (state, action) => {},
	},
});

export const { addTodo, toggleTodoCompleted, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
