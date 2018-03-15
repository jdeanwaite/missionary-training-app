import React from 'react';
import { Content } from 'native-base';
import { withNavigation } from 'react-navigation';
import { EmbeddableVideo } from '../../types/Lesson';
import VideoModal from '../../components/VideoModal';

type Props = {
  screenProps: {
    videos: EmbeddableVideo[],
  },
};
const VideosPage = (props: Props) => {
  const videos = props.screenProps.videos.map(video => <VideoModal key={video.id} video={video} />);

  return <Content padder>{videos}</Content>;
};

export default withNavigation(VideosPage);
