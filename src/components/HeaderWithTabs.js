import React from 'react';
import { Platform } from 'react-native';
import { Header, Left, Button, Icon, Body, Title } from 'native-base';

const platform = Platform.OS;

type Props = {
  navigation: any,
  params: any,
};

export default function (props: Props) {
  return (
    <Header hasTabs>
      <Left style={{ flex: 0, marginRight: platform === 'ios' ? 0 : 24 }}>
        <Button transparent onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title style={{ color: '#fff' }}>{props.params.principle.name || '...'}</Title>
      </Body>
    </Header>
  );
}
