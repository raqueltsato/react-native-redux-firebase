import React from "react";
import { 
    View, 
    Text, 
    StyleSheet,        
    ScrollView
 } from 'react-native'
import BotaoPrincipal from "../botaoPrincipal";

function ReservasCardMorador() {
    
    return (
        <View style = {estilo.container}>            
            <View style = {estilo.dadosDaReserva}>            
                <Text style={estilo.dataReserva}>01/01/2021</Text>
                <Text style={estilo.ambienteNome}> Salão de Festas</Text>
                
            </View>
            <View style = {estilo.quadro}>
                <BotaoPrincipal textoBotao="Desistir" 
                    onPress= {() => {
                        console.log("Clicou em desistir");
                    }}
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
    quadro: {
        marginHorizontal: 0,
        paddingVertical: 2,        
        flex: 1,        
                    
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
