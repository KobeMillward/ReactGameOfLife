import React, { Component } from 'react';
import './App.css';
import GameOfLife from './components/GameOfLife';

class App extends Component {

    render() {
        return (
            <div className="App">
                <GameOfLife width={30} height={10} />
            </div>
        );
    }
}

export default App;