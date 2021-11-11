import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height: 48,
        width: "100%",
        borderRadius: 6,
        elevation: 12
    },
    content: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "bold"
    },
    loadingContainer: { 
        position: "absolute", 
        width: "100%", 
        height: "100%", 
        zIndex: 2, 
        justifyContent: "center", 
        alignItems: "center" 
    },
    loadingOverlay: { 
        position: "absolute", 
        height: "100%", 
        width: "100%", 
        zIndex: 1, 
        backgroundColor: "black", 
        opacity: 0.45 
    }
});