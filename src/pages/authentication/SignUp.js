/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import React from 'react';
import { View, Text, Item, Input, Button, Content } from 'native-base';
import { Auth, I18n, Logger } from 'aws-amplify';
import { AuthState } from '../../types/AuthState';

const logger = new Logger('SignUp');

const Footer = (props: { onStateChange: (authState: AuthState) => void }) => {
  const { onStateChange } = props;
  return (
    <View style={styles.footer}>
      <Button transparent primary onPress={() => onStateChange('confirmSignUp')}>
        <Text>{I18n.get('Confirm a Code')}</Text>
      </Button>
      <Button transparent primary onPress={() => onStateChange('signIn')}>
        <Text>{I18n.get('Sign In')}</Text>
      </Button>
    </View>
  );
};

export default class SignUp extends React.Component<{}> {
  state = {
    email: null,
    password: null,
    given_name: null,
    family_name: null,
    gender: null,
  };

  signUp() {
    const {
      email, password, given_name, family_name, gender,
    } = this.state;
    logger.debug(`Sign Up for ${email}`);
    Auth.signUp(email, password, given_name, family_name, gender)
      .then((data) => {
        logger.debug(data);
        this.changeState('confirmSignUp', email);
      })
      .catch(err => this.error(err));
  }

  render() {
    const disabled =
      !this.state.email ||
      !this.state.family_name ||
      !this.state.gender ||
      !this.state.given_name ||
      !this.state.password;

    return (
      <Content padder>
        <Item>
          <Input
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
        </Item>
        <Item>
          <Input
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.password}
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
        </Item>
        <Item>
          <Input
            placeholder="First Name"
            autoCapitalize="words"
            autoCorrect={false}
            value={this.state.first_name}
            onChangeText={text => this.setState({ first_name: text })}
          />
        </Item>
        <Item>
          <Input
            placeholder="Last Name"
            autoCapitalize="words"
            autoCorrect={false}
            value={this.state.last_name}
            onChangeText={text => this.setState({ last_name: text })}
          />
        </Item>
        <View>
          <Button block primary disabled={disabled} style={styles.signUp}>
            <Text>Sign Up</Text>
          </Button>
        </View>
        <Footer />
      </Content>
    );
    // return React.createElement(
    //   View,
    //   { style: theme.section },
    //   React.createElement(Header, { theme }, I18n.get('Sign Up')),
    //   React.createElement(
    //     View,
    //     { style: theme.sectionBody },
    //     React.createElement(Username, {
    //       theme,
    //       onChangeText: text => this.setState({ username: text }),
    //     }),
    //     React.createElement(Password, {
    //       theme,
    //       onChangeText: text => this.setState({ password: text }),
    //     }),
    //     React.createElement(Email, {
    //       theme,
    //       onChangeText: text => this.setState({ email: text }),
    //     }),
    //     React.createElement(PhoneNumber, {
    //       theme,
    //       onChangeText: text => this.setState({ phone_number: text }),
    //     }),
    //     React.createElement(Button, {
    //       title: I18n.get('Sign Up'),
    //       onPress: this.signUp,
    //       disabled: !this.state.username || !this.state.password,
    //     }),
    //   ),
    //   React.createElement(Footer, { theme, onStateChange: this.changeState }),
    //   React.createElement(ErrorRow, { theme }, this.state.error),
    // );
  }
}

const styles = {
  signUp: {
    marginTop: 16,
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};
