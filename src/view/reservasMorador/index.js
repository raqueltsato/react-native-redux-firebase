import * as React from 'react';
import {View, Text, Button} from 'react-native';

import HeaderDrawNav from '../../components/headerDrawNav';
import ReservasCardMorador from '../../components/reservasCardMorador';

export default function ReservasMorador({navigation}) {
    return(
        <View>
            <HeaderDrawNav title='Minhas Reservas' navigation={navigation} />
            <ReservasCardMorador />
            <ReservasCardMorador />
            <ReservasCardMorador />
        </View>
    )
}