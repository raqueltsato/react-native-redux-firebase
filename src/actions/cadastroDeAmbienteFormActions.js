import firebase from '@react-native-firebase/app'

export const PEGA_VALOR_DO_CAMPO = 'PEGA_VALOR_DO_CAMPO';

export const pegaValorDoCampo = (campo, valor) => {
    return {
        type: PEGA_VALOR_DO_CAMPO,
        campo, 
        valor
    }
}
/*  const action = pegaValorDoCampo('titulo', 'Salão de festas');
    dispatch(action) - o dispatch é realizado na tela de Cadastro de ambiente
*/

//Após cadastrar um novo ambiente no BD os campos de input são resetados.
export const LIMPA_CAMPOS_CADASTRO_AMBIENTE = 'LIMPA_CAMPOS_CADASTRO_AMBIENTE';
export const limpaCamposCadastroAmbiente = () => {
    return {
        type: LIMPA_CAMPOS_CADASTRO_AMBIENTE
    }
}

//Action que preenche os campos de edição (na tela de cadastro)
export const PREENCHE_TODOS_OS_CAMPOS = 'PREENCHE_TODOS_OS_CAMPOS';
export const preenche_todos_os_campos = ambiente => ({
    type: PREENCHE_TODOS_OS_CAMPOS,
    ambiente: ambiente

})
//Limpa os campos da tela de cadastro (caso seja cadastro de um Novo Ambiente)
export const LIMPA_FORMULARIO = 'LIMPA_FORMULARIO';
export const limpa_formulario = () => ({
    type: LIMPA_FORMULARIO
})

export const salvaAmbienteNoBD = (cadastroAmbiente) => dispatch => {    
    const db = firebase.firestore();
    if (cadastroAmbiente.id) {
        return db.collection('ambientes').doc(cadastroAmbiente.id).update({
            titulo: cadastroAmbiente.titulo, 
            capacidade: cadastroAmbiente.capacidade,
            descricao: cadastroAmbiente.descricao,
            img: cadastroAmbiente.img,
        }).then(()=> {
           console.log("Atualizou o ambiente!");
        }).catch(erro => {
            console.log("Erro na action ao editar um ambiente: ", erro);
        })

    } else {
        console.log("Ambiente que nao tem id: ", cadastroAmbiente);
        return db.collection('ambientes').add({
            titulo: cadastroAmbiente.titulo, 
            capacidade: cadastroAmbiente.capacidade,
            descricao: cadastroAmbiente.descricao,
            img: cadastroAmbiente.img,
        }).then(()=> {
            dispatch(limpaCamposCadastroAmbiente());
        }).catch(erro => {
            console.log("Erro na action ao salvar no BD: ", erro);
        })
    }
}
