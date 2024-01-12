import React from 'react'
import ItemList from './ItemList';
//import { FaTrashAlt } from 'react-icons/fa';

function Content({ items, handleCheck, handleDelete}) {
  
  /* const [name, setName ] = useState('Bola');
  const [count, setCount] = useState(0); */
    
    /* const handleNameChanges = () => {
        const name = ['Ayo','Ade','Bola'];
        const int = Math.floor(Math.random()*3);
        setName(name[int]);
      }
    const handleClick = () => {
      console.log('You have click');
    }
    const handleClick2 = (name) => {
      console.log(name + ' you have click');
    }
    const handleClick3 = (e) => {
      console.log(e.target.innerText);
    } */
    
  return (

    <>
      {
        items.length ? (
              <ItemList items={items} handleCheck={handleCheck} handleDelete={handleDelete} />
        ):(
          <p style={{ marginTop: '2rem' }}> List is Empty</p>
        )
      }

      

      
        {/* <p onDoubleClick ={ handleClick }>
          Hello {name}!
        </p>
        <button onClick={ handleNameChanges }>Change the name </button>
        <button onClick={()=> handleClick2('kamal')}>Click it</button>
        <button onClick={(e)=> handleClick3(e)}>Click it</button> */}

    </>

    
  )
}

export default Content