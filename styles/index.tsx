import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import { Button } from 'react-native-elements';

export const primary = "#22aabb";
export const textColor = "#553322";
export const iconColor = "#553322";

const BtnBlock = (props:any) => (
  <Button containerStyle={{width: '100%', marginLeft: 0}} {...props} />
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1e6d0",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
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
  btnPrimary: {
    height: 55,
    backgroundColor: primary,
    alignItems: "center",
    justifyContent: "center"
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
  }
});

export default styles;