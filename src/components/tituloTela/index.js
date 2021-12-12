import * as React from 'react'; 
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

export default function TituloTela({titulo, navigation}) {
    return(
        <View style={styles.container}>
            <View style={styles.botaoContainer}>
                <TouchableOpacity style={styles.botao} onPress={()=>{navigation.openDrawer()}} > 
                    <Icon name="bars" size={28} color="#FFF" />
                </TouchableOpacity>
            </View>
            <View style={styles.tituloContainer}>
                <Text style={styles.text}>{titulo}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    botao: {
        backgroundColor: '#94B0DA'
    },
    text: {
        color: 'white',
        padding: 5,
        fontSize: 23,
    },
    tituloContainer: {
        backgroundColor: '#94B0DA',
        width: '100%'
    },
    botaoContainer: {
        justifyContent: 'center',
        backgroundColor: '#94B0DA',
        paddingHorizontal: 10
    }
})