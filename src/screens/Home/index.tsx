import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { useSelector, useDispatch } from 'react-redux';
import { State } from "../../store";

type Props = {
    navigation: NativeStackHeaderProps;
}

export default function Home({ navigation }: Props) {
    const [status, setStatus] = useState<string>('');

    const statusStore = useSelector((state: State) => state.status);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('effect is called');
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setStatus('timeout is called');
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>

            <Image source={require('../../assets/images/sample.jpg')} />

            <Button
                testID="myButton"
                title="PressMe"
                onPress={() => setStatus('button pressed')} />

            <Button
                testID="myNavigateButton"
                title="Navigate to Home"
                onPress={() => navigation.navigate('Details')} />

            <Button
                testID="myButtonRedux"
                title="Run Redux"
                onPress={() => dispatch({ type: 'setStatus', payload: 'Redux timeout is called' })} />

            <Text
                testID="myText"
                style={{ textAlign: 'center' }}>{status}</Text>

            <Text
                testID="myTextRedux"
                style={{ textAlign: 'center' }}>{statusStore}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FB45',
        justifyContent: 'center'
    },
});
