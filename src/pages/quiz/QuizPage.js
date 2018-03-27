import React, { Component } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { View, Button, H1, H3, Text } from 'native-base';
import { CircularProgress } from 'react-native-circular-progress';
import { withNavigation } from 'react-navigation';
import variables from '../../theme/native-base-theme/variables/platform';

class QuizPage extends Component<{
  navigation: any,
}> {
  constructor(props) {
    super(props);
    this.getBestScore();
  }
  state = {
    bestScore: 0,
  };

  getBestScore = async () => {
    const quizScores = await getQuizScores();

    console.log(quizScores);

    let bestScore = 0;
    quizScores.forEach((score) => {
      if (score > bestScore) {
        bestScore = score;
      }
    });

    this.setState({
      bestScore,
    });
  };

  saveScore = async (score) => {
    const quizScores = await getQuizScores();
    await setQuizScores([...quizScores, score || 0]);
    await this.getBestScore();
  };

  clearScores = async () => {
    await setQuizScores([]);
    this.getBestScore();
  };

  startQuiz = () => {
    const { navigation } = this.props;
    const { quiz } = this.props.navigation.state.params.principle;

    navigation.navigate('quizQuestionFlow', {
      index: 1,
      questions: quiz.questions,
    });
  };

  render() {
    const tintColor = this.state.bestScore >= 100 ? variables.brandSuccess : '#FFC400';
    let prompt;
    if (this.state.bestScore === 0) {
      prompt = "You haven’t taken this quiz yet. Let's see what you can get!";
    } else if (this.state.bestScore < 100) {
      prompt = 'Try and beat your best score! Take the quiz again.';
    } else {
      prompt = 'Great job! Need a refresher? Take the quiz again!';
    }
    return (
      <View style={styles.container}>
        <H3>Your Best Score</H3>
        <CircularProgress
          size={160}
          width={12}
          fill={this.state.bestScore}
          tintColor={tintColor}
          rotation={0}
          backgroundColor="#BCBCBC"
        >
          {fill => <H1 style={styles.score}>{fill}</H1>}
        </CircularProgress>
        <Text style={styles.prompt}>{prompt}</Text>
        <View>
          <Button style={{ minWidth: 200, justifyContent: 'center' }} info onPress={this.startQuiz}>
            <Text>Take Quiz</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default withNavigation(QuizPage);

async function getQuizScores(): number[] {
  let quizScores;
  try {
    const json = await AsyncStorage.getItem('@LocalStore:quizScores');
    if (json && typeof json === 'string') {
      quizScores = JSON.parse(json);
    }
  } catch (error) {
    console.log('error fetching quizScores');
    console.log(error);
  }
  return quizScores || [];
}

async function setQuizScores(scores: number[]) {
  try {
    await AsyncStorage.setItem('@LocalStore:quizScores', JSON.stringify(scores));
  } catch (error) {
    console.log('error saving quizScores');
    console.log(error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 24,
  },
  score: {
    fontSize: 32,
    fontWeight: 'normal',
    lineHeight: 38,
    color: 'rgba(0, 0, 0, .54)',
  },
  prompt: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, .54)',
    textAlign: 'center',
  },
});
