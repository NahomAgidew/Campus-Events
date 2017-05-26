import React from 'react';
import Animation from 'lottie-react-native';

export default class PinJumpAnimation extends React.Component {
    componentDidMount () {
        this.animation.play();
    }

    render () {
        return (
            <Animation
              ref={animation => {this.animation = animation;}}
              style={{
                  width: 200,
                  height: 200
              }}
              source={require('../anims/PinJump.json')}
              loop={true}
             />
        );
    }
}
