import React from 'react';
import { Content } from 'native-base';
import { withNavigation } from 'react-navigation';
import { Principle } from '../../types/Lesson';
import VideoModal from '../../components/VideoModal';

type Props = {
  navigation: {
    state: {
      params: {
        principle: Principle,
      },
    },
  },
};
const VideosPage = (props: Props) => {
  const { videos } = props.navigation.state.params.principle;
  const videoTiles = videos.map(video => <VideoModal key={video.title} video={video} />);

  return <Content padder>{videoTiles}</Content>;
};

export default withNavigation(VideosPage);
