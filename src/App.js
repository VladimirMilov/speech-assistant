import React, { Component } from 'react';
import './App.css';
import Question from './components/Question';
import Result from './components/Result';
import VoicePlayer from './lib/VoicePlayer';
import VoiceRecognition from './lib/VoiceRecognition';
import { steps } from './config/workflow';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0,
    }
  }

  nextStep = (step) => {
    this.setState({
      currentStep: step + 1,
    })
  }

  previousStep = (step) => {
    this.setState({
      currentStep: step - 1,
    })
  }

  render() {
    const currentStep = steps[this.state.currentStep];
    return (
      <div className="App">
        {currentStep.component === 'Question' ?
          <Question
            title={currentStep.title}
            options={currentStep.options}
            next={this.nextStep}
            previous={this.previousStep}
            id={currentStep.id} /> :
          <Result
            title={currentStep.title}
            ammount={currentStep.ammount}
          // next={this.nextStep}
          // previous={this.previousStep}
          // id={currentStep.id}
          />}

        <VoicePlayer
          play
          text="React voice player demonstration"
          onEnd={() => { }}
        />
      </div>
    );
  }
}

export default App;
