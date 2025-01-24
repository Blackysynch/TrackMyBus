module.exports = {
  expo: {
    name: "TrackMyBus",
    slug: "TrackMyBus",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "trackmybus",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/ictlogo.png",
      resizeMode: "cover",
      backgroundColor: "#FFFFFF"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.ictu.trackmybus",
      infoPlist: {
        NSCameraUsageDescription: "This app needs access to the camera to take profile pictures and upload receipts.",
        NSPhotoLibraryUsageDescription: "This app needs access to your photos to upload profile pictures and receipts.",
        NSLocationWhenInUseUsageDescription: "This app needs access to your location to show your position on the map.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "This app needs access to your location to track the bus in real-time."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.ictu.trackmybus",
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION"
      ],
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-image-picker",
      "expo-location",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "your-project-id"
      }
    }
  }
};
