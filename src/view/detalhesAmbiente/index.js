import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import DetalheAmbienteCard from "../../components/detalheAmbienteCard";
import BotaoPrincipal from "../../components/botaoPrincipal";
import BotaoSecundario from "../../components/botaoSecundario";

export default function DetalhesAmbiente(props) {
 
    const { ambiente } = props.route.params;  
    //const navigation = useNavigation();  
        
    return (
        <View>                
            <ScrollView>                           
                <DetalheAmbienteCard ambiente = { ambiente }/>   
                <BotaoPrincipal textoBotao="Editar" 
                    onPress= {() => {
                        console.log("Valor do ambiente em detalhe: ", ambiente);
                        props.navigation.navigate('Cadastro de Ambiente', {ambienteAEditar: ambiente})} }
            />
                <BotaoSecundario textoBotao="Excluir"
                    onPress = { evento =>
                        console.log("Deletar")}
                />
            </ScrollView>
        </View>
    )    

}

