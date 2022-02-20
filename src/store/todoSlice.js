import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
	name: "todos",
	initialState: {
		todos: [],
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
		toggleTodoCompleted(state, action) {},
		removeTodo(state, action) {},
	},
});

export const { addTodo, toggleTodoCompleted, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;