// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import LessonNavigationGroup from './LessonList';
import type { Lesson } from '../../types/Lesson';

export default class HomePage extends Component<{}> {
  render() {
    const lessons: Lesson[] = [
      {
        name: 'The Restoration',
        principles: [
          {
            name: 'God Is Our Loving Heavenly Father',
          },
        ],
      },
    ];
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          {lessons.map(lesson => <LessonNavigationGroup key={lesson.name} lesson={lesson} />)}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
});
