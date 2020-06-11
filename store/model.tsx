export interface ILetterRule {
  id?: number;
  letters?: string[];
  lettersString?: string;
  color?: string;
  backgroundColor?: string;
  italic?: boolean;
  bold?: boolean;
  underlined?: boolean;
  upperCase?: boolean;
}
export interface IConfig {
  id?: number;
  name?: string;
  letterRules?: ILetterRule[];
}

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  token?: string;
  activeConfig?: IConfig;
}

export interface IDocument {
  id: number;
  name?: string;
  title?: string;
  description?: string;
  ownerId?: number;
  accessToken?: string;
  nbPages?: number;
  filePath?: string;
}