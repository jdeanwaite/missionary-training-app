import React from 'react';
import { View, Spinner } from 'native-base';

export default () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Spinner animating color="rgba(0, 0, 0, .4)" />
  </View>
);
