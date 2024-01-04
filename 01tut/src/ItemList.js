import React from 'react';
import LineList from './LineList';


function ItemList({ items, handleCheck, handleDelete}) {
  return (
            <ul>
            {
                items.map((item)=>(
                    <LineList key={item.id} item={item} handleCheck={handleCheck} handleDelete={handleDelete} />
            ))
            }
        </ul>
  )
}

export default ItemList