import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native"
export class Home extends Component {



    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' />
            </View>

        )
    }
}

export default Home
const styles = StyleSheet.create({

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})