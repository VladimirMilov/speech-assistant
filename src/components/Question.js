import React from 'react';
import VoicePlayer from '../lib/VoicePlayer';
import VoiceRecognition from '../lib/VoiceRecognition';

const actionTypes = {
    SPEAK: 'speak',
    LISTEN: 'listen',
}
const steps = [
    { type: actionTypes.SPEAK },
    { type: actionTypes.SPEAK },
    { type: actionTypes.LISTEN },
    { type: actionTypes.SPEAK },
    { type: actionTypes.LISTEN },
]
class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
        }
    }
    nextStep = () => { 
       this.setState({ step: this.state.step + 1 })
   }

    render(props) {
        const { title, options, id, next, previous } = this.props;
        const { step } = this.state;
        const readableOptions = options.map(op => op.label).join(". ");
        console.log(readableOptions);
        
        const chooseAnswer = (result) => {

        }

        const confirmationCheck = () => {

        }
        return (
            <div>
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
                {step === 2 &&
                    <VoiceRecognition
                        onResult={(res) => this.chooseAnswer(res)}
                    />
                }
                {/* Read confirmation answer */}
                {step === 3 &&
                    <VoicePlayer
                        play
                        text={`Are you sure about this answer: ${this.state.temporarySelectedAnswer}`}
                        onEnd={this.nextStep}
                    />
                }

                {/* Listen for confirmation answer */}
                {step === 2 &&
                    <VoiceRecognition
                        onResult={(res) => this.confirmationCheck(res)}
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
