import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";
import "expo-dev-client";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

const adUnitId = process.env.EXPO_PUBLIC_ADMOB_BANNER_UNIT_ID || TestIds.BANNER;

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
