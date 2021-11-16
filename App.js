import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './src/reducers';

import { composeWithDevTools } from 'remote-redux-devtools';

import Login from './src/view/login';
import Menu from './src/components/menu';
import CadastroUsuario from './src/view/cadastroUsuario';
import DetalhesAmbiente from './src/view/detalhesAmbiente';
import MenuMorador from './src/components/menuMorador';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const enhance = composeWithDevTools({
  realtime: true,
  host: 'localhost',
  port: 8000
});

const store = createStore(rootReducer, enhance(applyMiddleware(reduxThunk)));



const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>      
          <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={ {headerShown: false} } />
            <Stack.Screen name="Menu" component={Menu} options={ {headerShown: false} } />
            <Stack.Screen name="Cadastro" component={CadastroUsuario} options= {{headerShown: false}}  />
            <Stack.Screen 
                name="Detalhes do Ambiente" 
                component={DetalhesAmbiente} 
                options={{ title: 'Detalhes do Ambiente'} }
            />
            <Stack.Screen name="MenuMorador" component={MenuMorador} options={ {headerShown: false} } />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
    
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
