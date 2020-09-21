export interface IRule {
  id?: number;
  color?: string | null;
  backgroundColor?: string | null;
  italic?: boolean;
  bold?: boolean;
  underlined?: boolean;
  upperCase?: boolean;
}
export interface ILetterRule extends IRule {
  letters?: string[];
  lettersString?: string;
}
export interface ISyllabeRule extends IRule {
}

export function instanceOfLetterRule(object: IRule): object is ILetterRule {
  return 'letters' in object;
}

export interface IConfig {
  id?: number;
  name?: string;
  openDys: boolean;
  extraLineSpace: number|null;
	extraWordSpace: number|null;
  letterRules: ILetterRule[];
  syllabe: boolean;
  oddSyllabeRule: ISyllabeRule;
  evenSyllabeRule: ISyllabeRule;
}
export interface IConfigResource {
  userConfig: IConfig;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  token?: string;
  activeConfig?: IConfig;
}
export interface ISpaceAccess {
  id: number;
  space: ISpace;
}
export interface ISpace {
  id: number;
  name: string;
}
export interface IDirectory {
  id: number;
  name: string;
  parent: IDirectory|null;
}
export interface IDocument {
  id: number;
  name: string;
  title?: string;
  description?: string;
  ownerId?: number;
  accessToken: string;
  nbPages?: number;
  filePath?: string;
  coverPath?:string;
  progression?: number;
  lastAccess?: number;
}