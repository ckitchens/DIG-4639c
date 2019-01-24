import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NameForm from './NameForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <NameForm />
          </p>
        </header>
      </div>
    );
  }
}

export default App;
