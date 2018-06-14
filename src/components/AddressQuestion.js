import React from 'react';
import VoicePlayer from '../lib/VoicePlayer';
import VoiceRecognition from '../lib/VoiceRecognition';
import { getSystemMessage } from '../config/workflow';

const approveWords = ['yes', 'correct', 'right'];
const declineWords = ['no', 'not', 'world', 'hello'];

class AddressQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            selectedAddress: null,
            didntUnderstand: false,
            selectAnotherAddress: false,
        }
    }

    componentWillReceiveProps() {
        this.setState({
            step: 0,
            selectedAddress: null,
            didntUnderstand: false,
            selectAnotherAddress: false,
        });
    }

    nextStep = () => {
        this.setState({ step: this.state.step + 1 })
    }

    chooseAnswer = (result) => {
        this.setState({
            selectedAddress: result,
            step: this.state.step + 1,
        })
    }

    confirmationCheck = (result) => {
        result = result.split(' ');
        console.log(result);
        let approve = false;
        let decline = false;
        approveWords.forEach(word => {
            if (result.indexOf(word) >= 0) {
                approve = true;
            }
        })
        declineWords.forEach(word => {
            if (result.indexOf(word) >= 0) {
                decline = true;
            }
        })

        if (approve === decline) {
            this.setState({
                didntUnderstand: true,
                step: this.state.step,
            })
        }
        if (approve) {
            this.props.next(this.state.selectedAddress);
        }
        if (decline) {
            this.setState({
                selectAnotherAddress: true,
                step: 1,
            })
        }
    }
    render(props) {
        const { title } = this.props;
        const { step } = this.state;

        return (
            <div>
                {/* Didnt understand the question */}
                {this.state.didntUnderstand &&
                    <VoicePlayer
                        play
                        text={getSystemMessage('didntUnderstand')}
                        onEnd={() => this.setState({ didntUnderstand: false, step: step })}
                    />
                }

                {/* Select another address */}
                {this.state.selectAnotherAddress &&
                    <VoicePlayer
                        play
                        text={getSystemMessage('anotherAddress')}
                        onEnd={() => this.setState({ selectAnotherAddress: false, step: 1 })}
                    />
                }


                {/* Read the question */}
                {step === 0 &&
                    <VoicePlayer
                        play
                        text={title}
                        onEnd={this.nextStep}
                    />
                }

                {/* Listen for answer */}
                {step === 1 && !this.state.didntUnderstand &&
                    <VoiceRecognition
                        onResult={(res) => this.chooseAnswer(res.finalTranscript)}
                    />
                }

                {/* Read confirmation answer */}
                {step === 2 &&
                    <VoicePlayer
                        play
                        text={`Is this your address: ${this.state.selectedAddress}`}
                        onEnd={this.nextStep}
                    />
                }

                {/* Listen for confirmation answer */}
                {step === 3 &&
                    <VoiceRecognition
                        onResult={(res) => this.confirmationCheck(res.finalTranscript)}
                    />
                }

                <h1>Question component</h1>
                <h1>{title}</h1>
            </div>
        )
    }
}

export default AddressQuestion;
