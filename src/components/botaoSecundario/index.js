import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function  BotaoSecundario ({textoBotao, onPress}) {
    return(
        <View >
            <TouchableOpacity style = {estilos.botao} onPress = {onPress}>
                <Text style={estilos.botaoTexto}> {textoBotao} </Text>
            </TouchableOpacity>
        </View>
    )
}

const estilos = StyleSheet.create({
    botao: {
        marginVertical: 25,        
        marginHorizontal: 15,
        height: 55,
        borderRadius: 5, 
        borderColor: '#474343',
        borderWidth: 2,    
    }, 
    botaoTexto: {        
        fontSize: 25,
        top:10,
        color: '#474343',
        textAlign: 'center',
    } 
})
