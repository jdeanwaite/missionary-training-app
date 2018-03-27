// @flow
import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom, TabBarTop } from 'react-navigation';
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

const PrincipleTabNavigator = TabNavigator(
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
    navigationOptions: ({ navigation }) => {
      const { params } = navigation.state;

      return {
        header: <HeaderWithTabs navigation={navigation} params={params} />,
      };
    },
  },
);

export default StackNavigator(
  {
    main: {
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
          },
          quizQuestionFlow: {
            screen: DismissableStackNavigator(
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
            ),
            navigationOptions: {
              header: null,
              headerMode: 'none',
            },
          },
          NewNote: {
            screen: NewNotePage,
            navigationOptions: {
              headerTitle: 'New Note',
            },
          },
          newRecordingFlow: {
            screen: DismissableStackNavigator(
              {
                NewRecording: {
                  screen: NewRecordingPage,
                  navigationOptions: {
                    headerTitle: 'Practice Teaching Instructions',
                  },
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
            ),
            navigationOptions: {
              header: null,
            },
          },
          reviewRecordingFlow: {
            screen: DismissableStackNavigator(
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
            ),
            navigationOptions: {
              header: null,
            },
          },
        },
        {
          initialRouteName: 'Home',
          mode: 'modal',
          navigationOptions: {
            headerStyle: {
              backgroundColor: '#00BCD4',
            },
            headerTintColor: '#ffffff',
          },
        },
      ),
    },
  },
  {
    initialRouteName: 'main',
    headerMode: 'none',
  },
);
