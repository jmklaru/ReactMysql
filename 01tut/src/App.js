import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState } from 'react';


function App() {
  
  const [items, setItems] = useState([
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
  
  ]);
  
  const handleCheck = (id) => { 
    //console.log(`Key: ${id}`);
    const listItems = items.map((item) => (item.id === id ? {...item, checked: !item.checked}:item));
    setItems(listItems);
    localStorage.setItem("shoppingList", JSON.stringify(listItems));
  }
  
  const handleDelete = (id) => {
    //console.log(id);
    const listItems = items.filter((item) => item.id !==id );
    setItems(listItems);
    localStorage.setItem("shoppingList", JSON.stringify(listItems));
  }

  return (
    <div className="App">
        <Header title="New title page" />
        <Content items={items} setItems={setItems} handleCheck={handleCheck} handleDelete={handleDelete} />
        <Footer />
    </div>
  );
}

export default App;
