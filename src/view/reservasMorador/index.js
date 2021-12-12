import * as React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import firebase from '@react-native-firebase/app';
import { connect } from 'react-redux';
import { apagaReservaDoBD } from '../../actions';

import TituloTela from '../../components/tituloTela';
import ReservasCardMorador from '../../components/reservasCardMorador';
import { listaReservasDoBDMorador } from '../../actions';

function ReservasMorador({navigation, usuario, listaReservasDoBDMorador, reservas, apagaReservaDoBD}) {
    const emailDoUsuario = usuario.data().email;    

    React.useEffect(() => {       
        listaReservasDoBDMorador(emailDoUsuario);                     
    }, [reservas])

    function apagarReserva(reserva) {
        apagaReservaDoBD(reserva)
        .then((acao) => {
            console.log("Exclusão de reserva na action foi concluida", acao);
        })
        .catch( erro => { 
            console.log("Deu erro na action: ", erro);
        });	
    }

    return(
        <View>            
            <TituloTela titulo='Minhas Reservas' navigation={navigation} />
            <FlatList
                data={reservas}
                renderItem= { ({item}) => {
                return (                    
                    <ReservasCardMorador 
                        reserva = {item} 
                        onPress = {evento =>
                            apagarReserva(item)}                       
                />                   
                )
            }}
            keyExtractor={item => item.id.toString()}
            />            
        </View>
    )
}

const mapDispatchToProps = {
    //actions
    listaReservasDoBDMorador,
    apagaReservaDoBD
}

const mapStateToProps = (state) => {     
    return ({
        usuario: state.usuario,  
        reservas: state.reservas      
       
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(ReservasMorador);