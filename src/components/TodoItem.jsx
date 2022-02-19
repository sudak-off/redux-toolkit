import React from 'react'

export const TodoItem = ({ id, text, completed, toggleTodoCompleted, removeTodo }) => {
    return (
        <li key={id}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleTodoCompleted(id)}
            />
            <span>{text}</span>
            <span className="delete" onClick={() => removeTodo(id)}>
                &times;
            </span>
        </li>
    )
}
