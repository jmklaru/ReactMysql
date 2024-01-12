import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react'

function AddItem({ newItem, setNewItem, handleSubmit }) {
    const inputRef = useRef();

  return (
        <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor="AddItem">Add Item</label>
            <input 
                type="text"
                autoFocus
                ref={inputRef}
                required
                placeholder='Add Item' 
                id='addItem'
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                
            />

            <button 
                type='submit'
                aria-label='Add Item'
                onClick={() => inputRef.current.focus()}
        
            >
                <FaPlus />
            </button>
        </form>
  )
}

export default AddItem