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
    backgroundColor: '#22aabb',
    color: 'white'
  },
  btnPrimary: {
    flex: 1,
    height: "55px",
    //borderRadius: "10px",
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
    padding: 8,
    margin: 8,
    borderWidth: 1,
    borderColor: "#CC0000",
    color: "#990000",
    fontWeight: "bold",
    alignSelf: 'stretch',
  },
  input: {
    alignSelf: 'stretch',
    //height: 55,
    marginBottom: 10,
    fontSize:16,
    color: textColor,
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