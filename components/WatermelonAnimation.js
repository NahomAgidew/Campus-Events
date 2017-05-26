import React from 'react';
import Animation from 'lottie-react-native';

export default class WatermelonAnimation extends React.Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <Animation
              ref={animation => {this.animation = animation; }}
              style={{
                  width: 200,
                  height: 200,
              }}
              loop={true}
              source={require('../anims/Watermelon.json')}
             />
        );
    }
}