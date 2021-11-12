import { USUARIO_LOGIN_SUCESSO, USUARIO_LOGOUT } from '../actions';

export default function usuarioReducer(state=null, action) {
    switch(action.type) {
        case USUARIO_LOGIN_SUCESSO:
            return action.usuario;
        case USUARIO_LOGOUT:
            return null;
        default:
            return state;
    }
}