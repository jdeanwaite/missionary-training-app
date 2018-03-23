import React from 'react';
import { View, Text, ListItem, CheckBox, Body } from 'native-base';
import { MultipleChoiceQuestion } from '../types/Lesson';

type Props = {
  question: MultipleChoiceQuestion,
  selectedAnswerId: string,
  answerSelected: (id: string) => void,
  disabled: boolean,
};

export default function (props: Props) {
  const { question, answerSelected, disabled } = props;
  return (
    <View>
      {question.options.map(option => (
        <ListItem key={option.id} onPress={() => answerSelected(option.id)} disabled={disabled}>
          <CheckBox
            checked={option.id === props.selectedAnswerId}
            onPress={() => answerSelected(option.id)}
            disabled={disabled}
          />
          <Body>
            <Text>{option.text}</Text>
          </Body>
        </ListItem>
      ))}
    </View>
  );
}
