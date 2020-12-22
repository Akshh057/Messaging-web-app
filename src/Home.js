import React from 'react'
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './home.css'
function Home() {
    return (
        <div className="main__div">
            <div className="home__div">

                <Router>
                    {/* <Sidebar /> */}
                    <Switch>
                        <Route exact path="/">
                            <Sidebar />
                        </Route>
                        <Route path="/rooms/:roomId">
                            <Chat />
                        </Route>

                    </Switch>
                </Router>
            </div>
        </div>
    )
}

export default Home 
