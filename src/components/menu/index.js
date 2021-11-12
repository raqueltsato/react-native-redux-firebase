import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { connect } from 'react-redux';

import ListagemAdministrador from '../../view/listagemAdministrador';
import novoAmbiente from '../../view/novoAmbiente';
import { HeaderBackground } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import { createIconSetFromFontello } from 'react-native-vector-icons';

Icon.loadFont();

const Drawer = createDrawerNavigator();


function Menu(props) {
    //console.log("props menu:", props.usuario);
  React.useEffect(() => {     
      
        props.navigation.setParams({usuario: props.usuario._data.nome});
      
  }, [usuario])
    const {nome, email} = props.usuario._data;
    const [usuario, setUsuario] = React.useState(nome);    
    console.log("Route de menu: ", props.route);
    console.log("Navigation de menu: ", props.navigation);
    
    console.log("Props navigation de menu: ", props.navigation);
    //setUsuario(nome);
    //navigation.setParams({nome, email});
    return(
        <Drawer.Navigator 
            initialRouteName= "Início"
            drawerStyle={styles.drawerStyle}
            drawerContentOptions={{labelStyle: {"color": "#fff", fontSize: 18}}}   
            drawerContent={props => {
                <CustomDrawerContent {...props} />
                {console.log("rops de Custom::: ", props)}
            }
            }            

        >
            <Drawer.Screen 
                name= "Início" 
                component={ListagemAdministrador} 
                options={ {drawerIcon: config => <Icon name="home" size={30} color="#fff"/>} }
            />            
            <Drawer.Screen 
                name= "Cadastro de Ambiente"
                component={novoAmbiente} 
                options={ {drawerIcon: config => <Icon name="plus-circle" size={30} color="#fff"/>} }
            />
        </Drawer.Navigator>
    )
}

function CustomDrawerContent(props, routes) {
    //console.log("CustomDrawer:", props);
    
    return(
        <DrawerContentScrollView {...props}>
            <PerfilDoUsuario {...props} />
            <DrawerItemList {...props} />
            <DrawerItem label="Sair" onPress={() => {props.navigation.popToTop()}} labelStyle={ {color: '#fff', fontSize: 18}} icon={() => <Icon name="sign-out" size={30} color="#fff"/>} />    
        </DrawerContentScrollView>
    )
}

function PerfilDoUsuario({navigation}, props) {
    console.log("navigation ", navigation.nome);
    //const [usuario, setUsuario] = React.useState("");
    
    
    return(
        <TouchableOpacity onPress={()=>{props.navigation.navigate("Home")}}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: "https://randomuser.me/api/portraits/men/33.jpg"}} style={styles.imageStyle} />
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.drawerText}>test</Text>
                    <Text style={styles.drawerTextSmall}>Open profile</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        elevation: 6
    },
    containerText: {
        alignItems: 'center'
    },
    drawerTextSmall: {
        color: '#fff',
        fontSize: 12
    },
    drawerText: {
        color: '#fff',
        fontSize: 18
    },
    imageStyle: {
        width: 100,
        height: 100
    },
    drawerStyle: {
        width: 310,
        backgroundColor: '#7C90B8'   
    }, 
    container: {
        alignItems: 'center',
        height: 165
    }
})

const mapStateToProps = (state) => {   
    //console.log("mapstatetopros: ", state.usuario);
    return ({
        usuario: state.usuario,
       
    })
}

export default connect(mapStateToProps, null)(Menu);
