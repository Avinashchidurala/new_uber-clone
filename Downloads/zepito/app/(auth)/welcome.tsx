import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  PixelRatio,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

const { width, height } = Dimensions.get("window");

const scaleFont = (size: number) => size * PixelRatio.getFontScale();

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full items-end px-5 pt-3"
      >
        <Text
          style={{ fontSize: scaleFont(14) }}
          className="text-black font-JakartaBold"
        >
          Skip
        </Text>
      </TouchableOpacity>

      {/* Swiper */}
      <View className="flex-1">
        <Swiper
          ref={swiperRef}
          loop={false}
          onIndexChanged={setActiveIndex}
          dot={
            <View
              style={{
                width: width * 0.07,
                height: 4,
                marginHorizontal: 4,
                backgroundColor: "#E2E8F0",
                borderRadius: 999,
              }}
            />
          }
          activeDot={
            <View
              style={{
                width: width * 0.07,
                height: 4,
                marginHorizontal: 4,
                backgroundColor: "#0286FF",
                borderRadius: 999,
              }}
            />
          }
        >
          {onboarding.map((item) => (
            <View
              key={item.id}
              className="flex-1 items-center justify-center px-6"
            >
              <Image
                source={item.image}
                resizeMode="contain"
                style={{
                  width: width * 0.9,
                  height: height * 0.35,
                }}
              />

              <Text
                style={{
                  fontSize: scaleFont(26),
                  marginTop: height * 0.05,
                }}
                className="text-black font-bold text-center"
              >
                {item.title}
              </Text>

              <Text
                style={{
                  fontSize: scaleFont(14),
                  marginTop: 12,
                }}
                className="text-[#858585] font-JakartaSemiBold text-center px-4"
              >
                {item.description}
              </Text>
            </View>
          ))}
        </Swiper>
      </View>

      {/* Bottom Button */}
      <View className="w-full px-5 pb-6">
        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          onPress={() =>
            isLastSlide
              ? router.replace("/(auth)/sign-up")
              : swiperRef.current?.scrollBy(1)
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
