import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Modal, FlatList, ActivityIndicator, Text, Image, View } from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import {RootState} from '../../store/rootReducer';
import { IDocument } from '../../store/model';
import docService from '../../services/DocService';
import { Container, BtnSecondary, MenuAction, MessageInfo } from '../../components';
import translate from '../../services/i18n';
import docStyles from './styles';
import { modalStyles } from '../../styles';

function DocumentsScreen() {
  const dispatch = useDispatch();

  const {data, loading} = useSelector((state: RootState) => ({
    data: state.available.data,
    loading: state.available.loading,
  }));

  const [bookActionModal, setBookActionModal] = useState(false);
  const [book, setBook] = useState<IDocument|null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(docService.fetchLocalDocuments());
  }, []);

  function HandleRead(doc: IDocument) {
    dispatch(docService.setDocument({...doc}));
    setBookActionModal(false);
    navigation.navigate('Read');
  }

  async function HandleReadRefresh(doc: IDocument) {
    let clone:IDocument = await docService.getNewDoc(doc);
    
    dispatch(docService.setDocument({...clone}));
    setBookActionModal(false);
    navigation.navigate('Read');
  }

  return (
    <Container style={{alignSelf: 'stretch'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#ff00ff" />
      ) : (data.length>0 ?
        <FlatList<IDocument>
          data={data}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <TouchableOpacity style={docStyles.document} onPress={() => HandleRead(item)}
              onLongPress={() => {console.log("prout"); setBook(item); setBookActionModal(true); }}>
                { item.coverPath ? 
                  //<Text >{item.coverPath}</Text>
                  <Image style={docStyles.cover} source={{uri: item.coverPath}}/>
                  :
                  <Image style={docStyles.cover} source={require('../../assets/fabulexie.png')}/>
                }
                <View style={docStyles.detail}>
                  <View style={docStyles.titleProgression}>
                    <Text style={docStyles.docTitle}>{item.title}</Text>
                    <Text style={docStyles.progression}>page {item.progression} / {item.nbPages}</Text>
                  </View>
                  <Text style={docStyles.docDescription}>{item.description}</Text>
                  <Text style={docStyles.progression}>{item.lastAccess ? new Date(item.lastAccess).toLocaleDateString('fr-FR') : ''}</Text>
                </View>
                
            </TouchableOpacity>
          )}
        /> : <MessageInfo messageKey="INFO_welcomingMsg"></MessageInfo>
      )}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={bookActionModal}
        presentationStyle="overFullScreen"
      >
        
        <View style={modalStyles.ruleModalOverlayView}>
          <View style={modalStyles.modalView}>
            {(book!=null) && (
              <View style={docStyles.popupContent}>
                <View style={docStyles.titleProgression}>
                    <Text style={docStyles.docTitle}>{book.title}</Text>
                    <Text style={docStyles.progression}>page {book.progression} / {book.nbPages}</Text>
                </View>
                <MenuAction icon='eye' label={translate('READ')} onPress={() => HandleRead(book)}/>
                <MenuAction icon='sync' label={translate('HOME_refresh')} subtitle={translate('HOME_refresh_subtitle')} onPress={() => HandleReadRefresh(book)}/>
                <MenuAction icon='trash' color='#CC0000' label={translate('DELETE')} onPress={() => {dispatch(docService.deleteLocal(book)); setBookActionModal(false);}}/>
              </View> 
            ) }
            <View style={{alignSelf: 'stretch', alignItems: 'center'}}>
              <BtnSecondary onPress={() => setBookActionModal(false)} title={translate('CANCEL')}/>
            </View>
         </View>
        </View>
      </Modal>
    </Container>
  );
};

export default DocumentsScreen;
