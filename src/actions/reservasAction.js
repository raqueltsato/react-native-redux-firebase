import firebase from '@react-native-firebase/app';
import { Alert } from 'react-native';

export const INSERE_RESERVA_NO_STATE = 'INSERE_RESERVA_NO_STATE';

const insereReservasNoState = reservas => ({
     type: INSERE_RESERVA_NO_STATE,
     reservas: reservas

})

export const listaReservasDoBDMorador =  (emailDoUsuario) => {
     var ontem = new Date(Date.now() - 86400000);     
     var reservas = [];     
     return async dispatch => { 
        const consulta = await firebase.firestore().collection('reservas')
        .where("usuarioEmail", "==", emailDoUsuario).get();
        consulta.forEach((reserva) => {
          var stringData = reserva.data().dataReserva;         
          var converteData = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
          var arrayDate = stringData.match(converteData);
          var dataConvertida = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
          if (dataConvertida > ontem) {               
               reservas.push({
                    id: reserva.id,
                    ...reserva.data()
               })
          }      
            
        })
          const action = insereReservasNoState(reservas);
          dispatch(action);
     }         
}

export const listaReservasDoBDAdministrador =  (idDoAmbiente) => {
     var ontem = new Date(Date.now() - 86400000);
     var reservas = [];     
     return async dispatch => { 
        const consulta = await firebase.firestore().collection('reservas')
        .where("ambienteId", "==", idDoAmbiente).get();
        consulta.forEach((reserva) => {
          var stringData = reserva.data().dataReserva;         
          var converteData = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
          var arrayDate = stringData.match(converteData);
          var dataConvertida = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
          if (dataConvertida >= ontem) {               
               reservas.push({
                    id: reserva.id,
                    ...reserva.data()
               })
          }   
        })
          const action = insereReservasNoState(reservas);
          dispatch(action);
     }         
}