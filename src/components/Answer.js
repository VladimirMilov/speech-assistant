import React from 'react';
import {
    answerTypes,
} from '../config/workflow';

class Answer extends React.Component {
    constructor() {
        super();
    }

    listen = () => {
        this.setState({
            speak: false,
            listen: true,
        });
    }

    checkResult = (res) => {
        res.finalTranscript.split().forEach(word => {
            if (this.props.step.keywords.indexOf(word) !== -1) {
                this.props.nextStep();
            }
        });
    }

    render() {
        return (
            <div style={bgStyle}>
                <div style={labelStyle}>The Voice of KNAB</div>
                {
                    this.state.speak &&
                    <VoicePlayer
                        play
                        text={getSystemMessage('end')}
                        onEnd={this.listen}
                    />
                }
                {
                    this.state.listen && <VoiceRecognition
                        onResult={this.checkResult}
                    />
                }
            </div>
        )
    }
}

export default Result;
