import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import variables from '../../theme/native-base-theme/variables/platform';
import { ScriptureGroup, Scripture } from '../../types/Lesson';

type Props = {
  scriptureGroup: ScriptureGroup,
};

export default function ScriptureGroupComponent(props: Props) {
  const { scriptures } = props.scriptureGroup;

  return (
    <View style={styles.borderedGroup}>
      <Text style={styles.title}>{props.scriptureGroup.title}</Text>

      {scriptures.map(scripture => (
        <TouchableOpacity key={scripture.id} onPress={() => handleLink(scripture)}>
          <Text style={styles.link}>{scripture.displayText}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function handleLink(scripture: Scripture) {
  tryOpenLinkInGospelLibrary(scripture).catch(err => console.error('An error occurred', err));
}

function tryOpenLinkInGospelLibrary(scripture: Scripture) {
  const link = generateScriptureLink(scripture, true);
  return Linking.canOpenURL(link)
    .then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${link}`);
        return tryOpenLinkInBrowser(scripture);
      }
      return Linking.openURL(link);
    })
    .catch(err => console.error('An error occurred', err));
}

function tryOpenLinkInBrowser(scripture: Scripture) {
  const link = generateScriptureLink(scripture, false);
  console.log('Opening link', link);
  return Linking.openURL(link);
}

function generateScriptureLink(scripture: Scripture, forGospelLibraryApp: boolean): string {
  const prefix = forGospelLibraryApp
    ? 'gospellibrary://content'
    : 'https://www.lds.org/languages/eng/content';

  let suffix = '';
  if (!isNaN(scripture.verse)) {
    suffix = `#${scripture.verse}`;
  }
  return `${prefix}/scriptures/${scripture.book}/${scripture.subBook}/${scripture.chapter}.${
    scripture.verse
  }${suffix}`;
}

const styles = StyleSheet.create({
  borderedGroup: {
    borderColor: 'rgba(0, 0, 0, .1)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, .54)',
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    fontWeight: '500',
    color: variables.brandPrimary,
    marginBottom: 8,
  },
});
