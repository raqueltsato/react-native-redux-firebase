import * as React from "react";
import { connect } from "react-redux";
import { View, 
    StyleSheet, 
    ScrollView, 
    Text, 
    ActivityIndicator, 
    Image, 
    TouchableOpacity,
    Alert, 
    PermissionsAndroid } from "react-native";
import firebase from '@react-native-firebase/app';
import { RNCamera } from 'react-native-camera';
import { useCamera } from "react-native-camera-hooks";
import CameraRollPicker from "react-native-camera-roll-picker";
import ImgTpBase64 from "react-native-image-base64";

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
    const [usoCamera, setUsoCamera] = React.useState(false);
    const [usoGaleria, setUsoGaleria] = React.useState(false);
    
    const ref = React.createRef();

    //Caso seja uma tela de Edição, os campos serão preenchidos com os dados
    React.useEffect(() => {        
        //console.log("Route: ", route)
        const {params} = route;
        console.log("Params: ", params);
        if (params && params.ambienteAEditar) {
            console.log("Olha o parametro: ", params.ambienteAEditar);
            preenche_todos_os_campos(params.ambienteAEditar)
        } else {
            limpa_formulario();
        }
    }, [route.params])
    

    //firebase.initializeApp(firebaseConfig);
    //const db = firebase.firestore();

    function cadastrarAmbiente() {
        setProcessando(true);
        if (validaCampos()) {            
            salvaAmbienteNoBD(cadastroAmbiente)        
            .then(() => {            
                 navigation.goBack();
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
    
    function capturaPelaCamera() {
        return (
            <View>
                <RNCamera 
                    ref={ref}
                    style={estilo.previa}                
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permissão para usar a câmera',
                        message: 'Você permite acessar a sua câmera?',
                        buttonPositive: 'Aceito',
                        buttonNegative: 'Não aceito'
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permissão gravar áudio',
                        message: 'Você permite acessar o seu microfone?',
                        buttonPositive: 'Aceito',
                        buttonNegative: 'Não aceito'
                    }}
                />
                <View>
                    <TouchableOpacity
                    style={estilo.captura}
                    onPress={takePicture}>
                        <Text>Capturar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) 
    }

    const takePicture = async() => {
        if (ref.current) {
            const opcoes = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true };
            const data = await ref.current.takePictureAsync(opcoes);
            console.log("Console do data.uri:", data.uri);  

            if (data) {
                props.pegaValorDoCampo('img', data.base64);
                setUsoCamera(false);

            }
        }
    };

    function capturaPelaGaleria() {
        requisitaAcessoAGaleria();

        return (
            <CameraRollPicker
                maximum={1}
                selectSingleItem={true}
                callback={(volta) => {
                   if (volta.length > 0) {
                       console.log("Valor da volta: ", volta);
                       ImgTpBase64.getBase64String(volta[0].uri)
                       .then(stringConvertida => {
                           console.log("String convertida: ", stringConvertida);
                           pegaValorDoCampo('img', stringConvertida);
                       })
                       .catch(erro => {
                           console.log("Deu erro na volta: ", erro);
                       })
                   } 
                   setUsoGaleria(false);
                }}
                />
        )
    }

    async function requisitaAcessoAGaleria() {
        try{
            const permissao = await PermissionsAndroid
            .request( PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
            if (permissao !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert("Permissao de acesso negada");
            }
        } catch(erro) {
            console.log("Erro ao acessar GAleria: ", erro);
        }
    }
    
    function formularioCadastro() {
        return (
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
                {/*<CampoInput             
                    descricaoLabel="Imagem" expressao="Imagem" 
                    value= { cadastroAmbiente.img}
                    onChangeText= { (valor) => {                
                        pegaValorDoCampo('img', valor);
                    }}            							
                />*/}
                <Text style={estilo.imagemLabel}>Imagem</Text>
                {
                    cadastroAmbiente.img ?
                    <Image 
                        source={{uri: `data:image/jpeg;base64,${cadastroAmbiente.img}`}} 
                        style={estilo.imagem}                        
                    />
                    : null
                }
                <TouchableOpacity 
                    onPress = {() => {
                        Alert.alert(
                            'Captura de imagem',
                            'Selecione a origem da imagem:',
                            [
                                {
                                    text: 'Câmera',
                                    onPress: () => {
                                        console.log("Apertou a camera");
                                        setUsoCamera(true);
                                    }
                                },
                                {
                                    text: 'Galeria',
                                    onPress: () => {
                                        setUsoGaleria(true);
                                    }
                                }
                            ]
                        )
                    }}
                    style={estilo.areaCapturaImagem}                    
                > 
                    <Text style={estilo.botaoCapturaImagem}>Capturar Imagem</Text>
                </TouchableOpacity> 
                { mensagemValidacao ? <Text style= {estilo.mensagemValidacao}>{mensagemValidacao}</Text> : <Text></Text>
                }
                {carregaBotao()}
        </ScrollView>
        </View>
        )
    } 

    
    if(usoGaleria) {
        return capturaPelaGaleria();
    }
    if (usoCamera) {
        return capturaPelaCamera();
    } 
    return formularioCadastro();
            
    
    
    
}

const estilo = StyleSheet.create({
    container: {
        paddingTop: 5,
        backgroundColor: '#F0F0F0',
    },
    mensagemValidacao: {
        fontSize: 15,
        color: '#ab0000',
        marginLeft: 12
    },
    imagemLabel: {
        marginLeft: 15,
        fontSize: 20,
        marginBottom: 3,
    },
    areaCapturaImagem:{       
        marginLeft: 15,
        
        marginBottom: 3,       
    },
    botaoCapturaImagem: {
        color: 'blue',
        fontSize: 20,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    }, 
    imagem:{

    },
    previa:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    captura:{
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 15,
        alignSelf: 'center',
        margin: 20,
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