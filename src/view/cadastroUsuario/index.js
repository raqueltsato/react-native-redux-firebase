import React from 'react';
import { View, 
    Text, 
    SafeAreaView, 
    TextInput, 
    KeyboardAvoidingView, 
    StyleSheet, 
    Dimensions,
    ActivityIndicator 
} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CampoInput from '../../components/campoInput';
import BotaoPrincipal from '../../components/botaoPrincipal';
import BotaoSecundario from '../../components/botaoSecundario';

export default function CadastroUsuario(props) {
    const [nome, setNome] = React.useState("");
    const [apartamento, setApartamento] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [confirmaSenha, setConfirmaSenha] = React.useState("");    
    const [processando, setProcessando] = React.useState(false);
    const [mensagem, setMensagem] = React.useState("");

    function acaoBotaoCadastrar () {        
        setProcessando(true); 
        console.log(nome, apartamento, email, senha, confirmaSenha, mensagem);       
        if (verificaSenha(senha, confirmaSenha)) {
            setMensagem("");
            auth().createUserWithEmailAndPassword(email, senha)
                .then(usuario => {
                    const identificacao = usuario.user.uid;
                    usuario.user.updateProfile({
                        displayName: nome
                    })
                    adicionaUsuarioNoBD(identificacao, nome, email, apartamento)
                })
                .catch(erro => {
                    console.log('Deu erro no cadastro final de login:', erro);
                })
        } 
        
    }

    function adicionaUsuarioNoBD(identificacao, nome, email, apartamento) {        
        firestore().collection('usuarios').doc(identificacao).set({
            nome: nome,
            email: email, 
            apartamento: apartamento
        }).then(() => {
            console.log("Usuario cadastrado no Bd com sucesso");
            props.navigation.navigate('Login');
            
        }).catch(erro => {
            console.log('Algum Erro:', erro);
        }).finally(() => {
            setProcessando(false);
        })         
         
    }

    function verificaSenha (senha, confirmaSenha) {
        if (senha !== confirmaSenha) {
            setMensagem("As senhas não conferem");
            return false;
        }
        return true;
    }

    function exibeMensagem() {		
		if (!mensagem) 
			return null;

		return(
			<View>
				<Text> {mensagem} </Text>
			</View>
		)

	}

    function carregaBotao() {
		if (processando)
			return <ActivityIndicator size="large" color="#0000ff"/>;

		return (
			<BotaoPrincipal textoBotao="Cadastrar" 
				onPress = { evento =>
						acaoBotaoCadastrar(evento)}                  

					/>  
		)
	}
	
    return (
        <SafeAreaView >
            <KeyboardAwareScrollView>              
                <View style={styles.container}>                                 		

                    <CampoInput descricaoLabel="Nome" expressao="Digite seu nome" 
                        value= {nome}
                        onChangeText= { (valor) =>
                            setNome(valor)}
                    />

                    <CampoInput descricaoLabel="Número do apartamento" expressao="101" 
                        value= {apartamento}
                        onChangeText= { (valor) =>
                            setApartamento(valor)}
                        keyboardType = "decimal-pad"
                    />
                    <CampoInput descricaoLabel="E-mail" expressao="exemplo@email.com" 
                        value= {email}
                        onChangeText={ (valor) =>                            
                            setEmail(valor)}
                        keyboardType="email-address"
                        
                    />

                    <Text style={styles.descricao}> Senha </Text>
                    <TextInput style={styles.campoInput} 
                        secureTextEntry={true}
                        placeholder="Digite a senha"
                        onChangeText= { (valor) =>
                            setSenha(valor)}
                    />
                    <Text style={styles.descricao}> Confirme a senha </Text>
                    <TextInput style={styles.campoInput} 
                        secureTextEntry={true}
                        placeholder="Digite a senha novamente"
                        onChangeText= { (valor) =>
                            setConfirmaSenha(valor)}
                    />
                    
                    {exibeMensagem()}
                    {carregaBotao()}
                    
                    <BotaoSecundario textoBotao="Cancelar"
                        onPress= {() => {props.navigation.navigate('Login')} }
                        />   
                
                </View>                       
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )    
}

const styles = StyleSheet.create({    
	container: {
        paddingTop: 15,		
		backgroundColor: '#9999A1',
        height: Dimensions.get('window').height,        
	},
	titulo: {
		marginVertical: 80,
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
    
})
