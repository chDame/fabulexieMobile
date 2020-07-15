export interface ILetterRule {
  id?: number;
  letters?: string[];
  lettersString?: string;
  color?: string | null;
  backgroundColor?: string | null;
  italic?: boolean;
  bold?: boolean;
  underlined?: boolean;
  upperCase?: boolean;
}
export interface IConfig {
  id?: number;
  name?: string;
  openDys: boolean;
  extraLineSpace: number|null;
	extraWordSpace: number|null;
  letterRules: ILetterRule[];
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