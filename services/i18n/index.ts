import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {fr} from '../../config/language/fr'
import {en} from '../../config/language/en'

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en,
  fr,
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

export default function translate(key:string):string {
	return i18n.t(key);
}

export function setLocale(locale:string):void {
  i18n.locale = locale;
}

export function getLocale():string {
  return i18n.locale;
}