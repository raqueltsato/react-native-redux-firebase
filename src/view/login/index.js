import * as React from 'react';
import {ScrollView, View, Text, Button, TextInput, StyleSheet, KeyboardAvoidingView, ActivityIndicator} from 'react-native';

import firebase from '@react-native-firebase/app'
import BotaoPrincipal from '../../components/botaoPrincipal';
import CampoInput from '../../components/campoInput';
import { acaoBotaoEntrar } from '../../actions';
import { connect } from 'react-redux';
import BotaoSecundario from '../../components/botaoSecundario';
import firebaseConfig from '../../config/firebase';

function Login(props) {  
    
    const [email, setEmail] = React.useState("teste@email.com");
    const [senha, setSenha] = React.useState("123456");
    const [processando, setProcessando] = React.useState(false);
    const [mensagem, setMensagem] = React.useState("");	

    React.useEffect(() => {
        //firebaseConfig aqui          
        //console.log("Teste: ", firebase.apps.length);
		//Iniciando Firebase
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig); 
		} else {
			firebase.app();
		}
    }, [])

    function entrar() {               
        setProcessando(true);

        console.log("Email e senha:", email, senha);

        props.acaoBotaoEntrar(email, senha)
        .then((acao) => {
            console.log("A ação recebida é os dados do usuario: ", acao);
            setMensagem(" ");
			console.log("Usuario e-mail: ", acao.data().email);
			if (acao.data().email === 'teste@email.com') {
				props.navigation.replace('Menu');
			} else {
				props.navigation.replace('MenuMorador');
			}
            
        })
        .catch( erro => {
            setProcessando(false);
            setMensagem(mensagensDeErro(erro.code));	
        });	
    }

    function mensagensDeErro (codigoErro) {
		switch(codigoErro) {
			case "auth/user-not-found":
				return "E-mail não encontrado";
			case "auth/wrong-password":
				return "Senha incorreta";
			default:
				"Erro ao realizar login";
		}
	}

    function carregaBotao() {
		if (processando)
			return <ActivityIndicator size="large" color="#0000ff"/>;

		return (
			<BotaoPrincipal textoBotao="Entrar" 
				onPress = { evento =>
						entrar(evento)}                   

					/>  
		)
	}

    function exibeMensagem() {		
		if (!mensagem) 
			return null;

		return(
			<View>
				<Text style = {estilo.mensagemDeErro}> {mensagem} </Text>
			</View>
		)

	}
		
    return(
        <KeyboardAvoidingView style={estilo.container} behavior="position">
            <Text style={estilo.titulo}>Vila Bela</Text>
            <CampoInput 
                descricaoLabel="E-mail" 
                expressao="exemplo@email.com"
                value={email} 
                onChangeText={ (valor) =>{
                    console.log(valor);
                    setEmail(valor)}}
                keyboardType="email-address"
            />
            <Text style={estilo.descricao}> Senha </Text>
				<TextInput 
                    style={estilo.campoInput}
					secureTextEntry={true}
					placeholder="Digite a senha"
					onChangeText={ (valor) =>{
                        console.log(valor);
                        setSenha(valor)}}
				/>

            { exibeMensagem()}
            { carregaBotao () }            
            
            <BotaoSecundario textoBotao="Cadastrar"
                onPress= {() => {props.navigation.navigate('Cadastro')} }
            />
        </KeyboardAvoidingView>
    )
}

const estilo = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: '#9999A1'
	},
    titulo: {
		marginVertical: 105,
		textAlign: 'center',
		fontSize: 35,
		fontWeight: 'bold',        
	},
    descricao: {
		marginLeft: 12,
		fontSize: 20,
		marginBottom: 3,
	},
	campoInput: {
		borderStyle: 'solid',
		borderColor: '#868484',
		borderWidth: 1,
		borderRadius: 5,
		marginHorizontal: 15,
		fontSize: 22,
		marginBottom: 15,
		backgroundColor:'#EAEAEA',			
	}, 
    mensagemDeErro: {
        fontSize: 15,
        color: '#ab0000',
        marginLeft: 12
    }
})



export default connect(null, {acaoBotaoEntrar})(Login);