import React from 'react'

export const InputField = ({ text, handleSubmit, handleInput }) => {
    return (
        <label>
            <input value={text} onChange={(e) => handleInput(e.target.value)} />
            <button onClick={handleSubmit}>add todo</button>
        </label>
    )
}
