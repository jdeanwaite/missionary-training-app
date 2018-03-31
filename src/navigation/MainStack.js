// @flow
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  TabBarTop,
  Header,
  SwitchNavigator,
} from 'react-navigation';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import HomePage from '../pages/home/HomePage';
import QuizQuestionPage from '../pages/quiz/QuizQuestionPage';
import DoctrinePage from '../pages/doctrine/DoctrinePage';
import TeachInstructionPage from '../pages/teach-instruction/TeachInstructionPage';
import NotesPage from '../pages/notes/NotesPage';
import VideosPage from '../pages/videos/VideosPage';
import ScripturesPage from '../pages/scriptures/ScripturesPage';
import QuizPage from '../pages/quiz/QuizPage';
import HeaderWithTabs from '../components/HeaderWithTabs';
import variables from '../theme/native-base-theme/variables/platform';
import MyRecordingsPage from '../pages/my-recordings/MyRecordingsPage';
import DismissableStackNavigator from './DismissableStackNavigation';
import QuizSummaryPage from '../pages/quiz/QuizSummaryPage';
import NewNotePage from '../pages/notes/NewNotePage';
import NewRecordingPage from '../pages/recording/NewRecordingPage';
import RecordPage from '../pages/recording/RecordPage';
import ReviewRecordingInstructionPage from '../pages/recording/ReviewRecordingInstructionPage';
import ViewRecordingPage from '../pages/recording/ViewRecordingPage';
import ShareRecordingPage from '../pages/recording/ShareRecordingPage';
import DismissableTabNavigator from './DismissableTabNavigation';
import SignIn from '../pages/authentication/SignIn';
import { AuthState } from '../types/AuthState';

const LearnTabNavigator = TabNavigator(
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
    tabBarPosition: 'bottom',
    initialRouteName: 'Doctrine',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }: any) => {
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
    animationEnabled: false,
    swipeEnabled: false,
  },
);

const TeachTabNavigator = TabNavigator(
  {
    Instruction: {
      screen: TeachInstructionPage,
      navigationOptions: {
        tabBarLabel: 'How To Teach',
      },
    },
    MyRecordings: {
      screen: MyRecordingsPage,
      navigationOptions: {
        tabBarLabel: 'My Recordings',
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    initialRouteName: 'Instruction',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }: any) => {
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
    animationEnabled: false,
    swipeEnabled: false,
  },
);

const PrincipleTabNavigator = DismissableTabNavigator(
  {
    Learn: {
      screen: LearnTabNavigator,
    },
    Teach: {
      screen: TeachTabNavigator,
      navigationOptions: {
        tabBarLabel: 'Teach',
      },
    },
    Notes: {
      screen: NotesPage,
    },
  },
  {
    tabBarPosition: 'top',
    tabBarComponent: TabBarTop,
    initialRouteName: 'Learn',
    swipeEnabled: false,
    animationEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#00BCD4',
      },
      indicatorStyle: {
        backgroundColor: variables.brandInfo,
        height: 2,
      },
    },
    navigationOptions: ({ navigation, screenProps }) => {
      const { params } = navigation.state;

      return {
        header: (
          <HeaderWithTabs navigation={navigation} params={params} screenProps={screenProps} />
        ),
      };
    },
  },
);

const QuizQuestionStackNavigator = DismissableStackNavigator(
  {
    QuizQuestion: { screen: QuizQuestionPage },
    QuizSummary: { screen: QuizSummaryPage },
  },
  {
    navigationOptions: {
      header: null,
      headerMode: 'none',
    },
  },
);

const NewRecordingStackNavigator = DismissableStackNavigator(
  {
    NewRecording: {
      screen: NewRecordingPage,
      navigationOptions: ({ screenProps }) => ({
        headerTitle: 'Practice Teaching',
        headerLeft: (
          <TouchableOpacity onPress={() => screenProps.dismiss()}>
            <Text style={{ paddingLeft: 16, color: 'white' }}>Close</Text>
          </TouchableOpacity>
        ),
        headerRight: null,
      }),
    },
    Record: {
      screen: RecordPage,
      navigationOptions: {
        header: null,
      },
    },
    ReviewRecordingInstruction: {
      screen: ReviewRecordingInstructionPage,
      navigationOptions: {
        headerTitle: 'Video Review',
      },
    },
    ViewRecording: {
      screen: ViewRecordingPage,
      navigationOptions: {
        header: null,
      },
    },
    ShareRecording: {
      screen: ShareRecordingPage,
      navigationOptions: {
        headerTitle: 'Finish',
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#00BCD4',
      },
      headerTintColor: '#ffffff',
    },
  },
);

const ReviewRecordingStackNavigator = DismissableStackNavigator(
  {
    ReviewRecordingInstruction: {
      screen: ReviewRecordingInstructionPage,
      navigationOptions: {
        headerTitle: 'Video Review',
      },
    },
    ViewRecording: {
      screen: ViewRecordingPage,
      navigationOptions: {
        header: null,
      },
    },
    ShareRecording: {
      screen: ShareRecordingPage,
      navigationOptions: {
        headerTitle: 'Finish',
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#00BCD4',
      },
      headerTintColor: '#ffffff',
    },
  },
);

const createMainStack = authState =>
  SwitchNavigator(
    {
      unauthenticated: {
        screen: StackNavigator(
          {
            SignIn: {
              screen: SignIn,
              navigationOptions: {
                headerTitle: 'Sign In',
              },
            },
          },
          {
            navigationOptions: {
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#ffffff',
            },
          },
        ),
      },
      authenticated: {
        screen: StackNavigator(
          {
            Home: {
              screen: HomePage,
              navigationOptions: {
                headerTitle: 'Missionary Training App',
              },
            },
            Principle: {
              screen: PrincipleTabNavigator,
              // navigationOptions: ({ navigation, sreenProps }) => ({
              //   headerLeft: (
              //     <Icon
              //       name="arrow-left"
              //       onPress={() => {
              //         navigation.goBack();
              //       }}
              //     />
              //   ),
              // }),
            },
          },
          {
            initialRouteName: 'Home',
            mode: 'card',
            navigationOptions: {
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#ffffff',
            },
          },
        ),
      },
      quizQuestionFlow: {
        screen: QuizQuestionStackNavigator,
        navigationOptions: {
          header: null,
          headerMode: 'none',
        },
      },
      newNoteFlow: {
        screen: new DismissableStackNavigator({
          NewNote: {
            screen: NewNotePage,
            navigationOptions: {
              headerTitle: 'New Note',
              headerStyle: {
                backgroundColor: '#00BCD4',
              },
              headerTintColor: '#ffffff',
            },
          },
        }),
      },
      newRecordingFlow: {
        screen: NewRecordingStackNavigator,
        navigationOptions: {
          header: null,
        },
      },
      reviewRecordingFlow: {
        screen: ReviewRecordingStackNavigator,
        navigationOptions: {
          header: null,
        },
      },
    },
    {
      initialRouteName: authState === 'signedIn' ? 'authenticated' : 'unauthenticated',
      headerMode: 'none',
      mode: 'modal',
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#00BCD4',
        },
        headerTintColor: '#ffffff',
      },
    },
  );

const MainStack = (props: { authState: AuthState }) => {
  const Stack = createMainStack(props.authState);
  return <Stack />;
};

const mapStateToProps = state => ({
  authState: state.authState,
});

export default connect(mapStateToProps)(MainStack);
