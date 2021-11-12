import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function BotaoPrincipal ({textoBotao, onPress}) {
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
        backgroundColor: '#49516F',
        marginHorizontal: 15,
        height: 55,
        borderRadius: 5,
              
    }, 
    botaoTexto: {        
        fontSize: 25,
        top:10,
        color: '#EAEAEA',
        textAlign: 'center',
    } 
})
