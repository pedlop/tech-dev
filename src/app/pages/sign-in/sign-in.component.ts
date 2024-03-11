import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '@stores/user.store';

type SignInForm = {
    email: string;
};

@Component({
    selector: 'td-sign-in',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
    signInForm: FormGroup;
    userStore = inject(UserStore);

    constructor(private readonly formBuilder: FormBuilder) {
        this.signInForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    async onSignIn() {
        const values = this.signInForm.getRawValue();
        await this.userStore.signIn(values.email);
    }
}
