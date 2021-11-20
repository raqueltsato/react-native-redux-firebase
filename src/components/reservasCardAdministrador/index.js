import React from "react";
import { 
    View, 
    Text, 
    StyleSheet,        
    ScrollView
 } from 'react-native'

function ReservasCardAdministrador({reserva}) {
    console.log("Valor da reserva no componente do Admin: ", reserva);
    //const dataConvertida = reserva.dataReserva.toLocaleString();
    
    return (
        <View style = {estilo.container}>            
            <View style = {estilo.dadosDaReserva}>            
                <Text style={estilo.dataReserva}>{reserva.dataReserva}</Text>
                <Text style={estilo.usuarioNome}>{reserva.usuarioNome}</Text>
                
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
        paddingVertical: 5, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    dadosDaReserva: {
        width: '90%',        
        justifyContent: 'flex-start',
        alignItems: 'flex-start',    
        
    },    
    dataReserva: {
        fontSize: 21,
        paddingTop: 2,
        fontWeight: 'bold',
        marginLeft: 0,
        paddingLeft: 3,        
    },
    usuarioNome: {
        fontSize: 18,
        paddingBottom: 3,
    }   
});

export default ReservasCardAdministrador;
