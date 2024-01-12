import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';


function App() {
  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState([]
    /* JSON.parse(localStorage.getItem('shoppingList')) || [] */
    /* [
    {
      id: 1,
      checked: false,
      item: "One of half pound bag of Cocoa Covered Almonds Unsalted"
    },
    {
      id: 2,
      checked: false,
      item: "Item 2"
    },
    {
      id: 3,
      checked: false,
      item: "Item 3"
    },
    {
      id: 4,
      checked: true,
      item: "Item 4"
    }
  
  ] */
  );
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  /* useEffect(()=>{
    //setItems();
    //console.log('updating items');
    localStorage.setItem("shoppingList", JSON.stringify(items));
  },[items]) */

  useEffect(()=>{
    const fetchItem = async () => {
      try {
          const response = await fetch(API_URL);
          if(!response.ok) throw Error("Did not receive expected data")
          const listItems = await response.json();
          //console.log(listItems);
          setItems(listItems);
          setFetchError(null);
      } catch (err) {
        //console.log(err.message)
        setFetchError(err.message);
      } finally{
        setIsLoading(false);
      }
    }

    setTimeout(
      () => {
        (async () => await fetchItem())();
      }, 2000
    )

    

  },[])


  /* const setNewItemValue = (newValue) => {
    setItems(newValue);
    localStorage.setItem("shoppingList", JSON.stringify(newValue));
  } */
  const addItem = (item) => {
    const id = items.length ? items[items.length -1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    //setNewItemValue(listItems);
    setItems(listItems);


  }
  const handleCheck = (id) => { 
    //console.log(`Key: ${id}`);
    const listItems = items.map((item) => (item.id === id ? {...item, checked: !item.checked}:item));
   // setItems(listItems);
    //localStorage.setItem("shoppingList", JSON.stringify(listItems));
  // setNewItemValue(listItems);   
      setItems(listItems);
  }
  
  const handleDelete = (id) => {
    //console.log(id);
    const listItems = items.filter((item) => item.id !==id );
    //setItems(listItems);
    //localStorage.setItem("shoppingList", JSON.stringify(listItems));
    //setNewItemValue(listItems);
    setItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    // AddItem
    addItem(newItem);
    setNewItem('');
    //console.log(newItem);
  }

  return (
    <div className="App">
        <Header title="Grocery List"/>
        <AddItem  
          newItem = {newItem}
          setNewItem = {setNewItem}
          handleSubmit = {handleSubmit}
        />
        <SearchItem 
        search = {search}
        setSearch = {setSearch}
        />
        <main>
          {
            isLoading && <p>Loading items...</p>
          }

          {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}

          { !fetchError && !isLoading &&
              <Content 
                items={
                  items.filter(
                    item => ((item.item).toLowerCase()).includes(search.toLowerCase())
                    )
                } 
                setItems={setItems} 
                handleCheck={handleCheck} 
                handleDelete={handleDelete} 
              />
          }
        </main>
        <Footer />
    </div>
  );
}

export default App;
