import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

export default function CampoInput({descricaoLabel, 
                                    expressao, 
                                    value,
                                    onChangeText,                    
                                    keyboardType, 
                                    numberOfLines, 
                                    multiline}) {
    return (
        <View>
            <Text style={styles.descricao}>
                {descricaoLabel}</Text>
            <TextInput style={styles.campoInput} 
                placeholder={expressao}
                value={value}
                onChangeText = {onChangeText}            
                keyboardType = {keyboardType}
                numberOfLines = {numberOfLines}
                multiline = {multiline}
                    />
        </View>
     )
}

const styles = StyleSheet.create({
    descricao: {
        marginLeft: 15,
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
        marginBottom: 10,
        backgroundColor:'#EAEAEA',
        
    }, 
})