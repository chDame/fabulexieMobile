import React, {useEffect} from 'react';
import {TouchableOpacity, FlatList, ActivityIndicator, Text, Image, View } from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import {RootState} from '../../store/rootReducer';
import { IDocument } from '../../store/model';
import docService from '../../services/DocService';
import { Container } from '../../components';
import translate from '../../services/i18n';
import docStyles from './styles';
import { textColor } from '../../styles';

function DocumentsScreen() {
  const dispatch = useDispatch();

  const {data, loading} = useSelector((state: RootState) => ({
    data: state.available.data,
    loading: state.available.loading,
  }));

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(docService.fetchLocalDocuments());
  }, []);

  function HandleRead(doc: IDocument) {
    dispatch(docService.setDocument({...doc}));
    navigation.navigate('Read');
  }

  return (
    <Container style={{alignSelf: 'stretch'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#ff00ff" />
      ) : (data.length > 0 ? (
        <FlatList<IDocument>
          data={data}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <TouchableOpacity style={docStyles.document} onPress={() => HandleRead(item)}>
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
        />
      )  : (<Text style={{color:textColor, padding:20}}>{translate('HOME_welcomingMsg')}</Text>)) }

      
    </Container>
  );
};

export default DocumentsScreen;
