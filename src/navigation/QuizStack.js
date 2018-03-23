import { StackNavigator } from 'react-navigation';
import QuizQuestionPage from '../pages/quiz/QuizQuestionPage';

export default StackNavigator(
  {
    QuizQuestion: {
      screen: QuizQuestionPage,
    },
  },
  {
    initialRouteName: 'QuizQuestion',
    navigationOptions: {
      headerMode: 'none',
    },
  },
);
