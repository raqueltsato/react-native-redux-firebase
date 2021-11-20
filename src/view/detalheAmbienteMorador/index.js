import React,{ useState} from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import DetalheAmbienteCard from "../../components/detalheAmbienteCard";
import BotaoPrincipal from "../../components/botaoPrincipal";
import { preenche_campo_reserva, salvaReservaNoBD } from "../../actions";

function DetalhesAmbienteMorador(props) {
 
    const { ambiente } = props.route.params;    
    const [exibeDatePicker, setExibeDatePicker] = useState(false);
    const emailDoUsuario = props.usuario.data().email;
    const nomeDoUsuario = props.usuario.data().nome;

    function selecionaData(evento, dataSelecionada) { 
        //const dataFormatada = dataSelecionada.toString();      
        const dataFormatada = dataSelecionada.getDate() + "/" + (dataSelecionada.getMonth() + 1) + "/" + dataSelecionada.getFullYear() 

        console.log("Data formatada: ", dataFormatada)        
        
        if (dataSelecionada){
            props.preenche_campo_reserva('ambienteId', ambiente.id);
            props.preenche_campo_reserva('ambienteTitulo', ambiente.titulo);
            props.preenche_campo_reserva('usuarioEmail', emailDoUsuario);
            props.preenche_campo_reserva('usuarioNome', nomeDoUsuario);
            props.preenche_campo_reserva('dataReserva', dataFormatada);            
        }        
        setExibeDatePicker(false);
    }

    function acaoCadastrarReserva(reserva) {
        props.salvaReservaNoBD(reserva)
        .then(() => {            
            props.navigation.goBack();
            console.log("Cadastrou uma reserva");
            
        }).catch((erro)=> {
            console.log("Deu algum erro na tela de cadastro de reserva: ", erro);
        })  
    }

            
    return (
        <View>                
            <ScrollView>                           
                <DetalheAmbienteCard ambiente = { ambiente }/>
                <Text style={estilo.tituloReserva}>RESERVA</Text>
                <Text style={estilo.dataLabel}>Data:</Text>
                <TouchableOpacity 
                    onPress = {() => {
                        setExibeDatePicker(true); 
                    }}                                       
                > 
                    <Text style={estilo.botaoSelecionaData}>Selecionar Data</Text>
                </TouchableOpacity>
                  
                <BotaoPrincipal textoBotao="Reservar" 
                    onPress= {() => {
                        console.log("State de cadastraReserva: ", props.cadastraReserva);
                        acaoCadastrarReserva(props.cadastraReserva);
                    }}
                />
                {
                    exibeDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={selecionaData}
                
                        />
                    )
                }
                 
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
        borderBottomWidth: 1,
    },
    dataLabel: {
        marginLeft: 15,
        fontSize: 20,
        marginBottom: 3,
        marginTop: 8
    },
    botaoSelecionaData: {
        marginLeft: 15,
        color: 'blue',
        fontSize: 20,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    }
})

const mapDispatchToProps = {
    //actions
    preenche_campo_reserva,
    salvaReservaNoBD
}

const mapStateToProps = (state) => { 
    return ({
        usuario: state.usuario,
        cadastraReserva: state.cadastraReserva
       
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesAmbienteMorador);
