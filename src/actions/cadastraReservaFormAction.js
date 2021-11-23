import firebase from '@react-native-firebase/app'
import { Alert } from 'react-native';

export const PREENCHE_CAMPO_RESERVA = 'PREENCHE_CAMPO_RESERVA';

export const preenche_campo_reserva = (campo, valor) => {
    return {
        type: PREENCHE_CAMPO_RESERVA,
        campo, 
        valor
    }
}

export const LIMPA_CAMPOS_RESERVA = 'LIMPA_CAMPOS_RESERVA';
export const limpaCamposReserva = () => {
    return {
        type: LIMPA_CAMPOS_RESERVA
    }
}

export const salvaReservaNoBD = (cadastraReserva)=> async dispatch => {
    //A data é preenchida automaticamente com a data atual, os outros campos são preenchidos somente quando é selecionada uma data
    if (cadastraReserva.ambienteId == "" || cadastraReserva.usuarioEmail == "") {
        Alert.alert(
            "Preenchimento obrigatório",
            "Escolha uma data para a reserva."
        );
        throw new Error("Preencha os dados corretamente");
    }
    
    let checaAmbiente = [];
    
    const consultaAmbiente = await firebase.firestore().collection('reservas')
        .where("ambienteId", "==", cadastraReserva.ambienteId).get();
        consultaAmbiente.forEach((reserva) => {
            checaAmbiente.push({
                id: reserva.id,
                ...reserva.data()
           })
        })
    
    let checaData = checaAmbiente.find(ambiente => {
        return ambiente.dataReserva ==  cadastraReserva.dataReserva;
    })

    console.log("Data igual ao bd? ",checaData); 
    if (checaData) {        
            Alert.alert(
                "Data indisponível",
                "Esta data já está reservada. Selecione outra data."
            );
            throw new Error("Escolha outra data");
        
    } else {
        const db = firebase.firestore();
        return db.collection('reservas').add({
            ambienteId: cadastraReserva.ambienteId,
            dataReserva: cadastraReserva.dataReserva,
            usuarioEmail: cadastraReserva.usuarioEmail,
            usuarioNome: cadastraReserva.usuarioNome,
            ambienteTitulo: cadastraReserva.ambienteTitulo
        }).then(()=> {
            dispatch(limpaCamposReserva());
            console.log("Salvou no BD pela action");
        }).catch(erro => {
            console.log("Erro na action ao salvar no BD: ", erro);
        })
    }   
}