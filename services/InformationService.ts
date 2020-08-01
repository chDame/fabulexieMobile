import { AppThunk } from '../store';
import { IUser, IConfig, IConfigResource } from '../store/model';
import { AsyncStorage } from 'react-native';
import api from './api';

export class InformationService {
  
  notDisplay: string[] = [];

  closeInformation(key: string, noMore: boolean): void {
    this.notDisplay.push(key);
    if (noMore) {
      AsyncStorage.setItem(`@infoStore`, JSON.stringify(this.notDisplay));
    }
  }

  reset(): void {
    this.notDisplay = [];
    AsyncStorage.setItem(`@infoStore`, JSON.stringify(this.notDisplay));
  }

  async loadInformations(): Promise<void> {
    let value = await AsyncStorage.getItem(`@infoStore`);
    if (value!=null) {
      this.notDisplay = JSON.parse(value);
    }
  }

  displayInformation(key: string):boolean {
    if (this.notDisplay.indexOf('all')>=0 || this.notDisplay.indexOf(key)>=0) {
      return false;
    }
    return true;
  }
}

const informationService = new InformationService();

export default informationService;