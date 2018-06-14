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
            step: 0,
            selectedOption: null,
            didntUnderstand: false,
            selectAnotherQuestion: false,
        }
    }

    componentWillReceiveProps() {
        this.setState({
            step: 0,
            selectedOption: null,
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

                <h1>Question component</h1>
                <h1>{title}</h1>
                <h1>{props}</h1>

                <button onClick={() => next(id)}>Submit</button>
                <button onClick={() => previous(id)}>Prevoius</button>
            </div>
        )
    }
}

export default Question;
