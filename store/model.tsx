export class LetterRule {
  id?: number;
  letters?: string[];
  lettersString?: string;
  color?: string;
  backgroundColor?: string;
  italic: boolean = false;
  bold: boolean = false;
  underlined: boolean = false;
  upperCase: boolean = false;
}
export class Config {
  id?: number;
  name?: string;
  letterRules: LetterRule[] = [];
}

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  token?: string;
  activeConfig?: Config;
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