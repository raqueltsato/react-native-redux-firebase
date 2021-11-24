import * as React from 'react';
import {View, Text, Button, FlatList, ActivityIndicator, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import firebase from '@react-native-firebase/app'

import HeaderDrawNav from '../../components/headerDrawNav';
import AmbienteCard from '../../components/ambienteCard';
import { listaAmbientesDoBD } from '../../actions';
import background from '../../assets/background.jpg';

const largura = Dimensions.get('screen').width;

function ListagemMorador(props) {  

    React.useEffect(() => {
        props.listaAmbientesDoBD();
             
 
    }, [props.ambientes])

    return(
        <ScrollView>
            <HeaderDrawNav title='Vila Bela' navigation={props.navigation} />            
            <Image source={background} style={ estilo.imagemFundo}/>
            <Text style={estilo.bannerTexto}>Usufrua dos benefícios {"\n"}
                do Condomínio {"\n"}
                Vila Bela 
            </Text>

            <Text style={estilo.tituloAmbiente}>AMBIENTES CADASTRADOS</Text>

            <FlatList
                data={props.ambientes}
                renderItem= { ({item}) => {
                return (                    
                    <AmbienteCard 
                        ambiente = {item}
                        redirecionamento = {() => props.navigation.navigate('Detalhes Morador', {ambiente: item})}
                />                   
                )
            }}
            keyExtractor={item => item.id.toString()}
            />
            
        </ScrollView>
    )
}

const estilo = StyleSheet.create({
    imagemFundo: {
        width: '100%',
        height: 578 / 768 * largura,
        
    },
    bannerTexto: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 50,
        fontSize: 25,
        fontWeight: 'bold',
        lineHeight: 40,        
    },
    tituloAmbiente:{
        marginHorizontal: 15,
        fontSize: 21,
        fontWeight: 'bold',
        marginTop: 35,
        marginBottom: 10,
        borderBottomWidth: 1,
    }
})

const mapDispatchToProps = {
    //actions
    listaAmbientesDoBD
}

const mapStateToProps = (state) => {
    const {listaDeAmbientes, cadastroAmbiente} = state;

    /*if (listaDeAmbientes === null) {
        return {ambientes: listaDeAmbientes}
    }

    const chaves = Object.keys(listaDeAmbientes);
    const listaAmbientesComId = chaves.map(chave => {
        return {...listaDeAmbientes[chave], id: chave}
    })
    
    return ({
        usuario: state.usuario,
        ambientes: listaAmbientesComId
    })*/
    return ({
        usuario: state.usuario,
        ambientes: listaDeAmbientes,
        cadastroAmbiente: cadastroAmbiente
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ListagemMorador);