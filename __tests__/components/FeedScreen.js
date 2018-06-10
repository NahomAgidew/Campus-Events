import 'react-native';
import React from 'react';
import FeedScreen from '../../components/FeedScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <FeedScreen />
  );
});
