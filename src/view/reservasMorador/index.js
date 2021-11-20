import * as React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import firebase from '@react-native-firebase/app';
import { connect } from 'react-redux';

import HeaderDrawNav from '../../components/headerDrawNav';
import ReservasCardMorador from '../../components/reservasCardMorador';
import { listaReservasDoBDMorador } from '../../actions';

function ReservasMorador({navigation, usuario, listaReservasDoBDMorador, reservas}) {
    const emailDoUsuario = usuario.data().email;    

    React.useEffect(() => {       
        listaReservasDoBDMorador(emailDoUsuario);                     
    }, [])

    return(
        <View>            
            <HeaderDrawNav title='Minhas Reservas' navigation={navigation} />
            <FlatList
                data={reservas}
                renderItem= { ({item}) => {
                return (                    
                    <ReservasCardMorador 
                        reserva = {item}                        
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
    listaReservasDoBDMorador
}

const mapStateToProps = (state) => {     
    return ({
        usuario: state.usuario,  
        reservas: state.reservas      
       
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(ReservasMorador);