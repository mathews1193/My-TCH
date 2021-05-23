import React, { Component, Fragment } from 'react';
import { Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text} from '../components/Themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrophone, faMicrophoneSlash} from '@fortawesome/free-solid-svg-icons';

import Voice, {
    SpeechRecognizedEvent,
    SpeechResultsEvent,
    SpeechErrorEvent,
} from '@react-native-voice/voice';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
    updateQuestion: (question: string) => void,
    endQuestion: () => void,
}

type State = {
    recognized: string;
    pitch: string;
    error: string;
    started: boolean;
    end: boolean;
}

const INIT_STATE: State = {
    recognized: '',
    pitch: '',
    error: '',
    end: false,
    started: true,
};

const END_STATE: State = {
    recognized: '',
    pitch: '',
    error: '',
    end: true,
    started: false,
};

class VoiceDictation extends Component<Props, State> {
    _isMounted : boolean = false;
    state = {
        recognized: '',
        pitch: '',
        error: '',
        end: false,
        started: false,
    }

    constructor(props: Props) {
        console.log("voice dictation constructor");
        super(props);
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechRecognized = this.onSpeechRecognized;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        //Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        //Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    }

    componentDidMount() {
        console.log("Voice dictation mounted");
        this._isMounted = true;
        console.log("_isMounted: ", this._isMounted);
    }

    onSpeechStart = (e: any) => {
        console.log('onSpeechStart: ', e);
        console.log("onspeechstart _isMounted ", this._isMounted);
        //this._isMounted = true;
        if (this._isMounted) {
            this.setState({started: true, end: false});
        }
    }

    onSpeechRecognized = (e: any) => {
        console.log('onSpeechRecognized: ', e);
    }

    onSpeechEnd = (e: any) => {
        console.log('onSpeechEnd: ', e);
        if (this._isMounted) {
            this.props.endQuestion();
            //this.setState(END_STATE);
        }
    }

    onSpeechError = (e: any) => {
        console.log('onSpeechError: ', e);
        //user does not speak or can't recognized
        var ERROR_MSG : string = "Can't recognize your voice";
        Alert.alert(ERROR_MSG);
        //this.props.updateQuestion(ERROR_MSG);
        if (this._isMounted) {
            this.setState(END_STATE);
        }
    }

    onSpeechResults = (e: SpeechResultsEvent) => {
        console.log('onSpeechResults: ', e);
        if (this._isMounted && e.value !== undefined) {
            console.log("speechResults inside");
            var question : string = e.value.reduce((prev, current) => {
                return prev + " " + current;
            }, "");
            this.props.updateQuestion(question)
        } else {
            console.log("speechResults outside");
        }
    };
    
    // onSpeechPartialResults = (e: SpeechResultsEvent) => {
    //     console.log('onSpeechPartialResults: ', e);
    //     this.setState({
    //         partialResults: e.value,
    //     });
    // };

    // onSpeechVolumeChanged = (e: any) => {
    //     console.log('onSpeechVolumeChanged: ', e);
    //     this.setState({
    //         pitch: e.value,
    //     });
    // };

    async componentWillUnmount () {
        console.log("Voice dictation will unmount");
        this._isMounted = false;
        await Voice.removeAllListeners();
        await Voice.destroy();
    }

    _startRecognizing = async () => {
        console.log("start recognizing voice");
        if (this._isMounted) 
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
            if (this._isMounted) {
                this.setState(END_STATE);
            }
        }
    }

    renderButton() {
        var title: string = !this.state.started ? "Voice Assist" : "Stop";
        var handler = !this.state.started ? this._startRecognizing : this._stopRecognizing;
        var icon = !this.state.started ? faMicrophone : faMicrophoneSlash;
        var buttonStyle = !this.state.started ? [styles.button] : [styles.button, styles.stopButton];
        return (
            <TouchableOpacity
                style={buttonStyle}
                onPress = {handler}>
                <FontAwesomeIcon icon={icon} />
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Fragment>
                {this.renderButton()}
            </Fragment>
        )
    }
}

export default VoiceDictation;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        textAlign: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgb(0,122,255)",
        color: "white",
    },
    stopButton: {
        backgroundColor: "rgb(210,56,58)",
    },
    text: {
        color: "white",
        textAlign: "center",
    }
});