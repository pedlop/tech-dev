import { Injectable } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';

import { User } from '@models/user';
import { AbstractHttpService } from '@services/http.service';
import { StorageService } from '@services/storage/storage.service';

@Injectable({ providedIn: 'root' })
export class UserService extends AbstractHttpService {
    constructor(private readonly storageService: StorageService) {
        super('users');
    }

    check(): User | undefined {
        const userSession = this.storageService.get('tech-dev.user');
        if (userSession) return JSON.parse(userSession);
        return;
    }

    signIn(email: string): Observable<User> {
        return this.http.get<User[]>(this.baseUrl).pipe(
            map((users) => {
                const user = users.find((u) => u.email === email);
                if (user) {
                    this.storageService.set('tech-dev.user', JSON.stringify(user));
                    return user;
                }
                throw new Error('Invalid credentials.');
            })
        );
    }

    signOut(): void {
        this.storageService.remove('tech-dev.user');
    }
}
