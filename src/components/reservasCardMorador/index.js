import React from "react";
import { 
    View, 
    Text, 
    StyleSheet,        
    ScrollView
 } from 'react-native'
import BotaoPrincipal from "../botaoPrincipal";

function ReservasCardMorador({reserva, onPress}) {    
    const dataConvertida = reserva.dataReserva.toLocaleString();
    
    return (
        <View style = {estilo.container}>            
            <View style = {estilo.dadosDaReserva}>            
                <Text style={estilo.dataReserva}>{dataConvertida}</Text>
                <Text style={estilo.ambienteNome}>{reserva.ambienteTitulo}</Text>
                
            </View>
            <View style = {estilo.quadro}>
                <BotaoPrincipal textoBotao="Desistir" 
                    onPress= {onPress}
                />  
            </View>
                      
                
        </View>
            
        
    )
}

const estilo = StyleSheet.create({
    container: {     
        flexDirection:'row',             
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    dadosDaReserva: {
        width: '50%',        
        justifyContent: 'flex-start',
        alignItems: 'flex-start',       
       
    },    
    dataReserva: {
        fontSize: 21,
        paddingTop: 2,
        fontWeight: 'bold',
        paddingLeft: 3,        
    },
    ambienteNome: {
        fontSize: 18,
        paddingBottom: 3,
    }    
    
});

export default ReservasCardMorador;
