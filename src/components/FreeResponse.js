import React from 'react';
import { View, Input, Item } from 'native-base';

type Props = {
  text: string,
  textChanged: (text: string) => void,
  disabled: boolean,
};

export default function (props: Props) {
  const { text, textChanged, disabled } = props;
  return (
    <Item disabled={disabled}>
      <Input
        multiline
        autoCapitalize="sentences"
        autoCorrect
        autoFocus
        placeholder="Enter your response."
        value={text}
        onChange={event => textChanged(event.nativeEvent.text)}
        disabled={disabled}
        style={{
          minHeight: 100,
        }}
      />
    </Item>
  );
}
