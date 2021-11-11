import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    titleWrapper: {
        width: "100%",
        flexDirection: "row",
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        color: "black",
        marginLeft: 8,
    },
    buttonsWrapper: {
        flex: 1,
        paddingLeft: 18,
        paddingRight: 18,
        justifyContent: "space-evenly"
    }
});