import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { Alert } from 'react-native';

export const USUARIO_LOGIN_SUCESSO = 'USUARIO_LOGIN';
const usuarioLoginSucesso = usuario => ({
    type: USUARIO_LOGIN_SUCESSO,
    usuario
})

export const USUARIO_LOGOUT = 'USUARIO_LOGOUT';
const usuarioLogout = () => ({
    type: USUARIO_LOGOUT,    
})

/*var firebaseConfig = {
    apiKey: "AIzaSyDqyLkXmwBmocWCFDBvpX8kWOosXuM7c8g",
    authDomain: "vilabela2-ae85a.firebaseapp.com",
    projectId: "vilabela2-ae85a",
    storageBucket: "vilabela2-ae85a.appspot.com",
    messagingSenderId: "539547186884",
    appId: "1:539547186884:web:03718a7862604b68cc7b91",
    databaseURL: "https://vilabela2-ae85a.firebaseio.com",
};*/

export const acaoBotaoEntrar =  (email, senha) => dispatch => {
    console.log("Firebase length: ", firebase.apps.length);
    
    if (firebase.apps.length == 0) {
        const app = firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    console.log('cheguei aqui')

    return auth().signInWithEmailAndPassword(email, senha)
        .then( async (usuario) => {           
            const acao = usuarioLoginSucesso(usuario);
                        
            const snapshot = await firestore().collection('usuarios').doc(usuario.user.uid).get();

            console.log("retorno do snapshot: ", snapshot.data());

            //console.log("Acao dentro da action: ", acao);
            
            dispatch(usuarioLoginSucesso(snapshot));
            return snapshot;           
        })
        .catch(erro => {
            console.log("Deu erro:", erro);
            console.log(erro.code);
            if (erro.code == "auth/user-not-found") {
                console.log("entrou");
                //return new Promise((resolve, reject) => {
                    Alert.alert( 
                        "Usuario não cadastrado",
                        "Clique em Cadastrar para registrar um novo usuário."
                        );
                
            }
            return Promise.reject(erro);
            //this.setState({mensagem: this.verificaErroDeLogin(erro.code)});
                //console.log('Erro', erro);
        })
       
}

export const acaoBotaoSair =  () => dispatch => {
    console.log("Firebase length: ", firebase.apps.length);
    console.log("Clicou em sair");
    
    if (firebase.apps.length == 0) {
        const app = firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    return firebase.auth().signOut()
        .then( async (usuario) => {     
            console.log("Fez o signOut");   
            const acao = usuarioLogout();  
            console.log("Fez a acao de signout");
            dispatch(acao);                      
        })
        .catch(erro => {
            console.log("Deu erro no Logout:", erro);
            console.log(erro.code);           
            return Promise.reject(erro);
            //this.setState({mensagem: this.verificaErroDeLogin(erro.code)});
                //console.log('Erro', erro);
        })
       
}