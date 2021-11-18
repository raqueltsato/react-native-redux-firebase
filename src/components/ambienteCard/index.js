import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Image,
    TouchableOpacity
 } from 'react-native'


export default function AmbienteCard ({ambiente, redirecionamento}){
    return (
        <TouchableOpacity 
            onPress = {redirecionamento}
            style = {estilo.container}
        >
            <Image style={estilo.imagemAmbiente}
                    source= {
                        {
                            uri: `data:image/jpeg;base64,${ambiente.img}`
                        }
                    }
                    aspectRatio={1}
                />
            <View style = {estilo.quadro}>
                
                <Text style={estilo.tituloAmbiente}>{ambiente.titulo}</Text>
                <Text style={estilo.capacidadeAmbiente}> Capacidade: {`${ambiente.capacidade}`} </Text>
                <Text style={estilo.descricaoAmbiente} numberOfLines={3}> {ambiente.descricao} </Text>
            </View>        
        </TouchableOpacity>
    )
};

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 5,
        borderColor: '#C2C3C7',
        shadowColor: '#C2C3C7',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: '#FFFFFF',
        padding: 5, 
    },
    imagemAmbiente: {
        width: '38%',
        borderRadius: 5
    },
    quadro: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        flex: 1,
        width: '95%',               
    },
    tituloAmbiente: {
        fontSize: 20,
        paddingVertical: 3,
        fontWeight: 'bold',       
    },
    capacidadeAmbiente: {
        fontSize: 15,
        paddingVertical: 3,
    },
    descricaoAmbiente: {
        fontSize: 17
    }  
    
});
