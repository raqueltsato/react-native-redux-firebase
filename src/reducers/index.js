import { combineReducers } from 'redux';
import cadastroDeAmbienteForm from './cadastroDeAmbienteForm';
import usuarioReducer from './usuarioReducer';
import ambienteReducer from './ambienteReducer'
import cadastraReservaForm from './cadastraReservaForm';
import reservasReducer from './reservasReducer';


export default combineReducers({    
    usuario: usuarioReducer,
    cadastroAmbiente: cadastroDeAmbienteForm,
    listaDeAmbientes: ambienteReducer,
    cadastraReserva: cadastraReservaForm,
    reservas: reservasReducer
});