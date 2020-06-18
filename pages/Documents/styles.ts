import { StyleSheet } from 'react-native';
import { textColor, primary } from '../../styles';

const docStyles = StyleSheet.create({
  directory: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'stretch',
    backgroundColor: '#ccccff',
    borderBottomWidth: 1,
    borderBottomColor: '#bbbbee',
    padding: 5
  },
  document: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'stretch',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    padding: 5
  },
  directoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#928b86',
    padding: 8
  },
  cover: {
    width: 53, 
    height: 75, 
    marginRight:15
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