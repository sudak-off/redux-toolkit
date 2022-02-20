import React from 'react'
import { useDispatch } from 'react-redux'
import { removeTodo, toggleTodoCompleted } from '../store/todoSlice'

export const TodoItem = ({ id, text, title, completed }) => {
    const dispatch = useDispatch()

    return (
        <li key={id}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => dispatch(toggleTodoCompleted({ id }))}
            />
            <span>{title}</span>
            <span>{text}</span>
            <span className="delete" onClick={() => dispatch(removeTodo({ id }))}>
                &times;
            </span>
        </li>
    )
}
