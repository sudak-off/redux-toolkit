import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
	"todos/fetchTodos",
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/todos?_limit=10"
			);

			if (!response.ok) {
				throw new Error("Server Error!");
			}

			const data = await response.json();

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteTodo = createAsyncThunk(
	"todos/deleteTodo",
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error("Can't delete task. Server error.");
			}

			dispatch(removeTodo({ id }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const toggleStatus = createAsyncThunk(
	"todos/toggleStatus",
	async function (id, { rejectWithValue, dispatch, getState }) {
		const todo = getState().todos.todos.find((todo) => todo.id === id);

		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`,
				{
					method: "PATCH",
					header: { "Content-Type": "application/json" },
					body: JSON.stringify({ completed: !todo.completed }),
				}
			);

			if (!response.ok) {
				throw new Error("Can't toggle status. Server error.");
			}

			// const data = await response.json();
			// console.log(data);

			dispatch(toggleTodoCompleted({ id }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const setError = (state, action) => {
	state.status = "rejected";
	state.error = action.payload;
};

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
		[fetchTodos.rejected]: setError,
		[deleteTodo.rejected]: setError,
		[toggleStatus.rejected]: setError,
	},
});

export const { addTodo, toggleTodoCompleted, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
