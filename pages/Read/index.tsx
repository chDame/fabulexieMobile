import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, View, Button, Text, StyleSheet, Dimensions} from 'react-native';
import {RootState} from '../../store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';

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

  const webViewScript = `
    getPages = function() { 
      document.body.style.overflowY='hidden'
      let docHeight = document.documentElement.scrollHeight;
      let clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      let nbPages = Math.ceil(docHeight/clientHeight)+1;
      window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
    }

    getPages();true;
  `;

 function scrollTo(y:number):void {
  if (view) {
    view.injectJavaScript(`window.scrollTo(0, ${y}*Math.max(document.documentElement.clientHeight, window.innerHeight));true;`)
  }
 }
  return (
    <Container style={styleReader.scrollView}>
      <WebView style={styleReader.view} 
        originWhitelist={['*']} ref={re=>setView(re)}         
        source={{ uri: `https://6d865fcb4492.ngrok.io/documents/${doc.accessToken}/adapt/html/`, baseUrl:'' }}
        automaticallyAdjustContentInsets = {true}
        scalesPageToFit={false}
                scrollEnabled={false}
                bounces={false}
                onMessage={event => {
                  dispatch(computePages(parseInt(event.nativeEvent.data), Dimensions.get('window').height));
                }}

                javaScriptEnabled={true}
                injectedJavaScript ={webViewScript}
                domStorageEnabled={true}
                    
      />
      <View style={styleReader.footer}>
              {(loading) ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <>
                <Text>Page {currentPage} of {nbPage}</Text>
                <Button title='blop' onPress={() => {setCurrentPage(currentPage+1); scrollTo(currentPage)}}/>
                </>
              )}
      </View>
    </Container>
  )
}

export const styleReader=StyleSheet.create({
  scrollView: {
    flex:1,
    //height: (Dimensions.get('screen').height - 139),
    backgroundColor: "#f1e6d0",
    padding:0,
    margin:0
  },
  footer: {
    backgroundColor:"#d7c3a7", 
    height:50
  },
  view: {
    //height: (Dimensions.get('window').height - 300),
    backgroundColor: "transparent",
    alignSelf: 'stretch',
  }
})

export default Reader;