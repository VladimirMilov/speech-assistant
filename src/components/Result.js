import React from 'react';
import {
    Label,
} from 'react-semantic-ui';
import VoicePlayer from '../lib/VoicePlayer';
import VoiceRecognition from '../lib/VoiceRecognition';
import {
    getSystemMessage,
    voices,
} from '../config/workflow';

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

const labelStyle = {
    backgroundColor: '#003b5a',
    fontSize: '35px',
    color: 'white',
    borderRadius: 15,
    width: '550px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

class Result extends React.Component {
    constructor() {
        super();
        this.state = {
            speak: true,
            listen: false,
        }
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
