
import * as React from 'react';
import firebase from '@react-native-firebase/app';
import { useSelector } from 'react-redux';
import {useFirestoreConnect, useFirestore, useFirebase} from 'react-redux-firebase';

export const INSERE_AMBIENTE_NO_STATE = 'INSERE_AMBIENTE_NO_STATE';

const insereAmbienteNoState = ambientes => ({
     type: INSERE_AMBIENTE_NO_STATE,
     ambientes: ambientes

})

export const listaAmbientesDoBD =  () => {
     var ambientes = [];
     return async dispatch => {          
          const query = await firebase.firestore().collection('ambientes').get();
          query.forEach((item)=> {
               ambientes.push({
                    id: item.id,
                    ...item.data()
               })
          })
          //console.log("Ambientes com id: ", ambientes)         
          const action = insereAmbienteNoState(ambientes);
          dispatch(action); 
          
     }         
}

//Não é realtime
/*export function listaAmbientesDoBD () {
     return ((dispatch) => {
          firebase.firestore().collection("ambientes").doc().get().then((snapshot) => {
               if (snapshot.exists) {
                    console.log("Lista de ambientes do firebase: ", snapshot);
               } else{
                    console.log("Não existe");
               }
          })
     })
} */