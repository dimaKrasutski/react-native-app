import React, { Component } from 'react';
import {
 View, PanResponder, Animated, Dimensions ,
} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIP_OUT_DURATION = 250;

export default class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      },
    });

    this.state = {
      panResponder, position,
    };
  }

  forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIP_OUT_DURATION,
    }).start();
  }

  resetPosition = () => {
    const { position } = this.state;

    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  }

  getCardStyle = () => {
    const { position } = this.state;

    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  }

  renderCards() {
    const { data, renderCard } = this.props;
    const { panResponder } = this.state;

    return (
      data.map((item, index) => {
        if (index === 0) {
          return (
            <Animated.View
              key={item.id}
              style={this.getCardStyle()}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }

        return renderCard(item);
      })
    );
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}
