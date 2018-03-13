import React, { Component } from 'react';
import {
  Body, Button, Container, Header, Icon, Left, Right, Tab, Tabs, Text, Title,
  View,
} from 'native-base';
import type { NavigationScreenProp } from 'react-navigation/lib/TypeDefinition';
import LearnPage from '../learn/LearnPage';
import TeachPage from '../teach/TeachPage';
import NotesPage from '../notes/NotesPage';

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
          <Left style={{flex: 0, marginRight: 24}}>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{params.principle.name || '...'}</Title>
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
