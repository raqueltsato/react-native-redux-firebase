import React from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import DetalheAmbienteCard from "../../components/detalheAmbienteCard";
import BotaoPrincipal from "../../components/botaoPrincipal";
import BotaoSecundario from "../../components/botaoSecundario";
import { apagaAmbienteDoBD,  listaReservasDoBDAdministrador} from "../../actions";
import ReservasCardAdministrador from "../../components/reservasCardAdministrador";

function DetalhesAmbienteAdministrador(props) {
 
    const { ambiente } = props.route.params;  
    //const navigation = useNavigation();  

    React.useEffect(() => {       
        props.listaReservasDoBDAdministrador(ambiente.id);                     
    }, [])
        
    return (
        <View>                
            <ScrollView >                           
                <DetalheAmbienteCard ambiente = { ambiente }/> 
                <Text style={estilo.tituloReserva}>RESERVAS</Text>
                <FlatList
                    data={props.reservas}
                    renderItem= { ({item}) => {
                    return (                    
                        <ReservasCardAdministrador 
                            reserva = {item}                        
                        />                   
                        )
                    }}
                    keyExtractor={item => item.id.toString()}
                />                
                <BotaoPrincipal textoBotao="Editar" 
                    onPress= {() => {
                        console.log("Valor do ambiente em detalhe: ", ambiente);
                        props.navigation.navigate('Cadastro de Ambiente', {ambienteAEditar: ambiente})} }
            />
                <BotaoSecundario textoBotao="Excluir"
                    onPress = { async () => {                        
                        const resultadoDeletado = await props.apagaAmbienteDoBD(ambiente);                        
                        if (resultadoDeletado) {
                            props.navigation.navigate("Início");
                        }

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
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
    }
})

const mapDispatchToProps = {
    //actions
    apagaAmbienteDoBD,
    listaReservasDoBDAdministrador
}

const mapStateToProps = (state) => {   
    
    return ({
        reservas: state.reservas,
       
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesAmbienteAdministrador);
