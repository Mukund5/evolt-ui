import { Injectable } from '@angular/core';  
import { Router, NavigationStart } from '@angular/router';  
import { Observable } from 'rxjs';  
import { Subject } from 'rxjs';  
  
@Injectable() export class ConfirmDialogService {  
    private subject = new Subject<any>();  
  
    confirmThis(message: string, yesFn: () => void, noFn: () => void): any {  
        this.setConfirmation(message, yesFn, noFn);  
    }  
  
    setConfirmation(message: string, yesFn: () => void, noFn: () => void): any {  
        const that = this;  
        this.subject.next({  
            type: 'confirm',  
            text: message,  
            yesFn(): any {  
                    that.subject.next(1); // This will close the modal  
                    yesFn();  
                },  
            noFn(): any {  
                that.subject.next(1);  
                noFn();  
            }  
        });  
  
    }  
  
    getMessage(): Observable<any> {  
        return this.subject.asObservable();  
    }  
}  