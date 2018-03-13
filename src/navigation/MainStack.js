// @flow

import { StackNavigator } from 'react-navigation';
import HomePage from '../pages/home/HomePage';
import PrinciplePage from '../pages/principle/PrinciplePage';

export default StackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        headerTitle: 'Missionary Training App',
      },
    },
    Principle: {
      screen: PrinciplePage,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#00BCD4',
      },
      headerTintColor: '#ffffff',
    },
  },
);
