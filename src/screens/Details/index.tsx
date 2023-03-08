import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Details() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Details</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        justifyContent: 'center'
    },
    text: {
        fontSize: 35,
        textAlign: 'center'
    }
});