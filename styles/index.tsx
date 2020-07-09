import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import { Button, withTheme } from 'react-native-elements';

export const primary = "#22aabb";
export const secondary = "#666666";
export const textColor = "#553322";
export const iconColor = "#22aabb";
export const iconSecondaryColor = "#118899";

const BtnBlock = (props:any) => (
  <Button containerStyle={{width: '100%', marginLeft: 0}} {...props} />
)

export const switchStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: textColor,
    flexDirection: "row",
    justifyContent: "space-between",
    padding:10,
  },
  text: {
    alignSelf: 'stretch',
    color: textColor,
    fontSize: 16
  }
});

export const modalStyles = StyleSheet.create({
  colorModalOverlayView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 22,
    paddingBottom: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  ruleModalOverlayView: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 22,
    paddingBottom: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "#f1e6d0",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: "#f1e6d0",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    textAlignVertical: "top" 
  },
  logo: {
    width: 72,
    height: 72,
    alignSelf: "center",
    marginBottom: 25
  },
  toggleDrawer: {
    position: 'absolute',
    right: 25
  },
  drawerItemFocused: {
    color: 'white'
  },
  drawerItemDivFocused: {
    backgroundColor: '#22aabb',
  },
  row: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  btnPrimary: {
    height: 50,
    backgroundColor: primary,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  btnSecondary: {
    height: 50,
    backgroundColor: secondary,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  btnIcon: {
    paddingTop: 4,
    marginRight: 10
  },
  inputIcon: {
    paddingTop: 4,
    marginRight: 10
  },
  linkPrimary: {
    color: primary,
    fontWeight: "bold"
  },
  mt1: {
    marginTop: 10
  },
  alertError: {
    flexDirection: "row",
    padding: 6,
    margin: 6,
    borderWidth: 1,
    borderColor: "#CC0000",
    alignSelf: 'stretch',
    backgroundColor: "#FFCCAA"
  },
  errorIcon: {
    fontSize: 24,
    color: "#990000",
    marginRight: 10
  },
  alertErrorText: {
    paddingTop:2,
    color: "#990000",
    fontWeight: "bold",
  },
  input: {
    alignSelf: 'stretch',
    //height: 55,
    marginBottom: 10,
    //padding: 15,
    //borderRadius: 3
    borderBottomColor: textColor
  },
  inputFocused: {
    borderBottomColor: "#33bbcc",
    borderBottomWidth: 2
  },
  buttonGroup: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: primary,
  },
  buttonGroupBtn: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderRightWidth: 1,
    height:40,
    minWidth:40
  },
  buttonGroupBtnPressed: {
    borderRadius: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderColor: 'white',
    borderRightWidth: 1,
    height:40,
    minWidth:40
  }
});

export default styles;