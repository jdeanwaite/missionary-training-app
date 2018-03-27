import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, H1, View, Button } from 'native-base';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import variables from '../../theme/native-base-theme/variables/platform';

type Props = {
  navigation: {
    state: {
      params: {
        responses: Object[],
      },
    },
  },
  screenProps: any,
};

export default class QuizSummaryPage extends React.Component<Props> {
  static getDerivedStateFromProps(nextProps: Props) {
    const { responses } = nextProps.navigation.state.params;
    if (!responses) {
      return null;
    }

    const numRight = responses.reduce((prev, current) => {
      if (current.correct) {
        return prev + 1;
      }
      return prev;
    }, 0);

    return {
      score: numRight / responses.length * 100,
    };
  }

  state = {
    score: 0,
  };

  finish = () => {
    this.props.screenProps.dismiss();
  };

  render() {
    const tintColor = this.state.score >= 100 ? variables.brandSuccess : '#FFC400';
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <H1 style={styles.title}>Quiz Complete!</H1>
          <AnimatedCircularProgress
            size={160}
            width={12}
            fill={this.state.score}
            tintColor={tintColor}
            rotation={0}
            backgroundColor="#BCBCBC"
          >
            {() => <H1 style={styles.score}>{this.state.score}</H1>}
          </AnimatedCircularProgress>
          <Button block info onPress={this.finish}>
            <Text>Finish</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  score: {
    fontSize: 32,
    fontWeight: 'normal',
    lineHeight: 38,
    color: 'rgba(0, 0, 0, .54)',
  },
  title: {
    color: 'rgba(0, 0, 0, .54)',
  },
});
