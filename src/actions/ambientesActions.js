
import * as React from 'react';
import firebase from '@react-native-firebase/app';
import { useSelector } from 'react-redux';
import {useFirestoreConnect, useFirestore, useFirebase} from 'react-redux-firebase';
import { Alert } from 'react-native';

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

export const apagaAmbienteDoBD = ambiente => {
     return dispatch => {
        return new Promise((resolve, reject) => {
             Alert.alert(
                  "Excluir", 
                  `Deseja excluir o ambiente ${ambiente.titulo}?`,
                  [{
                       text: "Excluir",
                       onPress: async () => {  
                         try{
                              await firebase
                              .firestore()
                              .collection('ambientes')
                              .doc(ambiente.id)
                              .delete();
                         
                              resolve(true);
                         } catch(erro) {
                              reject(erro);
                         }  
                       }
                  }, {
                       text: "Cancelar",
                       onPress: () => {
                         resolve(false);

                       }, 
                       style: 'cancel'
                  }],
                  { cancelable: false }
                  )
        })  
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