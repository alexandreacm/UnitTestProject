import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { useSelector, useDispatch } from 'react-redux';
import { selectStatus } from "../../store";

import sample from '../../assets/images/sample.jpg';
import { Post } from "../../types";

type Props = {
    navigation: NativeStackHeaderProps;
}

export default function Home({ navigation }: Props) {
    const [status, setStatus] = useState<string>('');
    const [post, setPost] = useState<Post[]>([]);
    const [load, setLoad] = useState<Boolean>(false);

    const dispatch = useDispatch();
    // const statusStore = useSelector((state: State) => state.status);
    const statusStore = useSelector(selectStatus);
    const baseUrl = 'https://jsonplaceholder.typicode.com/todos';


    useEffect(() => {
        function fetchData() {

            setLoad(true);

            fetch(baseUrl)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setLoad(false)
                })
        }

        // fetchData();
    }, []);

    useEffect(() => {
        console.log('effect is called');

        setTimeout(() => {
            setStatus('timeout is called');
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>

            {/* <Image source={require('../../assets/images/sample.jpg')} /> */}
            <Image source={sample} />

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
