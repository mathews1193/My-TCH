import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';

type Props = {
    updateQuestion: (question: string) => void
}
type State = {
    results: string[];
}

class VoiceDictation extends Component<Props, State> {
    state = {
        results: [],
    }

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Button title="Start" onPress= {() => {console.log("pressed the button"); this.props.updateQuestion("hello world")}}/>
        )
    }
}

export default VoiceDictation;
