import react from 'react'
import './App.css';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';
// import SidebarChat from './SidebarChat';
import Home from './Home';
function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <>
      {!user ? (
        <Login />
      ) : (
          <Home />
        )}
    </>
  );
}

export default App;
