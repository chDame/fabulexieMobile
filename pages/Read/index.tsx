import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, View, Text, StyleSheet, Dimensions} from 'react-native';
import * as FileSystem from 'expo-file-system';
import {RootState} from '../../store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import docService from '../../services/DocService';

import { Container } from '../../components';
import { env } from '../../env';

function Reader() {
  const {doc, loading, nbPage} = useSelector((state: RootState) => ({
    doc: state.doc.doc,
    loading: state.doc.loading,
    nbPage: state.doc.nbPage
  }));

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [view, setView] = useState<WebView | null>();
  const [source, setSource] = useState<any>(null);
  const [doing, setDoing] = useState<boolean>(false);

  function receiveMessage(data:any) {
    if (!isNaN(data)) {
      dispatch(docService.setTotalPages(parseInt(data)));
      if (doc && doc.filePath) {
        if (doc.progression && doc.progression>1 && view) {
          view.injectJavaScript(`openPage(${doc.progression});true;`);
          setCurrentPage(doc.progression);
        } else if (view) {
          view.injectJavaScript(`openPage(1);true;`);
        }
      }
      setDoing(false);
    } else if (doc!=null) {
      dispatch(docService.storeDocument(doc, nbPage));
    }    
  }


   const getSource = async () => {
    if (doc?.filePath) {
      var HTMLFile = await FileSystem.readAsStringAsync(doc.filePath);

      setSource({ html: HTMLFile });
    } else if (doc) {
      setSource({ uri:  `${env.backend}/documents/${doc.accessToken}/adapt/reader/${Dimensions.get('window').width-30}/${Dimensions.get('window').height-130}`})
    }
  }

  if (loading == true && !doing) {
    setSource(null);
    setDoing(true);
    getSource();
  }

 function scrollTo(y:number):void {
  if (view) {
    view.injectJavaScript(`openPage(${y});true;`)
  }
 }
  return (
    <Container style={styleReader.scrollView}>
      {(!source || source==null) ?
        <ActivityIndicator size="large" color="#0000ff" />
      :
        <WebView style={styleReader.view} 
          originWhitelist={['*']} ref={re=>setView(re)}         
          source={source}
          allowFileAccess={true}
          automaticallyAdjustContentInsets = {true}
          scalesPageToFit={false}
          scrollEnabled={false}
          bounces={false}
          onMessage={event => {
            receiveMessage(event.nativeEvent.data);
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}                  
        />
      }
      { source && source!=null ?
        (loading ?
          <ActivityIndicator size="large" color="#0000ff" />
        :
          <View style={styleReader.footer}>
            <Ionicons name='ios-arrow-back' size={30}
              style={styleReader.btnIcon}
              disabled={currentPage==1}
              onPress={() => {setCurrentPage(currentPage-1); dispatch(docService.storeProgression(doc, currentPage-1)); scrollTo(currentPage-1); }}
            />
            <Text style={styleReader.nbPages}>Page {currentPage} / {nbPage}</Text>
            <Ionicons name='ios-arrow-forward' size={30}
              style={styleReader.btnIcon}
              disabled={currentPage==nbPage}
              onPress={() => {setCurrentPage(currentPage+1); dispatch(docService.storeProgression(doc, currentPage+1)); scrollTo(currentPage+1); }}
            />
          </View>
        ) 
      :
        <View></View>
      }
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
    marginTop: 10,
    marginBottom:10,
    marginLeft:15,
    marginRight:15,
  }
})

export default Reader;