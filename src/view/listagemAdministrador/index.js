import * as React from 'react';
import {View, Text, Button, FlatList, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import firebase from '@react-native-firebase/app'

import HeaderDrawNav from '../../components/headerDrawNav';
import AmbienteCard from '../../components/ambienteCard';
import { listaAmbientesDoBD } from '../../actions';

class ListagemAdministrador extends React.Component {

    componentDidMount() {
        this.props.listaAmbientesDoBD();
    }
    render(){
        if (this.props.ambientes === null) {
            return <ActivityIndicator />
        }
        return (
            <View>
            <HeaderDrawNav title='Ambientes Cadastrados' navigation={this.props.navigation} />
            
            <FlatList
                data={this.props.ambientes}

                renderItem= { ({item}) => {
                return (                    
                    <AmbienteCard 
                        ambiente = {item}
                        redirecionamento = {() => this.props.navigation.navigate('Detalhes do Ambiente', {ambiente: item})}
                />                   
                )
            }}
            keyExtractor={item => item.id.toString()}
            />            
            
        </View>
        )
    }
}

/*function ListagemAdministrador({navigation, listaAmbientesDoBD}) {    

    const [ambientes, setAmbientes] = React.useState([]);
    var listaAmbientes = [];

    React.useEffect(() => {
        listaAmbientesDoBD();        
        //Verifica em tempo real
        firebase.firestore().collection('ambientes').orderBy('titulo').onSnapshot(valoresRecebidos => {
            let mudancas = valoresRecebidos.docChanges();
            mudancas.forEach(item => {                 
                 listaAmbientes.push({
                    id: item.doc.id,
                    ...item.doc.data()
                })            
            })
            setAmbientes(listaAmbientes);
       })
    }, [])

    return(
        <View>
            <HeaderDrawNav title='Ambientes Cadastrados' navigation={navigation} />
            
            <FlatList
                data={ambientes}
                renderItem= { ({item}) => {
                return (                    
                    <AmbienteCard 
                        ambiente = {item}
                        redirecionamento = {() => navigation.navigate('Detalhes do Ambiente', {ambiente: item})}
                />                   
                )
            }}
            keyExtractor={item => item.id.toString()}
            />
            
        </View>
    )
}*/

const mapDispatchToProps = {
    //actions
    listaAmbientesDoBD
}

const mapStateToProps = (state) => {
    const {listaDeAmbientes} = state;

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
        ambientes: listaDeAmbientes
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ListagemAdministrador);