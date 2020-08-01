import React, { useState } from 'react';
import { Container, LocaleSelector, FullSwitch, SettingsLink } from '../../components';
import translate, { getLocale } from '../../services/i18n';

import informationService from '../../services/InformationService';
import { Modal } from 'react-native';

function SettingsScreen() {

  const [localeModal, setLocaleModal] = useState(false);
  const [change, setChange] = useState(0);
 

  return (
    <Container>
      <FullSwitch value={informationService.displayInformation('all')} icon='ios-help-buoy'
        onChange={() => {informationService.displayInformation('all') ? informationService.closeInformation('all', true) : informationService.reset(); setChange(change+1);}}
        label={translate('HELP')}/>
      <SettingsLink label={translate('LOCALE')} value={getLocale()}
        action={() => setLocaleModal(true)} icon="md-globe" />
        
      <Modal
          animationType="slide"
          transparent={true}
          visible={localeModal}
          presentationStyle="overFullScreen">
            <LocaleSelector close={() => setLocaleModal(false)}/>
              
      </Modal>
    </Container>
  );
};



export default SettingsScreen;
