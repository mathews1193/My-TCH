import React, { Component, Fragment } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text} from '../components/Themed';

import Voice, {
    SpeechRecognizedEvent,
    SpeechResultsEvent,
    SpeechErrorEvent,
} from '@react-native-voice/voice';

type Props = {
    updateQuestion: (question: string) => void
}

type State = {
    recognized: string;
    pitch: string;
    error: string;
    started: boolean;
    end: boolean;
    partialResults: string[];
    results: string[];
}

const INIT_STATE: State = {
    recognized: '',
    pitch: '',
    error: '',
    end: false,
    started: true,
    results: [],
    partialResults: [],
};

const END_STATE: State = {
    recognized: '',
    pitch: '',
    error: '',
    end: true,
    started: false,
    results: [],
    partialResults: [],
};

class VoiceDictation extends Component<Props, State> {
    _isMounted : boolean = false;
    state = {
        recognized: '',
        pitch: '',
        error: '',
        end: false,
        started: false,
        results: [],
        partialResults: [],
    }

    constructor(props: Props) {
        super(props);
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechRecognized = this.onSpeechRecognized;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        //Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    onSpeechStart = (e: any) => {
        console.log('onSpeechStart: ', e);
        this.setState({started: true})
    }

    onSpeechRecognized = (e: any) => {
        console.log('onSpeechRecognized: ', e);
    }

    onSpeechEnd = (e: any) => {
        console.log('onSpeechEnd: ', e);
        var question : string = this.state.results.reduce((prev, current) => {
            return prev + " " + current;
        }, "");
        this.props.updateQuestion(question);
        if (this._isMounted) {
            this.setState(END_STATE);
        }
    }

    onSpeechError = (e: any) => {
        console.log('onSpeechError: ', e);
        //user does not speak or can't recognized
        var ERROR_MSG : string = "Can't recognize your voice";
        this.props.updateQuestion(ERROR_MSG);
        if (this._isMounted) {
            this.setState(END_STATE);
        }
    }

    onSpeechResults = (e: SpeechResultsEvent) => {
        console.log('onSpeechResults: ', e);
        if (e.value !== undefined) {
            this.setState({results: e.value})
        }
    };
    
    onSpeechPartialResults = (e: SpeechResultsEvent) => {
        console.log('onSpeechPartialResults: ', e);
        this.setState({
            partialResults: e.value,
        });
    };

    // onSpeechVolumeChanged = (e: any) => {
    //     console.log('onSpeechVolumeChanged: ', e);
    //     this.setState({
    //         pitch: e.value,
    //     });
    // };

    componentWillUnmount () {
        this._isMounted = false;
    }

    _startRecognizing = async () => {
        console.log("start recognizing voice");
        this.setState(INIT_STATE);
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    }

    _stopRecognizing = async () => {
        console.log("stop recognizing voice");
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
            
            return;
            
        } finally {
            console.log("wait until onSpeechEnd is called");
        }
    }

    renderButton() {
        if (this.state.started == false) {
            return <Button title="Ask" onPress = {this._startRecognizing} />
        } else {
            return <Button title="Stop" onPress = {this._stopRecognizing} />
        }
    }
    render() {
        var result : string = this.state.results.reduce((prev, current) => {
            return prev + " " + current;
        }, "");
        return (
            <Fragment>
                {this.renderButton()}
                {
                    result != "" &&
                    <Text>{result}</Text>
                }
            </Fragment>
        )
    }
}

export default VoiceDictation;
