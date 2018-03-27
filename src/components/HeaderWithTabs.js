import React from 'react';
import { Platform } from 'react-native';
import { Header, Left, Button, Icon, Body, Title } from 'native-base';
import { NavigationActions } from 'react-navigation';

const platform = Platform.OS;

type Props = {
  navigation: any,
  params: any,
};

export default class HeaderWithTabs extends React.Component<Props> {
  goBack = () => {
    this.props.navigation.popToTop();
  };

  render() {
    return (
      <Header hasTabs>
        <Left style={{ flex: 0, marginRight: platform === 'ios' ? 0 : 24 }}>
          <Button transparent onPress={this.goBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: '#fff' }}>{this.props.params.principle.name || '...'}</Title>
        </Body>
      </Header>
    );
  }
}
