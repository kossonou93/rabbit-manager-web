import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class ConfirmDialogService {
    confirm(message: string): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const result = window.confirm(message);
        resolve(result);
      });
    }
  }