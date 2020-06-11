import React, {useEffect} from 'react';
import {TouchableOpacity, FlatList, ActivityIndicator, Text, StyleSheet} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import {RootState} from '../../store/rootReducer';

import {IDocument} from '../../store/model';
//import {fetchDocuments} from '../../store/features/remoteDocs/slice';
import docService from '../../services/DocService';

import { Container } from '../../components';

import docStyles from './styles';

function DocumentsScreen() {
  const dispatch = useDispatch();

  const {data, loading} = useSelector((state: RootState) => ({
    data: state.documents.data,
    loading: state.documents.loading,
  }));

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(docService.fetchRemoteDocuments());
  }, []);

  function HandleRead(doc: IDocument) {
    dispatch(docService.setDocument({...doc}));
    navigation.navigate('Read');
  }


  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList<IDocument>
          data={data}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <TouchableOpacity style={docStyles.document} onPress={() => HandleRead(item)}>
              <Text style={docStyles.docTitle}>{item.name}</Text>
              <Text style={docStyles.docDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      
    </Container>
  );
};

export default DocumentsScreen;
