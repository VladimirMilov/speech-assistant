import React from 'react';
import VoicePlayer from '../lib/VoicePlayer';
import VoiceRecognition from '../lib/VoiceRecognition';
import { getSystemMessage } from '../config/workflow';
import { phraseMatches } from '../lib/helper';
import recording from '../recording.gif';

const approveWords = ['yes', 'correct', 'right'];
const declineWords = ['no', 'not', 'world', 'hello'];

const selectedStyle = {
    backgroundColor: '#003b5a',
};

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            selectedOption: { id: -1 },
            didntUnderstand: false,
            selectAnotherQuestion: false,
        }
    }

    componentWillReceiveProps() {
        this.setState({
            step: 0,
            selectedOption: { id: -1 },
            didntUnderstand: false,
            selectAnotherQuestion: false,
        });
    }

    nextStep = () => {
        this.setState({ step: this.state.step + 1 })
    }

    chooseAnswer = (result) => {
        let selectedOption = null;

        this.props.options.forEach((option, i) => {
            if (phraseMatches(result, option.keywords)) {
                selectedOption = option;
            }
        });

        if (selectedOption) {
            this.setState({
                selectedOption: selectedOption,
            })
            this.nextStep();
        } else {
            this.setState({
                didntUnderstand: true,
                step: this.state.step,
            })
        }
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
            this.props.next(this.state.selectedOption);
        }
        if (decline) {
            this.setState({
                selectedOption: { id: -1 },
                selectAnotherQuestion: true,
                step: 2,
            })
        }
    }
    render(props) {
        const { title, options, id, next, previous } = this.props;
        const { step } = this.state;
        const readableOptions = options.map(op => op.label).join(". ");

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

                {/* Didnt understand the question */}
                {this.state.selectAnotherQuestion &&
                    <VoicePlayer
                        play
                        text={getSystemMessage('anotherOption')}
                        onEnd={() => this.setState({ selectAnotherQuestion: false, step: 2 })}
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

                {/* Read the answers */}
                {step === 1 &&
                    <VoicePlayer
                        play
                        text={readableOptions}
                        onEnd={this.nextStep}
                    />
                }
                {/* Listen for answer */}
                {step === 2 && !this.state.didntUnderstand &&
                    <VoiceRecognition
                        onResult={(res) => this.chooseAnswer(res.finalTranscript)}
                    />
                }
                {/* Read confirmation answer */}
                {step === 3 &&
                    <VoicePlayer
                        play
                        text={`Are you sure about this answer: ${this.state.selectedOption.label}`}
                        onEnd={this.nextStep}
                    />
                }

                {/* Listen for confirmation answer */}
                {step === 4 &&
                    <VoiceRecognition
                        onResult={(res) => this.confirmationCheck(res.finalTranscript)}
                    />
                }
                {/* <VoiceRecognition /> */}

                <div style={{
                    color: 'white',
                    fontSize: 35,
                    marginTop: -150,
                }}>
                    <img src={recording} style={{
                        marginBottom: 150,
                        width: '10%',
                        height: '10%',
                        visibility: (step === 2 && !this.state.didntUnderstand) || step === 4 ? 'visible' : 'hidden',
                    }} />
                    <div style={{ marginBottom: 50 }}>{this.props.title}</div>
                    {this.props.options.map(option => (
                        <div style={{
                            margin: 20,
                            padding: 20,
                            fontSize: 35,
                            color: 'white',
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: '#003b5a',
                            borderRadius: 15,
                            backgroundColor: this.state.selectedOption.id === option.id ? '#003b5a' : 'transparent',
                        }} > {option.label}</div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Question;
