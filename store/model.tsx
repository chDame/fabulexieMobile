export interface IDocument {
    id: number;
    name: string;
    title: string;
    description: string;
    ownerId: number;
    accessToken: string;
    completed: boolean;
    nbPages: number;
    filePath: string;
  }
  
  export class Document implements IDocument {
    id: number = 0;
    name: string = '';
    title: string = '';
    description: string  = '';
    ownerId: number = 0
    accessToken: string = '';
    completed: boolean = false;
    nbPages: number = 0;
    filePath: string = '';
  }