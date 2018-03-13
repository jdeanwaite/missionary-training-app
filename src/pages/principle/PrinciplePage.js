import React, { Component } from 'react';
import {
  Body, Button, Container, Header, Icon, Left, Right, Tab, Tabs, Text, Title,
  View,
} from 'native-base';
import { Platform } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation/lib/TypeDefinition';
import LearnPage from '../learn/LearnPage';
import TeachPage from '../teach/TeachPage';
import NotesPage from '../notes/NotesPage';
import type { Principle } from '../../types/Lesson';

const platform = Platform.OS;

type NavigationState = {
  params: {
    principle: Principle
  }
}

type Props = {
  navigation: NavigationScreenProp<NavigationState, *>
}

export default class PrinciplePage extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      header: (
        <Header hasTabs>
          <Left style={{ flex: 0, marginRight: platform === 'ios' ? 0 : 24 }}>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff' }}>{params.principle.name || '...'}</Title>
          </Body>
        </Header>
      ),
    };
  };

  render() {
    const principle = this.props.navigation.state.params.principle;
    console.log('principle', principle);
    return (
      <Container>
        <Tabs initialPage={0}>
          <Tab heading="Learn">
            <LearnPage />
          </Tab>
          <Tab heading="Teach">
            <TeachPage />
          </Tab>
          <Tab heading="Notes">
            <NotesPage />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
