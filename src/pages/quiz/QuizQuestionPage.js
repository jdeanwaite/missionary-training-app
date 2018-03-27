import React, { Component } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { H1, H3, Content, Container, Button, View, Text } from 'native-base';
import MultipleChoiceQuestion from '../../components/MultipleChoiceQuestion';
import FreeResponse from '../../components/FreeResponse';
import variables from '../../theme/native-base-theme/variables/platform';

type Props = {
  navigation: {
    state: {
      params: {
        index: number,
        questions: any,
        responses: Object[],
      },
      key: string,
    },
    navigate: any,
    dispatch: any,
    dismiss: any,
  },
  screenProps: any,
};

export default class QuizQuestionPage extends Component<Props> {
  state = {
    submitted: false,
    selectedAnswerId: null,
    freeResponseText: null,
  };

  onNextPressed = () => {
    const { index, questions, responses } = this.props.navigation.state.params;

    if (this.state.submitted) {
      const newResponses = [
        ...(responses || []),
        {
          index,
          correct: this.answerCorrect(),
        },
      ];

      if (questions.length > index) {
        this.props.navigation.navigate('QuizQuestion', {
          index: index + 1,
          questions,
          responses: newResponses,
        });
      } else {
        this.props.navigation.navigate('QuizSummary', {
          responses: newResponses,
        });
      }
    } else {
      this.setState({
        submitted: true,
      });
    }
  };

  onQuitPressed = () => {
    this.props.screenProps.dismiss();
  };

  onTextChanged = (text: string) => {
    if (!this.state.submitted) {
      this.setState({
        freeResponseText: text,
      });
    }
  };

  onAnswerSelect = (id) => {
    if (!this.state.submitted) {
      this.setState({
        selectedAnswerId: id,
      });
    }
  };

  answerCorrect = () => {
    const { index, questions } = this.props.navigation.state.params;
    const { selectedAnswerId } = this.state;
    const question = questions[index - 1];

    return question.type === 'free_response' || selectedAnswerId === question.correctAnswerId;
  };

  render() {
    const { index, questions } = this.props.navigation.state.params;
    const question = questions[index - 1];
    const nextButtonText = questions.length > index ? 'Next' : 'Finish';
    const nextButtonActive = !!this.state.selectedAnswerId || !!this.state.freeResponseText;

    const correct = this.answerCorrect() || false;

    let feedbackText = '';
    if (question.type === 'free_response') {
      feedbackText = 'Great!';
    } else if (question.type === 'multiple_choice' && correct) {
      feedbackText = 'Correct!';
    } else {
      feedbackText = 'Sorry, you missed that one!';
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <StatusBar backgroundColor="#0097A7" barStyle="dark-content" />
          <Content padder>
            <H1 style={styles.title}>Question {index}</H1>
            <H3 style={styles.question}>{question.question}</H3>
            {question.type === 'multiple_choice' ? (
              <MultipleChoiceQuestion
                question={question}
                selectedAnswerId={this.state.selectedAnswerId}
                answerSelected={this.onAnswerSelect}
                disabled={this.state.submitted}
              />
            ) : (
              <FreeResponse
                text={this.state.freeResponseText}
                textChanged={this.onTextChanged}
                disabled={this.state.submitted}
              />
            )}
            {this.state.submitted && (
              <View
                style={[styles.feedback, correct ? styles.feedbackSuccess : styles.feedbackFailure]}
              >
                <Text
                  style={[
                    styles.feedbackText,
                    correct ? styles.feedbackTextSuccess : styles.feedbackTextFailure,
                  ]}
                >
                  {feedbackText}
                </Text>
              </View>
            )}
          </Content>
          <View style={styles.actionContainer}>
            <Button dark transparent style={styles.quitButton} onPress={this.onQuitPressed}>
              <Text>Quit</Text>
            </Button>
            <Button
              success={this.state.submitted && correct}
              info={!this.state.submitted || !correct}
              style={styles.nextButton}
              onPress={this.onNextPressed}
              disabled={!nextButtonActive}
            >
              <Text>{nextButtonText}</Text>
            </Button>
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

const styles = {
  title: {
    color: 'rgba(0, 0, 0, .54)',
    marginBottom: 32,
    marginTop: 32,
  },
  question: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  feedback: {
    padding: 24,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackSuccess: {
    borderColor: variables.brandSuccess,
  },
  feedbackFailure: {
    borderColor: variables.brandDanger,
  },
  feedbackText: {
    fontWeight: '700',
  },
  feedbackTextSuccess: {
    color: variables.brandSuccess,
  },
  feedbackTextFailure: {
    color: variables.brandDanger,
  },
  actionContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};
