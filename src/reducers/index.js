import { combineReducers } from 'redux';
import cadastroDeAmbienteForm from './cadastroDeAmbienteForm';
import usuarioReducer from './usuarioReducer';
import ambienteReducer from './ambienteReducer'

export default combineReducers({    
    usuario: usuarioReducer,
    cadastroAmbiente: cadastroDeAmbienteForm,
    listaDeAmbientes: ambienteReducer
});