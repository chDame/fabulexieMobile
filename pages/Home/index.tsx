import React, {useEffect} from 'react';
import {TouchableOpacity, FlatList, ActivityIndicator, Text, StyleSheet} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import {RootState} from '../../store/rootReducer';
import { IDocument } from '../../store/model';
import {fetchDocuments} from '../../store/features/documentReady/slice';
import {setDocument} from '../../store/features/document/slice';

import { Container } from '../../components';

import docStyles from './styles';

function DocumentsScreen() {
  const dispatch = useDispatch();

  const {data, loading} = useSelector((state: RootState) => ({
    data: state.available.data,
    loading: state.available.loading,
  }));

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, []);

  function HandleRead(doc: IDocument) {
    dispatch(setDocument({...doc}));
    navigation.navigate('Read');
  }


  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" color="#ff00ff" />
      ) : (data.length > 0 ? (
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
      )  : (<Text></Text>)) }

      
    </Container>
  );
};

export default DocumentsScreen;
