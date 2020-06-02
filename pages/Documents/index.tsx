import React, {useEffect} from 'react';
import {TouchableOpacity, FlatList, ActivityIndicator, Text, StyleSheet} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import {RootState} from '../../store/rootReducer';
import {fetchDocuments, editDocument, IDocument} from '../../store/features/documentList/slice';

import { Container } from '../../components';

import docStyles from './styles';

function DocumentsScreen() {
  const dispatch = useDispatch();

  const {data, loading} = useSelector((state: RootState) => ({
    data: state.tasks.data,
    loading: state.tasks.loading,
  }));

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchDocuments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function HandleRead(id: number) {
    navigation.navigate('Read', {id});
  }

  function HandleAddTodo() {
    navigation.navigate('Todo');
  }

  const handleDateFormat = (date: Date) => {
    return date.toLocaleDateString()
  };

  const handleEditDocument = (task: IDocument) => {
    dispatch(editDocument({...task}));
  };

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList<IDocument>
          data={data}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <TouchableOpacity style={docStyles.document} onPress={() => HandleRead(item.id)}>
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
