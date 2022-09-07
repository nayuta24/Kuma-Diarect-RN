import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  Easing,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const colors = {
  white: "#fff",
  black: "#000",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
  },
  slide: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: {
    width: "100%",
    height: "100%",
  },
  slideDescription: {
    position: "absolute",
    width: "100%",
    fontSize: 18,
    bottom: 64,
    lineHeight: 26,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.white,
    zIndex: 1,
  },
  descriptionBg: {
    position: "absolute",
    width: "100%",
    height: 200,
    left: 0,
    bottom: 0,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: 24,
    flexDirection: "row",
  },
  pagination: {
    width: 8,
    height: 8,
    marginHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white,
  },
  paginationInner: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
  },
});

const data = [
  {
    color: "rgb(146, 101, 34)",
    description: "標準APIであるAnimatedを使って",
    image: require(`./assets/images/1.jpeg`),
  },
  {
    color: "rgb(21, 55, 67)",
    description: "意外と簡単に",
    image: require(`./assets/images/2.jpeg`),
  },
  {
    color: "rgb(206, 34, 32)",
    description: "このようなカルーセルを",
    image: require(`./assets/images/3.jpeg`),
  },
  {
    color: "rgb(48, 66, 46)",
    description: "作ることができます",
    image: require(`./assets/images/4.jpeg`),
  },
];

class LinearGradientHelper extends Component {
  render() {
    const { color1, color2, start, end, style } = this.props;
    return (
      <LinearGradient
        style={style}
        colors={[color1, color2]}
        start={start}
        end={end}
      />
    );
  }
}

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradientHelper);

export default class Carousel extends Component {
  position = new Animated.Value(0);
  panStartPosition = 0;

  onPan = (event) => {
    const position =
      this.panStartPosition -
      event.nativeEvent.translationX / Dimensions.get("window").width;
    if (position >= 0 && position <= data.length - 1) {
      this.position.setValue(position);
      this.direction = event.nativeEvent.x < this.prevPanX;
      this.prevPanX = event.nativeEvent.x;
    }
  };

  onPanStateChange = (event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      this.panStartPosition = this.position._value;
    } else if (event.nativeEvent.state === State.END) {
      delete this.panStartPosition;
      this.slideTo(
        this.direction
          ? Math.ceil(this.position._value)
          : Math.floor(this.position._value)
      );
    }
  };

  slideTo = (index) => {
    Animated.timing(this.position, {
      toValue: index,
      duration: 500,
      easing: Easing.in(Easing.out(Easing.ease)),
    }).start();
  };

  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this.onPan}
        onHandlerStateChange={this.onPanStateChange}
      >
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          {data.map((item, index) => (
            <Fragment key={index}>
              <View style={styles.slide}>
                <Animated.Image
                  source={item.image}
                  style={[
                    styles.slideImage,
                    {
                      opacity: this.position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0, 1, 0],
                      }),
                      transform: [
                        {
                          scale: this.position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [1, 1.1, 1.2],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>
            </Fragment>
          ))}
          {data.map((item, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.slideDescription,
                {
                  opacity: this.position.interpolate({
                    inputRange: [
                      index - 1,
                      index - 0.4,
                      index,
                      index + 0.4,
                      index + 1,
                    ],
                    outputRange: [0, 0, 1, 0, 0],
                  }),
                  transform: [
                    {
                      translateX: this.position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [15, 0, -15],
                      }),
                    },
                  ],
                },
              ]}
            >
              {item.description}
            </Animated.Text>
          ))}
          <AnimatedGradient
            style={styles.descriptionBg}
            color1={this.position.interpolate({
              inputRange: data.map((item, index) => index),
              outputRange: data.map((item) =>
                item.color.replace("rgb", "rgba").replace(")", ", 1)")
              ),
            })}
            color2={this.position.interpolate({
              inputRange: data.map((item, index) => index),
              outputRange: data.map((item) =>
                item.color.replace("rgb", "rgba").replace(")", ", 0)")
              ),
            })}
            start={[0, 1]}
            end={[0, 0]}
          />
          <View style={styles.paginationWrapper}>
            {data.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this.slideTo(index)}
              >
                <Animated.View
                  style={[
                    styles.pagination,
                    {
                      borderWidth: this.position.interpolate({
                        inputRange: [
                          index - 1,
                          index - 0.2,
                          index,
                          index + 0.2,
                          index + 1,
                        ],
                        outputRange: [1, 1, 4, 1, 1],
                      }),
                    },
                  ]}
                />
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      </PanGestureHandler>
    );
  }
}
