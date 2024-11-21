import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  AnimatedProps,
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  FadeOutUp,
  interpolateColor,
  LinearTransition,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressasble = Animated.createAnimatedComponent(Pressable);
const _spacing = 8;
const _buttonHeight = 42;
const _linearTransition = LinearTransition.springify()
  .damping(80)
  .stiffness(200);
const _dotContainer = 24;
const _dotSize = _dotContainer / 3;

const _activeDot = "#fff";
const _inactiveDot = "#aaa";

function Button({ children, style, ...rest }: AnimatedProps<PressableProps>) {
  return (
    <AnimatedPressasble
      style={[
        {
          height: _buttonHeight,
          borderRadius: _buttonHeight / 2,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: _spacing * 2,
        },
        style,
      ]}
      {...rest}
      entering={FadeInLeft.springify().damping(80).stiffness(200)}
      exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
      layout={_linearTransition}
    >
      {children}
    </AnimatedPressasble>
  );
}

function Dot({
  index,
  animation,
}: {
  index: number;
  animation: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [index - 1, index, index + 1],
        [_inactiveDot, _activeDot, _activeDot]
      ),
    };
  });

  return (
    <View
      style={{
        width: _dotContainer,
        height: _dotContainer,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          stylez,
          {
            width: _dotSize,
            height: _dotSize,
            borderRadius: _dotSize,
          },
        ]}
      />
    </View>
  );
}

function PaginationIndicator({
  animation,
}: {
  animation: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      width: _dotContainer + _dotContainer * animation.value,
    };
  });

  return (
    <Animated.View
      style={[
        stylez,
        {
          backgroundColor: "#29be56",
          height: _dotContainer,
          width: _dotContainer,
          borderRadius: _dotContainer,
          position: "absolute",
          top: 0,
          left: 0,
        },
      ]}
    />
  );
}

function Pagination({
  selectedIndex,
  total,
}: {
  selectedIndex: number;
  total: number;
}) {
  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 80,
      stiffness: 200,
    });
  });

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <PaginationIndicator animation={animation} />
        {[...Array(total).keys()].map((i) => (
          <Dot key={`dot-${i}`} index={i} animation={animation} />
        ))}
      </View>
    </View>
  );
}

const Onboarding = ({
  total,
  selectedIndex,
  onIndexChange,
}: {
  total: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}) => {
  return (
    <View style={{ padding: _spacing, gap: _spacing * 2 }}>
      <Pagination selectedIndex={selectedIndex} total={4} />
      <View
        style={{
          flexDirection: "row",
          gap: _spacing,
        }}
      >
        {selectedIndex > 0 && (
          <Button
            style={{
              backgroundColor: "#ddd",
            }}
            onPress={() => {
              if (selectedIndex <= 0) {
                return;
              }
              onIndexChange(selectedIndex - 1);
            }}
          >
            <Text>Back</Text>
          </Button>
        )}
        <Button
          style={{
            backgroundColor: "#036bfb",
            flex: 1,
          }}
          onPress={() => {
            if (selectedIndex === total - 1) {
              return;
            }

            onIndexChange(selectedIndex + 1);
          }}
        >
          {selectedIndex === total - 1 ? (
            <Animated.Text
              key="finish"
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              style={{ color: "#fff" }}
            >
              Finish
            </Animated.Text>
          ) : (
            <Animated.Text
              key="continue"
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              layout={_linearTransition}
              style={{ color: "#fff" }}
            >
              Continue
            </Animated.Text>
          )}
        </Button>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
