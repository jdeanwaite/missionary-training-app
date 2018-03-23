import React from 'react';
import { Content } from 'native-base';
import { Principle } from '../../types/Lesson';
import ScriptureGroupComponent from './ScriptureGroupComponent';

type Props = {
  navigation: {
    state: {
      params: {
        principle: Principle,
      },
    },
  },
};

export default function ScripturesPage(props: Props) {
  const { scriptureGroups } = props.navigation.state.params.principle;
  return (
    <Content padder>
      {scriptureGroups.map(scriptureGroup => (
        <ScriptureGroupComponent key={scriptureGroup.id} scriptureGroup={scriptureGroup} />
      ))}
    </Content>
  );
}
