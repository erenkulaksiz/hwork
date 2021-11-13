import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    trackHomework: {
        flex: 1,
    },
    homeworkItem: {
        backgroundColor: "white",
        height: 96,
        padding: 12,
        paddingLeft: 24,
        paddingRight: 24,
        marginBottom: 8,
        elevation: 8,
        borderRadius: 8,
        flexDirection: "column"
    },
    homeworkItemLecture: {
        color: "black",
        fontWeight: "800",
        fontSize: 18,
    },
    controlsTitle: {
        color: "black",
        fontSize: 24,
        fontWeight: "600",
        marginLeft: 5,
    }
});