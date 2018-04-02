// @flow

import React, { Component } from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Auth, Logger } from 'aws-amplify';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import LessonNavigationGroup from './LessonList';
import type { Lesson } from '../../types/Lesson';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { updateAuthState } from '../../app/reducer';

const principle1 = require('../../../scratches/principle.json');

const logger = new Logger('HomePage');

class HomePage extends Component<{ navigation: any, updateAuthState: any }> {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: null,
      headerRight: (
        <TouchableOpacity onPress={params.presentAccountOptions} style={{ paddingRight: 16 }}>
          <Icon name="exit-to-app" size={24} color="white" />
        </TouchableOpacity>
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ presentAccountOptions: this.presentAccountOptions });
  }

  presentAccountOptions = async () => {
    await Auth.signOut();
    this.props.updateAuthState('signedOut');
  };

  render() {
    const lessons: Lesson[] = [
      {
        name: 'The Restoration',
        principles: [principle1],
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

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  updateAuthState: (authState, authData = null) => dispatch(updateAuthState(authState, authData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
