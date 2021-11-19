import { LIMPA_CAMPOS_RESERVA, PREENCHE_CAMPO_RESERVA } from "../actions";

const ESTADO_INICIAL_RESERVA = {
    ambienteId: '',
    dataReserva: new Date(),
    usuarioEmail: ''
}

export default (state= ESTADO_INICIAL_RESERVA , action) => {
    switch(action.type) {
        case PREENCHE_CAMPO_RESERVA: 
            const copiaDoEstado = {...state};
            copiaDoEstado[action.campo] = action.valor; //campo e valor vem da action creator
            return copiaDoEstado;
        case LIMPA_CAMPOS_RESERVA:
            return ESTADO_INICIAL_RESERVA; 
        default:
            return state;
    }
}