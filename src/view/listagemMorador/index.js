import * as React from 'react';
import {View, Text, Button, FlatList, ActivityIndicator, StyleSheet, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import firebase from '@react-native-firebase/app'

import HeaderDrawNav from '../../components/headerDrawNav';
import AmbienteCard from '../../components/ambienteCard';
import { listaAmbientesDoBD } from '../../actions';

function ListagemMorador(props) {  

    React.useEffect(() => {
        props.listaAmbientesDoBD();
             
 
    }, [props.ambientes])

    return(
        <View>
            <HeaderDrawNav title='Vila Bella' navigation={props.navigation} />            
                <Text>Tela morador </Text>

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
            
        </View>
    )
}

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