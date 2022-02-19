import React from 'react'
import { TodoItem } from './TodoItem'

export const TodoList = ({ todos, removeTodo, toggleTodoCompleted }) => {
    return (
        <ul>
            {todos.map((todo) => <TodoItem
                toggleTodoCompleted={toggleTodoCompleted}
                removeTodo={removeTodo}
                key={todo.id}
                {...todo} />
            )}
        </ul>
    )
}
