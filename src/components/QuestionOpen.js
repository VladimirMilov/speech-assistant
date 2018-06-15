import React from 'react';
import VoicePlayer from '../lib/VoicePlayer';
import VoiceRecognition from '../lib/VoiceRecognition';
import { getSystemMessage } from '../config/workflow';
import { phraseMatches } from '../lib/helper';
import wavegif from '../assets/Wave.gif';
import recording from '../recording.gif';

const approveWords = ['yes', 'correct', 'right'];
const declineWords = ['no', 'not', 'world', 'hello'];

const speakerStyles = {
    position: 'fixed',
    top: '20px',
    left: '46%',
}

const waveStyle = {
    width: '128px',
    height: '72px',
}

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
                    <div style={speakerStyles}>
                        <img src={wavegif} style={waveStyle} />
                        <VoicePlayer
                            play
                            text={getSystemMessage('didntUnderstand')}
                            onEnd={() => this.setState({ didntUnderstand: false, step: step })}
                        />
                    </div>
                }

                {/* Select another address */}
                {this.state.selectAnotherAddress &&
                    <div style={speakerStyles}>
                        <img src={wavegif} style={waveStyle} />
                        <VoicePlayer
                            play
                            text={getSystemMessage('anotherAddress')}
                            onEnd={() => this.setState({ selectAnotherAddress: false, step: 1 })}
                        />
                    </div>
                }


                {/* Read the question */}
                {step === 0 &&
                    <div style={speakerStyles}>
                        <img src={wavegif} style={waveStyle} />
                        <VoicePlayer
                            play
                            text={title}
                            onEnd={this.nextStep}
                        />
                    </div>
                }

                {/* Listen for answer */}
                {step === 1 && !this.state.didntUnderstand && !this.state.selectAnotherAddress &&
                    <div style={speakerStyles}>
                        <img src={recording} style={waveStyle} />
                        <VoiceRecognition
                            onResult={(res) => this.chooseAnswer(res.finalTranscript)}
                        />
                    </div>
                }

                {/* Read confirmation answer */}
                {step === 2 &&
                    <div style={speakerStyles}>
                        <img src={wavegif} style={waveStyle} />
                        <VoicePlayer
                            play
                            text={`Is this your address: ${this.state.selectedAddress}`}
                            onEnd={this.nextStep}
                        />
                    </div>
                }

                {/* Listen for confirmation answer */}
                {step === 3 &&
                    <div style={speakerStyles}>
                        <img src={recording} style={waveStyle} />
                        <VoiceRecognition
                            onResult={(res) => this.confirmationCheck(res.finalTranscript)}
                        />
                    </div>
                }

                <div style={{
                    color: 'white',
                    fontSize: 35,
                }}>
                    <div>{this.props.title}</div>
                    <div style={{
                        marginTop: 50,
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#003b5a',
                        borderRadius: 15,
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
