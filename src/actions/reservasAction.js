import firebase from '@react-native-firebase/app';
import { Alert } from 'react-native';

export const INSERE_RESERVA_NO_STATE = 'INSERE_RESERVA_NO_STATE';

const insereReservasNoState = reservas => ({
     type: INSERE_RESERVA_NO_STATE,
     reservas: reservas

})

export const listaReservasDoBDMorador =  (emailDoUsuario) => {
     var reservas = [];     
     return async dispatch => { 
        const consulta = await firebase.firestore().collection('reservas')
        .where("usuarioEmail", "==", emailDoUsuario).get();
        consulta.forEach((reserva) => {
            reservas.push({
                id: reserva.id,
                ...reserva.data()
           })
        })
          console.log("Reservas com id: ", reservas);         
          const action = insereReservasNoState(reservas);
          dispatch(action);
     }         
}

export const listaReservasDoBDAdministrador =  (idDoAmbiente) => {
     var reservas = [];     
     return async dispatch => { 
        const consulta = await firebase.firestore().collection('reservas')
        .where("ambienteId", "==", idDoAmbiente).get();
        consulta.forEach((reserva) => {
            reservas.push({
                id: reserva.id,
                ...reserva.data()
           })
        })
          console.log("Reservas com id de ambiente: ", reservas);         
          const action = insereReservasNoState(reservas);
          dispatch(action);
     }         
}