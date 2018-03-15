import React from 'react';
import { TabBarBottom, TabNavigator } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DoctrinePage from '../doctrine/DoctrinePage';
import VideosPage from '../videos/VideosPage';
import ScripturesPage from '../scriptures/ScripturesPage';
import QuizPage from '../quiz/QuizPage';
import variables from '../../theme/native-base-theme/variables/platform';

// class LearnPage extends Component<{ principle: Principle }> {
//   render() {
//     return (
//
//     );
//   }
// }

export default TabNavigator(
  {
    Doctrine: {
      screen: DoctrinePage,
    },
    Videos: {
      screen: VideosPage,
    },
    Scriptures: {
      screen: ScripturesPage,
    },
    Quiz: {
      screen: QuizPage,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Doctrine') {
          iconName = 'chrome-reader-mode';
        } else if (routeName === 'Videos') {
          iconName = 'ondemand-video';
        } else if (routeName === 'Scriptures') {
          iconName = 'book';
        } else if (routeName === 'Quiz') {
          iconName = 'check-circle';
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
    swipeEnabled: false,
  },
);
