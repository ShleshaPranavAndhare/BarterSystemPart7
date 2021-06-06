import Raect from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';

export const AppStackNavigator = createStackNavigator({
    ItemDetailsList : {
        screen: HomeScreen,
        navigationOptions : {
            headerShown : false
        }
    },
    RecieverDetails : {
        screen : ItemDetailsScreen,
        navigationOptions : {
            headerShown : false
        }
    },

},
    {
        initialRouteName: 'ItemDetailsList'
    }
)