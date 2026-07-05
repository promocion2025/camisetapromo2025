import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, User, authState, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly auth = inject(Auth);
  private readonly adminEmails = environment.adminEmails.map(email => email.toLowerCase());

  readonly user$ = authState(this.auth);
  readonly isAdmin$ = this.user$.pipe(map(user => this.isAdmin(user)));

  isAdmin(user: User | null): boolean {
    return !!user?.email && this.adminEmails.includes(user.email.toLowerCase());
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await signInWithPopup(this.auth, provider);
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email.trim(), password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
