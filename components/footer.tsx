import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { global_style } from "./global-style";

export function drawFooter(text: string): ReactElement {
    return (
    <View style={styles.Footer}>
        <Text style={styles.TextSyle}>{text}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    Footer: {
        padding: 10,
        backgroundColor: global_style.BackgroundColor.backgroundColor,
    },
    TextSyle: {
        color: global_style.TextColorWhite.color,
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})