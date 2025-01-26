import React from 'react';
import { View, Text } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './screens/Dashboard';
import AddItem from './screens/AddItem';
import { Provider } from 'react-redux';
import store from './store';

type Props = {

}
const Stack = createNativeStackNavigator();
const App = (props: Props) => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    <Stack.Screen name="AddItem" component={AddItem} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
export default App;