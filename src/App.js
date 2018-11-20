import React, { Component } from 'react';
import BabyNames from './components/BabyNames'
import './App.css';

const names = require('./baby-names.json')
console.log('names: ', names)
class App extends Component {
  render() {
    return (
      <div className="App">
        <BabyNames />
      </div>
    );
  }
}

export default App;
