import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, View, Button, Text, StyleSheet, Dimensions} from 'react-native';
import {RootState} from '../../store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { readDocument, computePages } from '../../store/features/document/slice';

 
import { Container } from '../../components';

function Reader() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [view, setView] = useState<WebView | null>();


  const {doc, data, loading, nbPage} = useSelector((state: RootState) => ({
    doc: state.doc.doc,
    data: state.doc.data,
    loading: state.doc.loading,
    nbPage: state.doc.nbPage
  }));

  useEffect(() => {
    if (doc!=null && data==null) {
      dispatch(readDocument(doc));
    }
  }, []);

 function scrollTo(y:number):void {
  if (view) {
    view.injectJavaScript(`openPage(${y});true;`)
  }
 }
  return (
    <Container style={styleReader.scrollView}>
      <WebView style={styleReader.view} 
        originWhitelist={['*']} ref={re=>setView(re)}         
        source={{ uri: `https://042168a488d5.ngrok.io/documents/${doc.accessToken}/adapt/reader/${Dimensions.get('window').width}/${Dimensions.get('window').height-120}`, baseUrl:'' }}
        automaticallyAdjustContentInsets = {true}
        scalesPageToFit={false}
                scrollEnabled={false}
                bounces={false}
                onMessage={event => {
                  dispatch(computePages(parseInt(event.nativeEvent.data)));
                }}

                javaScriptEnabled={true}
                //injectedJavaScript ={webViewScript}
                domStorageEnabled={true}
                    
      />
      {(loading) ? (
                <ActivityIndicator size="large" color="#0000ff" />
       ) : (
      <View style={styleReader.footer}>
                  <Ionicons
                    name='ios-arrow-back'
                    size={30}
                    style={styleReader.btnIcon}
                    onPress={() => {setCurrentPage(currentPage-1); scrollTo(currentPage-1)}}
                  />
                  <Text style={styleReader.nbPages}>Page {currentPage} / {nbPage}</Text>
                  <Ionicons
                    name='ios-arrow-forward'
                    size={30}
                    style={styleReader.btnIcon}
                    onPress={() => {setCurrentPage(currentPage+1); scrollTo(currentPage+1)}}
                  />
      </View>
              )}
    </Container>
  )
}

export const styleReader=StyleSheet.create({
  scrollView: {
    flex:1,
    backgroundColor: "#f1e6d0",
    padding:0,
    margin:0
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:"#d7c3a7", 
    height:50
  },
  btnIcon: {
    padding: 10,
    width: "25%",
    textAlign: "center"
  },
  nbPages: {
    padding: 10,
  },
  view: {
    backgroundColor: "transparent",
    alignSelf: 'stretch',
    marginTop: 0
  }
})

export default Reader;