import { StyleSheet } from 'react-native';
import { textColor } from '../../styles';

const docStyles = StyleSheet.create({
  document: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius:3,
    borderColor: textColor,
    padding: 5
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