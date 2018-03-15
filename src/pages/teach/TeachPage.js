import React from 'react';
import { TabBarBottom, TabNavigator } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import variables from '../../theme/native-base-theme/variables/platform';
import TeachInstructionPage from '../teach-instruction/TeachInstructionPage';
import MyRecordingsPage from '../my-recordings/MyRecordingsPage';

// class LearnPage extends Component<{ principle: Principle }> {
//   render() {
//     return (
//
//     );
//   }
// }

export default TabNavigator(
  {
    Instruction: {
      screen: TeachInstructionPage,
    },
    MyRecordings: {
      screen: MyRecordingsPage,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Instruction') {
          iconName = 'info';
        } else if (routeName === 'MyRecordings') {
          iconName = 'video-library';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <MaterialIcon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: variables.brandPrimary,
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true,
  },
);
