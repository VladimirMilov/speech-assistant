import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VoicePlayer from './lib/VoicePlayer';
import VoiceRecognition from './lib/VoiceRecognition';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <VoicePlayer
          play
          text="React voice player demonstration"
        />
      </div>
    );
  }
}

export default App;
