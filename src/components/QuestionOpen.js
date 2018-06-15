import React from 'react';
import VoicePlayer from '../lib/VoicePlayer';
import VoiceRecognition from '../lib/VoiceRecognition';
import { getSystemMessage } from '../config/workflow';
import { phraseMatches } from '../lib/helper';

const approveWords = ['yes', 'correct', 'right'];
const declineWords = ['no', 'not', 'world', 'hello'];

class QuestionOpen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            didntUnderstand: false,
            selectAnotherAddress: false,
            selectedAddress: 'Your address will appear here',
            addressEntered: false,
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
            addressEntered: true,
            step: this.state.step + 1,
        })
    }

    confirmationCheck = (result) => {
        let approve = false;
        let decline = false;

        if (phraseMatches(result, approveWords)) {
            approve = true;
        }

        if (phraseMatches(result, declineWords)) {
            decline = true;
        }

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
                selectedAddress: 'Your address will appear here',
                addressEntered: false,
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

                <div style={{
                    color: 'white',
                    fontSize: 25,
                }}>
                    <div>{this.props.title}</div>
                    <div style={{
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#003b5a',
                        borderRadius: 15,
                        marginTop: 50,
                        padding: 20,
                        fontSize: 35,
                        color: this.state.addressEntered ? 'white' : '#C0C0C0',
                    }}>{this.state.selectedAddress}</div>
                </div>

            </div>
        )
    }
}

export default QuestionOpen;
