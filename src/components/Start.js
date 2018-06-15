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
import { phraseMatches } from '../lib/helper';
import wavegif from '../assets/Wave.gif';
import recording from '../recording.gif';

const speakerStyles = {
    position: 'fixed',
    top: '20px',
    left: '46%',
}

const waveStyle = {
    width: '128px',
    height: '72px',
}

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

class Start extends React.Component {
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
        if (phraseMatches(res.finalTranscript, this.props.step.keywords)) {
            this.props.nextStep();
        }
    }

    render() {
        return (
            <div style={bgStyle}>
                <div style={labelStyle}>The Voice of KNAB</div>
                {
                    this.state.speak &&
                    <div style={speakerStyles}>
                        <img src={wavegif} style={waveStyle} />
                        <VoicePlayer
                            play
                            text={getSystemMessage('start')}
                            onEnd={this.listen}
                        />
                    </div>
                }
                {
                    this.state.listen &&
                    <div style={speakerStyles}>
                        <img src={recording} style={waveStyle} />
                        <VoiceRecognition
                            onResult={this.checkResult}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default Start;
