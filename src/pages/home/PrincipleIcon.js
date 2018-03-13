import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import { H2 } from 'native-base';

type props = {
  activityScore: number,
  principleName: string
}

class PrincipleIcon extends Component<props> {
  render() {
    const radius = 32;
    const fill = this.props.activityScore || 0;
    const backgroundColor = fill >= 100 ? '#FFC400' : 'rgba(0, 0, 0, .1)';
    const principleLetter = this.props.principleName.substr(0, 1);
    const innerCircleStyle = {
      borderRadius: radius,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor,
    };

    return (
      <CircularProgress
        size={radius * 2}
        width={8}
        fill={fill}
        tintColor="#FFC400"
        rotation={0}
        backgroundColor="#BCBCBC"
      >
        {
          fill => (
            <View style={innerCircleStyle}>
              <H2 style={styles.blackLetter}>
                {principleLetter}
              </H2>
            </View>
          )
        }
      </CircularProgress>
    );
  }
}

const styles = StyleSheet.create({
  whiteLetter: {
    color: 'white',
    fontWeight: '800',
  },
  blackLetter: {
    color: 'rgba(0, 0, 0, .87)',
    fontWeight: '800',
  },
});

export default PrincipleIcon;
