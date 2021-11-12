import * as React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native";
import firebase from '@react-native-firebase/app'

import BotaoPrincipal from '../../components/botaoPrincipal';
import CampoInput from '../../components/campoInput';
import HeaderDrawNav from '../../components/headerDrawNav';
import { pegaValorDoCampo, salvaAmbienteNoBD, preenche_todos_os_campos, limpa_formulario } from "../../actions";
import firebaseConfig from "../../config/firebase";


function NovoAmbiente({ cadastroAmbiente, 
                        pegaValorDoCampo, 
                        salvaAmbienteNoBD, 
                        navigation, 
                        preenche_todos_os_campos,
                        limpa_formulario,
                        route }) {
                         

    const [mensagemValidacao, setMensagemValidacao] = React.useState("");
    const [processando, setProcessando] = React.useState(false);

    //Caso seja uma tela de Edição, os campos serão preenchidos com os dados
    React.useEffect(() => {
        const {params} = route;
        if (params && params.ambienteAEditar) {
            console.log("Olha o parametro: ", params.ambienteAEditar);
            preenche_todos_os_campos(params.ambienteAEditar)
        } else {
            limpa_formulario();
        }
    }, [])
    

    //firebase.initializeApp(firebaseConfig);
    //const db = firebase.firestore();

    function cadastrarAmbiente() {
        setProcessando(true);
        if (validaCampos()) {            
            salvaAmbienteNoBD(cadastroAmbiente)        
            .then(() => {            
                 navigation.navigate('Início');
                 //console.log("Cadastrou um ambiente");
                 setProcessando(false);
                 setMensagemValidacao("");
             }).catch((erro)=> {
                 console.log("Deu algum erro na tela de cadastro: ", erro);
             })  
        }  else {
            setProcessando(false);
            setMensagemValidacao("Verifique se todos os campos estão preenchidos");
        }  
    }

    function validaCampos() {
        console.log("Ambiente: ", cadastroAmbiente);  
        var { capacidade, descricao, img, titulo } = cadastroAmbiente;
        if (capacidade == "" || titulo == "" || descricao == "" || img == "")  {
            return false;
        } 
            
        
        return true;      
    }

    function carregaBotao() {
		if (processando) {
            return <ActivityIndicator size="large" color="#0000ff"/>;
        } else {
            /*const {params} = route;
            if (params) {
                return (
                    <BotaoPrincipal textoBotao="Editar Ambiente" 
                        onPress = { () =>
                                cadastrarAmbiente()                        
                            }
                    />  
                )
            } else {
                return (
                    <BotaoPrincipal textoBotao="Cadastrar Ambiente" 
                        onPress = { () =>
                                cadastrarAmbiente()                        
                            }
                    />  
                )
            }*/
            return (
                <BotaoPrincipal textoBotao="Salvar Ambiente" 
                        onPress = { () =>
                            cadastrarAmbiente()                        
                        }
                />
            )
        }
			

		
	}    

    return(
        <View>
            <HeaderDrawNav title='Cadastro de Ambiente' navigation={navigation} />
            <ScrollView style={estilo.container}>                
                <CampoInput             
                    descricaoLabel="Nome do ambiente" expressao="Ex: Salão de festas" 
                    value= { cadastroAmbiente.titulo}
                    onChangeText={ (valor) =>{                        
                        pegaValorDoCampo('titulo', valor);                        
                    }}                   						
		        />

                 <CampoInput             
                    descricaoLabel="Lotação máxima" expressao="Ex: 200" 
                    value= { cadastroAmbiente.capacidade}
                    onChangeText={ (valor) =>{
                        console.log(valor);
                        pegaValorDoCampo('capacidade', valor);                        
                    }}						
                />

                <CampoInput             
                    descricaoLabel="Descrição" expressao="Insira a descrição aqui" 
                    value= { cadastroAmbiente.descricao}
                    onChangeText= { (valor) => {                
                        pegaValorDoCampo('descricao', valor);
                    }}
                    numberOfLines = {5} multiline = {true}
                                                        
                />
                <CampoInput             
                    descricaoLabel="Imagem" expressao="Imagem" 
                    value= { cadastroAmbiente.img}
                    onChangeText= { (valor) => {                
                        pegaValorDoCampo('img', valor);
                    }}            							
                />
                { mensagemValidacao ? <Text style= {estilo.mensagemValidacao}>{mensagemValidacao}</Text> : <Text></Text>
                }
                {carregaBotao()}
        </ScrollView>
        </View>
        
    )
}
/*

const NovoAmbiente = ({cadastroAmbiente, pegaValorDoCampo, navigation}) => (
    <View>
        <HeaderDrawNav title='Cadastro de Ambiente' navigation={navigation} />
    <ScrollView style={estilo.container}>
        
        <CampoInput             
            descricaoLabel="Nome do ambiente" expressao="Ex: Salão de festas" 
            value= {cadastroAmbiente.titulo}
            onChangeText= { (value) => {                
                pegaValorDoCampo('titulo', value);
            }}							
		/>
         <CampoInput             
            descricaoLabel="Lotação máxima" expressao="Ex: 200" 
            value= {cadastroAmbiente.capacidade}
            onChangeText= { (value) => {                
                pegaValorDoCampo('capacidade', value);
            }}							
		/>
        <CampoInput             
            descricaoLabel="Descrição" expressao="Insira a descrição aqui" 
            value= {cadastroAmbiente.descricao}
            onChangeText= { (value) => {                
                pegaValorDoCampo('descricao', value);
            }}
            numberOfLines = {5} multiline = {true}
            							
		/>
        <CampoInput             
            descricaoLabel="Imagem" expressao="Imagem" 
            value= {cadastroAmbiente.img}
            onChangeText= { (value) => {                
                pegaValorDoCampo('img', value);
            }}            							
		/>
        <BotaoPrincipal textoBotao="Cadastrar" 
                            onPress = { () =>
                                console.log(cadastroAmbiente)} 
        />
    </ScrollView>
    </View>

);*/

const estilo = StyleSheet.create({
    container: {
        paddingTop: 5,
        backgroundColor: '#F0F0F0',
    },
    mensagemValidacao: {
        fontSize: 15,
        color: '#ab0000',
        marginLeft: 12
    }
});

const mapStateToProps = (state) => {
    //Criação de objeto -------- cadastroAmbiente vem do Redux Reducer
    return ({
        cadastroAmbiente: state.cadastroAmbiente
    });
}

const mapDispatchToProps = {
    //vem de actions e enviado como parametro para NovoAmbiente
    pegaValorDoCampo,
    salvaAmbienteNoBD, 
    preenche_todos_os_campos,
    limpa_formulario
}

export default connect(mapStateToProps, mapDispatchToProps)(NovoAmbiente);