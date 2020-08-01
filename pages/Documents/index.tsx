import React from 'react';
import { BackHandler } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';

import {IDocument, IDirectory} from '../../store/model';
import docService from '../../services/DocService';
import informationService from '../../services/InformationService';
import translate from '../../services/i18n';

import { View,TouchableOpacity, SectionList, ActivityIndicator, Text, Image } from 'react-native';
import { Container, MessageInfo } from '../../components';
import { FontAwesome5 } from '@expo/vector-icons';
import docStyles from './styles';

function DocumentsScreen({ navigation }) {
  const dispatch = useDispatch();

  const {docs, dirs, loading} = useSelector((state: RootState) => ({
    docs: state.documents.docs,
    dirs: state.documents.directories,
    loading: state.documents.loading,
  }));

  React.useEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        let parent = docService.getDirParent();
        if (parent!=null) {
          dispatch(docService.setCurrentDir(parent));
          return true;
        } else if (docService.getDirectoryId()!=null) {
          dispatch(docService.setCurrentDir(null));
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  function HandleRead(doc: IDocument) {
    dispatch(docService.setDocument({...doc}));
    navigation.navigate('Read');
  }
  function openDir(dir: IDirectory) {
    dispatch(docService.setCurrentDir({...dir}));
  }
  function isDoc(toBeDetermined: IDirectory|IDocument): toBeDetermined is IDocument {
    if((toBeDetermined as IDocument).accessToken){
      return true
    }
    return false
  }

  return (
    <Container style={{alignSelf: 'stretch'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <SectionList<IDirectory|IDocument>
          sections={[
            {title: 'dir', data: dirs},
            {title: 'doc', data: docs},
          ]}
          renderItem={(el) => !isDoc(el.item) ? 
              <TouchableOpacity style={docStyles.directory} onPress={() => openDir(el.item as IDirectory)}>
                <FontAwesome5
                  name="folder"
                  size={36}
                  color='#f2ebe6'
                  style={{marginLeft:7, marginBottom:8, marginTop:8, marginRight:15}}
                  solid 
                />
                <Text style={docStyles.directoryTitle}>{el.item.name}</Text>
              </TouchableOpacity>
            :
              <TouchableOpacity style={docStyles.document} onPress={() => HandleRead(el.item as IDocument)}>
                <Image style={docStyles.cover} source={{uri: docService.getCover(el.item.accessToken)}}/>
                <View>
                  <Text style={docStyles.docTitle}>{el.item.title}</Text>
                  <Text style={docStyles.docDescription}>{el.item.description}</Text>
                </View>
              </TouchableOpacity>
          }
          keyExtractor={(item: any, index:number) => ''+index}
        >

        </SectionList>
        
      )}
      <MessageInfo messageKey={`INFO_${docService.getCurrentSpace()?.name?.replace(' ','')}`}></MessageInfo>
    </Container>
  );
};

export default DocumentsScreen;
