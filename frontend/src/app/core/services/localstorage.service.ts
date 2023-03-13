import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  returnData: any;
  constructor() {}
  public storeData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getData(key: string): any {
    this.returnData = localStorage.getItem(key);
    return this.returnData;
  }

  public removeData(key: string): void {
    localStorage.removeItem(key);
  }

  public clearStorage(): void {
    localStorage.clear();
  }

  public getToken(): string | undefined {
    const token = this.getData('token');
    if (token && token != null) {
      return token;
    }
    return undefined;
  }
}
