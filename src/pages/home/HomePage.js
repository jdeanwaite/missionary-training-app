// @flow

import React, { Component } from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Auth, Logger } from 'aws-amplify';
import { Container, Content } from 'native-base';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import LessonNavigationGroup from './LessonList';
import type { Lesson } from '../../types/Lesson';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { updateAuthState } from '../../app/reducer';
import AllLessonsQuery from '../../queries/AllLessonsQuery';

const principle1 = require('../../../scratches/principle.json');

const logger = new Logger('HomePage');

class HomePage extends Component<{ navigation: any, updateAuthState: any, lessons: Lesson[] }> {
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
    console.log('home props', this.props);
    const { lessons } = this.props;
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

const HomePageWithState = connect(mapStateToProps, mapDispatchToProps)(HomePage);

const HomePageWithData = compose(graphql(AllLessonsQuery, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: props => ({
    lessons: props.data.allLessons,
  }),
}))(HomePageWithState);

export default HomePageWithData;
