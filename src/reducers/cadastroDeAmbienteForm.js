import { firebase } from "@react-native-firebase/firestore";
import { PEGA_VALOR_DO_CAMPO, 
        LIMPA_CAMPOS_CADASTRO_AMBIENTE, 
        PREENCHE_TODOS_OS_CAMPOS, 
        LIMPA_FORMULARIO } from "../actions";

const ESTADO_INICIAL = {
    id: null,    
    titulo: '',
    capacidade: '',
    img: '',
    descricao: ''
}

export default function (state = ESTADO_INICIAL, action) {
    switch(action.type) {
        case PEGA_VALOR_DO_CAMPO:
            const copiaDoEstado = {...state};
            copiaDoEstado[action.campo] = action.valor; //campo e valor vem da action creator
            return copiaDoEstado;
        case LIMPA_CAMPOS_CADASTRO_AMBIENTE: 
            return ESTADO_INICIAL;
        case PREENCHE_TODOS_OS_CAMPOS:
             return action.ambiente;
        case LIMPA_FORMULARIO:
            return ESTADO_INICIAL;
        default:
            return state;
    }
}