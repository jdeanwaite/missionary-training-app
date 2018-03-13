// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, H2 } from 'native-base';
import PrincipleTile from './PrincipleTile';
import type { Lesson } from '../../types/Lesson';

type Props = {
  lesson: Lesson,
}

class LessonNavigationGroup extends Component<Props> {
  render() {
    const principles = this.props.lesson.principles;

    return (
      <View style={styles.container}>
        <H2 style={styles.title}>{this.props.lesson.name}</H2>
        <View style={styles.tileGroup}>
          {
            principles.map(principle =>
              <PrincipleTile key={principle.name} principle={principle} />)
          }
        </View>
      </View>
    );
  }
}

export default LessonNavigationGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, .54)',
    fontWeight: '500',
  },
  tileGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flex: 1,
    minHeight: 100,
    paddingBottom: 32,
  },
});
