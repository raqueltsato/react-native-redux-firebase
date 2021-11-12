import * as React from 'react';
import {View, Text, Button, FlatList, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import firebase from '@react-native-firebase/app'

import HeaderDrawNav from '../../components/headerDrawNav';
import AmbienteCard from '../../components/ambienteCard';
import { listaAmbientesDoBD } from '../../actions';

/*class ListagemAdministrador extends React.Component {

    

    componentDidMount() {
        console.log("Entrei na listagem ");
        this.props.listaAmbientesDoBD();        
        console.log("ComponentDiddMount: ", this.props.ambientes);
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
}*/

function ListagemAdministrador(props) {  

    React.useEffect(() => {
        props.listaAmbientesDoBD();
             
 
    }, [props.ambientes])

    return(
        <View>
            <HeaderDrawNav title='Ambientes Cadastrados' navigation={props.navigation} />
            
            <FlatList
                data={props.ambientes}
                renderItem= { ({item}) => {
                return (                    
                    <AmbienteCard 
                        ambiente = {item}
                        redirecionamento = {() => props.navigation.navigate('Detalhes do Ambiente', {ambiente: item})}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListagemAdministrador);