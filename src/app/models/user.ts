type UserAddress = {
    readonly street: string;
    readonly suite: string;
    readonly city: string;
    readonly zipcode: string;
};

type UserCompany = {
    readonly name: string;
    readonly catchPhrase: string;
    readonly bs: string;
};

export type User = {
    readonly id: number;
    readonly name: string;
    readonly username: string;
    readonly email: string;
    readonly phone: string;
    readonly website?: string;
    readonly address?: UserAddress;
    readonly company?: UserCompany;
};

export type UserRole = 'guest' | 'user' | 'premium' | 'admin';
