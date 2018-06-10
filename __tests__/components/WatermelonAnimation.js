import 'react-native';
import React from 'react';
import WatermelonAnimation from '../../components/WatermelonAnimation';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <WatermelonAnimation />
  );
});
