import * as React from 'react'; 
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

export default function HeaderDrawNav({title, navigation}) {
    return(
        <View style={styles.container}>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.openDrawer()}} > 
                    <Icon name="bars" size={28} color="#FFF" />
                </TouchableOpacity>
            </View>
            <View style={styles.containerTitle}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#94B0DA'
    },
    text: {
        color: 'white',
        padding: 5,
        fontSize: 23,
    },
    containerTitle: {
        backgroundColor: '#94B0DA',
        width: '100%'
    },
    containerButton: {
        justifyContent: 'center',
        backgroundColor: '#94B0DA',
        paddingHorizontal: 10
    }
})