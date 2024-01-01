//import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

//const { useEffect, useState } = React

function App() {
  return (
    <div className="App">
      <h1>Welcome to React</h1>
      <WelcomeMessage />
      <Counter />
      <CounterWithNameAndSideEffect />
    </div>
  );
}

function WelcomeMessage()
{
  return <p>Welcome to React Component</p>
}

const Counter = () => {

  const [count, setCount] = useState(0);

  return (
      <div>
          <p>
            You clicked {count} {count > 1 ? 'times':'time'}
          </p>
          <button onClick={()=> {return setCount(count+1)}}>Click me</button>
      </div>
  )

}


const CounterWithNameAndSideEffect = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('useEffectis working here');
    console.log(`You clicked ${count} times`)
  },[count])

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}


export default App;
