import { StyleSheet } from 'react-native';
import { textColor, primary } from '../../styles';

const docStyles = StyleSheet.create({
  directory: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'stretch',
    marginBottom: 10,
    borderBottomWidth: 1,
    //borderRadius:3,
    borderBottomColor: primary,
    padding: 5
  },
  document: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'stretch',
    marginBottom: 10,
    borderBottomWidth: 1,
    //borderRadius:3,
    borderBottomColor: textColor,
    padding: 5
  },
  directoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: primary,
    marginBottom: 5
  },
  docTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: textColor,
    marginBottom: 5
  },
  docDescription: {
    fontStyle: "italic",
    color: textColor,
  }
})

export default docStyles;