import React, { Component } from 'react';
import { Content } from 'native-base';
import { MarkdownView } from 'react-native-markdown-view';
import { Principle } from '../../types/Lesson';
import defaultCopyFont from '../../theme/text/default-copy-font';

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
      <Content>
        <MarkdownView style={styles.markdownContainer} styles={styles.markdown}>
          {doctrine.markdown}
        </MarkdownView>
      </Content>
    );
  }
}

const styles = {
  markdownContainer: {
    padding: 20,
  },
  markdown: {
    heading: {
      fontWeight: '500',
    },
    heading1: {
      fontSize: 24,
    },
    heading2: {
      fontSize: 20,
      fontWeight: '500',
    },
    paragraph: { ...defaultCopyFont },
    listItem: { marginBottom: 16 },
    listItemNumber: { ...defaultCopyFont },
    listItemBullet: { ...defaultCopyFont },
    listItemOrderedContent: { ...defaultCopyFont, ...{ fontWeight: '500' } },
    listItemUnorderedContent: { ...defaultCopyFont, ...{ fontWeight: '500' } },
  },
};
