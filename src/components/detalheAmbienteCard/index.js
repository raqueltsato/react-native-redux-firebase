import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Image,    
    ScrollView
 } from 'react-native'

function DetalheAmbienteCard({ambiente}) {
    
    return (
        <View style = {estilo.container}>
            <Image style={estilo.imagemAmbiente}
                    source= {
                        {
                            uri: ambiente.img
                        }
                    }
                    aspectRatio={1}
            />
            <View style = {estilo.quadro}>            
                <Text style={estilo.tituloAmbiente}>{ambiente.titulo}</Text>
                <Text style={estilo.capacidadeAmbiente}> Capacidade: {`${ambiente.capacidade}`} </Text>
                <Text style={estilo.descricaoAmbiente}> {ambiente.descricao} </Text>
            </View>              
                
        </View>
            
        
    )
}

const estilo = StyleSheet.create({
    container: {                  
        borderWidth: 1,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 5,
        borderColor: '#C2C3C7',
        shadowColor: '#C2C3C7',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: '#FFFFFF',
        padding: 5, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagemAmbiente: {
        width: '90%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quadro: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        flex: 1,
        width: '95%',               
    },
    tituloAmbiente: {
        fontSize: 20,
        paddingTop: 3,
        fontWeight: 'bold',        
    },
    capacidadeAmbiente: {
        fontSize: 15,
        paddingBottom: 3,
    },
    descricaoAmbiente: {
        fontSize: 17,
    } 
    
});

export default DetalheAmbienteCard;
