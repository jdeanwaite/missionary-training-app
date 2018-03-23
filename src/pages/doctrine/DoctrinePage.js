import React, { Component } from 'react';
import { Content } from 'native-base';
import { MarkdownView } from 'react-native-markdown-view';
import { Principle } from '../../types/Lesson';

export default class DoctrinePage extends Component<{
  navigation: {
    state: {
      params: {
        principle: Principle,
      },
    },
  },
}> {
  dummy = () => {};
  render() {
    const { doctrine } = this.props.navigation.state.params.principle;

    return (
      <Content padder>
        <MarkdownView style={styles.markdownContainer} styles={styles.markdown}>
          {doctrine.markdown}
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
