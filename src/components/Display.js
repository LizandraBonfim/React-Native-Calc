import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        alignItems: 'flex-end',

    },
    displayValue: {
        fontSize: 60,
        color: '#fff'
    }
})

export default props => {
    return (
        <View style={styles.display}>
            <Text
                style={styles.displayValue} numberOfLines={1}>
                {props.value}
            </Text>
        </View>
    )
}