
export interface ILogObject {
  
  level: 'error' | 'warning' | 'info';
  message: string;
  stack: string | undefined;

};