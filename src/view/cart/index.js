import * as React from 'react';
import {View, Text, Button} from 'react-native';

import HeaderDrawNav from '../../components/headerDrawNav';

export default function Cart({navigation}) {
    return(
        <View>
            <HeaderDrawNav title='Cart' navigation={navigation} />
            <Text>Tela Cart</Text>
        </View>
    )
}