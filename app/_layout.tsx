import { drawFooter } from "@/components/footer";
import { drawHeader } from "@/components/header";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{flex: 1}}>
      {drawHeader("Gallery")}
        <Stack>
          <Stack.Screen
            name="index"
            options={{headerShown: false}}
          />
        </Stack>
      {drawFooter("Footer")}
    </SafeAreaView>
  )
}
