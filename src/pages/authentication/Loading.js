import React from 'react';
import { View, Spinner } from 'native-base';

export default () => (
  <View style={{ flex: 1 }}>
    <Spinner animating />
  </View>
);
