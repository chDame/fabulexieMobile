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

export const btnStyles = StyleSheet.create({
  btnPrimary: {
    height: 50,
    backgroundColor: primary,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  btnSecondary: {
    height: 50,
    borderColor: primary,
    color: primary,
    borderWidth: 2,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  btnIcon: {
    paddingTop: 4,
    marginRight: 10
  },
  btnRoundContainer: {
    width: '33%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  btnRound: {
    marginBottom: 5,
    borderRadius: 20,
    width: 40,
    height: 40,
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: textColor,
    color: textColor,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 3, //IOS
  },
  btnRoundPressed: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  btnRoundMat: {
    fontSize: 34,
    paddingVertical: 0,
  },
  btnRoundSubTitle: {
    fontSize: 12,
    color: textColor,
    marginBottom: 10,
  },
  btnSocial: {
    height: 42,
    alignSelf: 'stretch',
    margin: '2%',
    borderRadius: 3,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  btnSocialText: {
    flex: 1,
    fontWeight: "700",
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    color: 'white'
  }
});

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: "#f1e6d0",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "5%",
    paddingRight: "5%",
    textAlignVertical: "top",
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
  
});

export default styles;