import { INSERE_RESERVA_NO_STATE} from '../actions'

export default function (state={}, action) {
    switch(action.type) {
        case INSERE_RESERVA_NO_STATE:
            return action.reservas;
        default:
            return state;
    }
    
}