import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content } from 'native-base';
import { MarkdownView } from 'react-native-markdown-view';

export default class TeachInstructionPage extends Component<{
  screenProps: {
    teach: {
      instruction: {
        markdown: string,
      },
    },
  },
}> {
  dummy = () => {};
  render() {
    return (
      <Content padder>
        <MarkdownView style={styles.markdownContainer} styles={styles.markdown}>
          {this.props.screenProps.teach.instruction.markdown}
        </MarkdownView>
      </Content>
    );
  }
}

const styles = {
  markdownContainer: {
    paddingBottom: 24,
  },
  markdown: {
    heading: {
      fontWeight: '400',
    },
    heading1: {
      fontSize: 24,
    },
    heading2: {
      fontSize: 20,
      fontWeight: '500',
    },
    paragraph: {
      fontSize: 16,
    },
  },
};
