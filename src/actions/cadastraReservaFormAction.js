import firebase from '@react-native-firebase/app'

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

export const salvaReservaNoBD = (cadastraReserva)=> dispatch => {
    console.log("Entrou na action de salvar reserva: ", cadastraReserva);
    console.log("Action ambienteId:", cadastraReserva.id);
    console.log("Action dataReserva:", cadastraReserva.dataReserva);
    console.log("Action usuarioEmail: ", cadastraReserva.usuarioEmail);
    const db = firebase.firestore();
    return db.collection('reservas').add({
        ambienteId: cadastraReserva.ambienteId,
        dataReserva: cadastraReserva.dataReserva,
        usuarioEmail: cadastraReserva.usuarioEmail
    }).then(()=> {
        dispatch(limpaCamposReserva());
        console.log("Salvou no BD pela action");
    }).catch(erro => {
        console.log("Erro na action ao salvar no BD: ", erro);
    })
}