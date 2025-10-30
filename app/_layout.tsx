import { drawFooter } from "@/components/footer";
import { global_style } from "@/components/global-style";
import { drawHeader } from "@/components/header";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: global_style.BackgroundColor.backgroundColor}}>
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
