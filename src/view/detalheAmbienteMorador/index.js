import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { connect } from 'react-redux';

import DetalheAmbienteCard from "../../components/detalheAmbienteCard";
import BotaoPrincipal from "../../components/botaoPrincipal";
import { apagaAmbienteDoBD } from "../../actions";

function DetalhesAmbienteMorador(props) {
 
    const { ambiente } = props.route.params;
        
    return (
        <View>                
            <ScrollView>                           
                <DetalheAmbienteCard ambiente = { ambiente }/>
                <Text style={estilo.tituloReserva}>RESERVA</Text>   
                <BotaoPrincipal textoBotao="Reservar" 
                    onPress= {() => {
                        console.log("Clicou em reservar");
                    }}
                />
                 
            </ScrollView>
        </View>
    )    

}

const estilo = StyleSheet.create({
    tituloReserva:{
        marginHorizontal: 15,
        fontSize: 21,
        marginTop: 15,
        borderBottomWidth: 1,
    }
})

const mapDispatchToProps = {
    //actions
    //apagaAmbienteDoBD
}

export default connect(null, mapDispatchToProps)(DetalhesAmbienteMorador);
