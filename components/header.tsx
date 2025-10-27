import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { global_style } from "./global-style";

export function drawHeader(text: string): ReactElement {
    return (
    <View style={styles.Header}>
        <Text style={styles.TextSyle}>{text}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    Header: {
        padding: 10,
        backgroundColor: global_style.BackgroundColor.backgroundColor,
    },
    TextSyle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: global_style.TextColorWhite.color,
        marginBottom: 20,
        textAlign: 'center',
    }
})