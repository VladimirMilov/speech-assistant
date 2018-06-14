import React, { Component } from 'react';
import './App.css';
import Start from './components/Start';
import Question from './components/Question';
import Result from './components/Result';
import VoicePlayer from './lib/VoicePlayer';
import VoiceRecognition from './lib/VoiceRecognition';
import { steps, stepTypes } from './config/workflow';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      stepsResult: [],
    }
  }

  resetState = () => {
    this.setState({
      currentStep: 0,
      stepsResult: [],
    })
  }

  nextStep = () => {
    this.setState({
      currentStep: this.state.currentStep + 1,
    })
  }

  previousStep = () => {
    this.setState({
      currentStep: this.state.currentStep - 1,
    })
  }

  renderStep = () => {
    const currStep = steps[this.state.currentStep];
    console.log(currStep);
    switch (currStep.type) {
      case stepTypes.START: return (
        <Start nextStep={this.nextStep} step={currStep} />
      );

      case stepTypes.QUESTION: return (
        <Question
          title={currStep.title}
          options={currStep.options}
          next={this.nextStep}
          previous={this.previousStep}
          id={currStep.id} />
      );

      case stepTypes.END: return (
        <Result
          title={currStep.title}
          ammount={currStep.ammount}
        />
      );

      default:
        return (<div>Step type not found</div>);
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderStep()}
      </div>
    );
  }
}

export default App;
