import React from 'react'
import { useSelector } from 'react-redux'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
    const todos = useSelector(state => state.todos.todos)

    return (
        <ul>
            {todos.map((todo) => <TodoItem
                key={todo.id}
                {...todo} />
            )}
        </ul>
    )
}
