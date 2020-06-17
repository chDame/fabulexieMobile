import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';

import {IDocument, IDirectory} from '../../store/model';
import docService from '../../services/DocService';

import { View,TouchableOpacity, FlatList, ActivityIndicator, Text } from 'react-native';
import { Container } from '../../components';
import { FontAwesome5 } from '@expo/vector-icons';
import docStyles from './styles';
import { textColor, primary } from '../../styles';

function DocumentsScreen() {
  const dispatch = useDispatch();

  const {docs, dirs, loading} = useSelector((state: RootState) => ({
    docs: state.documents.docs,
    dirs: state.documents.directories,
    loading: state.documents.loading,
  }));

  const navigation = useNavigation();


  function HandleRead(doc: IDocument) {
    dispatch(docService.setDocument({...doc}));
    navigation.navigate('Read');
  }
  function openDir(dir: IDirectory) {
    dispatch(docService.setCurrentDir({...dir}));
  }

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{flex: 1}}>
          {dirs && dirs.length>0? 
         <FlatList<IDirectory>
          data={dirs}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <TouchableOpacity style={docStyles.directory} onPress={() => openDir(item)}>
              <FontAwesome5
                name="folder"
                size={36}
                color={primary}
                style={{marginRight:15}}
              />
              <Text style={docStyles.directoryTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        : <></>}
        <FlatList<IDocument>
          data={docs}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <TouchableOpacity style={docStyles.document} onPress={() => HandleRead(item)}>
              <FontAwesome5
                name="book"
                size={36}
                color={textColor}
                style={{marginRight:15}}
              />
              <View>
                <Text style={docStyles.docTitle}>{item.title}</Text>
                <Text style={docStyles.docDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        </View>
      )}

      
    </Container>
  );
};

export default DocumentsScreen;
