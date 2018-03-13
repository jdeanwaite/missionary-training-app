import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import PrincipleIcon from './PrincipleIcon';

type Props = {
  principle: {
    name: string
  },
  navigation: any
}

class PrincipleTile extends Component<Props> {
  onPress = () => {
    this.props.navigation.navigate('Principle', { principle: this.props.principle });
  };

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <PrincipleIcon activityScore={0} principleName={this.props.principle.name} />
        <Text style={styles.title}>{this.props.principle.name}</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(PrincipleTile);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
    width: '30%',
  },
  title: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
  },
});
