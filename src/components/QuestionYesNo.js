import React from 'react';
import VoicePlayer from '../lib/VoicePlayer';
import VoiceRecognition from '../lib/VoiceRecognition';
import { getSystemMessage } from '../config/workflow';
import { phraseMatches } from '../lib/helper';

const approveWords = ['yes', 'correct', 'right'];
const declineWords = ['no', 'not', 'world', 'hello'];

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            selectedOption: { id: -1 },
            didntUnderstand: false,
            selectAnotherQuestion: false,
        }
    }

    componentWillReceiveProps() {
        this.setState({
            step: 1,
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
            setTimeout(() => { this.props.next(selectedOption) }, 1000);
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
                selectAnotherQuestion: true,
                step: 2,
                selectedOption: { id: -1 },
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
                {step === 1 &&
                    <VoicePlayer
                        play
                        text={title}
                        onEnd={this.nextStep}
                    />
                }

                {/* Read the answers */}
                {/* {step === 1 &&
                    <VoicePlayer
                        play
                        text={readableOptions}
                        onEnd={this.nextStep}
                    />
                } */}
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
                        text={'Are you sure.'}
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
                }}>
                    <div style={{ marginBottom: 50 }}>{this.props.title}</div>
                    <div>
                        {this.props.options.map(option => (
                            <div key={option.id} style={{
                                display: 'inline-block',
                                margin: 20,
                                padding: '5px 25px',
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
            </div>
        )
    }
}

export default Question;
