import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Layout from './components/Layout';



function App() {
  return (
    <>
      <Router>
      <Layout></Layout>
        <Switch>
          <Route path="/About" component={About} />
          <Route path="/" component={Home} />
        </Switch> 
      </Router>
    </>
  );
}

export default App;