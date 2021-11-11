import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
    },
    title: {
        fontSize: 42,
        fontWeight: "800",
        color: "black",
        width: "100%",
        marginBottom: 12,
    },
    loginSwitchWrapper: {
        width: "100%",
        height: "50%",
        backgroundColor: "white",
        elevation: 4,
        borderRadius: 8,
        overflow: "hidden",
    },
    switchWrapper: {
        width: "100%",
        height: "20%",
        padding: 8,
        paddingLeft: 18,
        paddingRight: 18,
    },
    switchBg: {
        flex: 1,
        backgroundColor: "#E0E0E0",
        borderRadius: 4,
        flexDirection: "row",
    },
    switchSide: {
        height: "100%",
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    switchText: {
        color: "black",
        fontSize: 18,
        fontWeight: "600",
    },
    switchOverlay: {
        position: "absolute",
        padding: 4,
        width: "100%",
        height: "100%"
    },
    switchCurrentSelected: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: 3,
    },
    pagerView: {
        flex: 1,
        backgroundColor: "white",
    },
    bannerWrapper: {
        width: "100%",
        height: "50%",
        paddingBottom: 12,
    },
    banner: {
        width: "100%",
        height: "70%",
        marginTop: 16,
        backgroundColor: "white",
        elevation: 4,
        borderRadius: 8,
        overflow: "hidden"
    },
    bannerContent: {
        width: "100%",
        height: "90%",
    },
    bannerFooter: {
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row"
    },
    bannerDot: {
        width: 8,
        height: 8,
        backgroundColor: "#E3E3E3",
        borderRadius: 32,
        marginRight: 4,
    },
    bannerDotSelected: {
        width: 8,
        height: 8,
        backgroundColor: "#4D4D4D",
        borderRadius: 32,
        marginRight: 4,
    },
});