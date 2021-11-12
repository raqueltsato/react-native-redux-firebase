//import ambientes from '../../ambientes.json';
import { INSERE_AMBIENTE_NO_STATE} from '../actions'

//const ESTADO_INICIAL = ambientes;

export default function (state={}, action) {
    switch(action.type) {
        case INSERE_AMBIENTE_NO_STATE:
            return action.ambientes;
        default:
            return state;
    }
    
}