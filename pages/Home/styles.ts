import { StyleSheet } from 'react-native';
import { textColor } from '../../styles';

const docStyles = StyleSheet.create({
  document: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'stretch',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    padding: 5
  },
  detail: {
    flex: 1,
    alignSelf: 'stretch',
    textAlignVertical: "top",
  },
  titleProgression: {
    flexDirection: "row",
    alignSelf: 'stretch',
    textAlignVertical: "top"
  },
  docTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: textColor,
    marginBottom: 5,
  },
  docDescription: {
    fontStyle: "italic",
    color: textColor,
  },
  progression: {
    fontStyle: "italic",
    color: textColor,
    textAlignVertical: "top",
    alignSelf: "flex-end",
    marginBottom:8,
    fontSize:12
  },
  cover: {
    width: 53, 
    height: 75, 
    marginRight:15
  },
  popupContent: {
    flexDirection: "column",
    alignSelf: 'stretch',
    textAlignVertical: "top"
  },
})

export default docStyles;