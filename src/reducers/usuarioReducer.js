import { USUARIO_LOGIN_SUCESSO, USUARIO_LOGOUT } from '../actions';

export default function usuarioReducer(state=null, action) {
    switch(action.type) {
        case USUARIO_LOGIN_SUCESSO:
            return action.usuario;
        case USUARIO_LOGOUT:
            console.log("Valor do state no reducer: ", state);
            return state;
        default:
            return state;
    }
}