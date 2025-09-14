export interface LoginData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

export interface LoginErrors {
    email: string;
    password: string;
}

export interface RegisterErrors {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: string;
}