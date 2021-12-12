import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { connect } from 'react-redux';

import ListagemMorador from '../../view/listagemMorador';
import { HeaderBackground } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import ReservasMorador from '../../view/reservasMorador';
import {acaoBotaoSair} from '../../actions';

Icon.loadFont();

const Drawer = createDrawerNavigator();

function MenuMorador(props) {
   
    return(
        <Drawer.Navigator 
            initialRouteName= "InícioMorador"
            drawerStyle={styles.barraLateral}
            drawerContentOptions={{labelStyle: {"color": "#fff", fontSize: 18}}}   
            drawerContent={propsInterno => 
                <AreaDeLogout {...propsInterno} {...props}  />               
            
            }            

        >
            <Drawer.Screen 
                name= "InícioMorador" 
                component={ListagemMorador} 
                options={ {title: 'Início', drawerIcon: config => <Icon name="home" size={30} color="#fff"/>} }
            />   
            <Drawer.Screen 
                name= "ReservasMorador" 
                component={ReservasMorador} 
                options={ {title: 'Minhas Reservas', drawerIcon: config => <Icon name="calendar-check-o" size={28} color="#fff"/>} }
            />         

        </Drawer.Navigator>
    )
}

function AreaDeLogout(props, routes) {    
    function botaoSair() {
        props.acaoBotaoSair().then(()=> {
            props.navigation.replace('Login');
        })
        .catch( erro => {
            console.log("Erro no retorno no componente: ", erro);	
        });	
    }
    
    return(
        <DrawerContentScrollView {...props}>
            <PerfilDoUsuario {...props} />
            <DrawerItemList {...props} />
            <DrawerItem label="Sair" onPress={() => {botaoSair()}} labelStyle={ {color: '#fff', fontSize: 18}} icon={() => <Icon name="sign-out" size={30} color="#fff"/>} />    
        </DrawerContentScrollView>
    )
}

function PerfilDoUsuario(props) {   
    
    return(
        <TouchableOpacity onPress={()=>{props.navigation.navigate("InícioMorador")}}>
            <View style={styles.container}>                
                <View style={styles.containerDoTexto}>
                    <Text style={styles.textoNome}>{props.usuario.data().nome}</Text>
                    <Text style={styles.textoEmail}>{props.usuario.data().email}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
    containerDoTexto: {
        marginTop: 15,
        alignItems: 'center',
       
    },
    textoEmail: {
        color: '#fff',
        fontSize: 14
    },
    textoNome: {
        color: '#fff',
        fontSize: 18
    },
    barraLateral: {
        width: 310,
        backgroundColor: '#7C90B8'   
    }, 
    container: {
        alignItems: 'center',
        height: 165
    }
})

const mapDispatchToProps = {
    acaoBotaoSair
}

const mapStateToProps = (state) => {  
    return ({
        usuario: state.usuario,
       
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuMorador);
