import React from 'react';
import { Content } from 'native-base';
import { ScriptureGroup } from '../../types/Lesson';
import ScriptureGroupComponent from './ScriptureGroupComponent';

type Props = {
  screenProps: {
    scriptureGroups: ScriptureGroup[],
  },
};

export default function ScripturesPage(props: Props) {
  const { scriptureGroups } = props.screenProps;
  return (
    <Content padder>
      {scriptureGroups.map(scriptureGroup => (
        <ScriptureGroupComponent key={scriptureGroup.id} scriptureGroup={scriptureGroup} />
      ))}
    </Content>
  );
}
