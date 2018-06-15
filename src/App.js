import React, { Component } from 'react';
import './App.css';
import Start from './components/Start';
import QuestionMulti from './components/QuestionMulti';
import QuestionYesNo from './components/QuestionYesNo';
import QuestionOpen from './components/QuestionOpen';
import Result from './components/Result';
import {
  steps,
  stepTypes,
  answerTypes,
} from './config/workflow';
import Image from './knab-blob.png';
import logosvg from './knab.svg';

const bgStyle = {
  backgroundColor: '#00a4a7',
  color: 'white',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0,
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
      currentStep: this.state.currentStep === 4 ? 0 : this.state.currentStep + 1,
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

      case stepTypes.QUESTION: return this.renderQuestion();

      case stepTypes.END: return (
        <Result
          {...currStep}
          nextStep={this.nextStep}
        />
      );

      default:
        return (<div>Step type not found</div>);
    }
  }

  renderQuestion = () => {
    const currStep = steps[this.state.currentStep];
    switch (currStep.answer) {
      case answerTypes.OPEN: return (
        <QuestionOpen
          title={currStep.title}
          options={currStep.options}
          next={this.nextStep}
          previous={this.previousStep}
          id={currStep.id} />
      );
      case answerTypes.MULTI: return (
        <QuestionMulti
          title={currStep.title}
          options={currStep.options}
          next={this.nextStep}
          previous={this.previousStep}
          id={currStep.id} />
      );

      case answerTypes.YESNO: return (
        <QuestionYesNo
          title={currStep.title}
          options={currStep.options}
          next={this.nextStep}
          previous={this.previousStep}
          id={currStep.id} />
      );

      default:
        return (<div>Question type not found</div>);
    }
  }

  render() {
    return (
      <div className="App" style={bgStyle}>
        {this.renderStep()}
        <div style={{
          position: 'absolute',
          bottom: 50,
          left: 50,
          width: 200,
        }}>
          <img src={logosvg} />
        </div>

        <div style={{
          position: 'absolute',
          bottom: 50,
          right: 50,
        }}>
          <img src={Image} />
        </div>
      </div >
    );
  }
}

export default App;
