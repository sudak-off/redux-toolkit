import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, toggleStatus } from '../store/todoSlice'

export const TodoItem = ({ id, text, title, completed }) => {
    const dispatch = useDispatch()

    return (
        <li key={id}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => dispatch(toggleStatus(id))}
            />
            <span>{title}</span>
            <span>{text}</span>
            <span className="delete" onClick={() => dispatch(deleteTodo(id))}>
                &times;
            </span>
        </li>
    )
}
