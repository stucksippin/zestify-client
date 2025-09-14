// utils/validators.ts
export interface ValidationRule {
    validator: (value: unknown) => boolean;
    message: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

// Базовые валидаторы
export const requiredRule = (message: string): ValidationRule => ({
    validator: (value: unknown) => {
        if (typeof value === 'string') return value.trim().length > 0;
        if (typeof value === 'boolean') return value;
        return value !== undefined && value !== null;
    },
    message
});

export const emailRule = (message: string): ValidationRule => ({
    validator: (value: unknown) =>
        typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message
});

export const minLengthRule = (min: number, message: string): ValidationRule => ({
    validator: (value: unknown) =>
        typeof value === 'string' && value.length >= min,
    message
});

export const passwordComplexityRule = (message: string): ValidationRule => ({
    validator: (value: unknown) =>
        typeof value === 'string' && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value),
    message
});

export const usernameRule = (message: string): ValidationRule => ({
    validator: (value: unknown) =>
        typeof value === 'string' && /^[a-zA-Z0-9_]+$/.test(value),
    message
});

// Специфичные валидаторы для форм
export const loginValidators: Record<string, ValidationRule[]> = {
    email: [requiredRule('Email обязателен'), emailRule('Некорректный email')],
    password: [requiredRule('Пароль обязателен'), minLengthRule(6, 'Минимум 6 символов')]
};

export const registerValidators: Record<string, ValidationRule[]> = {
    username: [
        requiredRule('Username обязателен'),
        minLengthRule(2, 'Минимум 2 символа'),
        usernameRule('Только латинские буквы, цифры и _')
    ],
    email: [requiredRule('Email обязателен'), emailRule('Некорректный email')],
    password: [
        requiredRule('Пароль обязателен'),
        minLengthRule(8, 'Минимум 8 символов'),
        passwordComplexityRule('Пароль должен содержать заглавные, строчные буквы и цифры')
    ],
    confirmPassword: [requiredRule('Подтверждение пароля обязательно')],
    agreeToTerms: [requiredRule('Необходимо согласиться с условиями')]
};

// Функция для проверки валидации
export const validateField = (value: unknown, rules: ValidationRule[]): string => {
    for (const rule of rules) {
        if (!rule.validator(value)) {
            return rule.message;
        }
    }
    return '';
};


export const validateForm = <T extends Record<string, unknown>>(
    data: T,
    validators: Record<string, ValidationRule[]>
): ValidationResult => {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Итерируемся по validators — гарантированно существуют правила
    for (const key in validators) {
        const rules = validators[key] as ValidationRule[]; // safe: ключи берем из validators
        const value = (data as any)[key];
        const error = validateField(value, rules); // возвращает '' если ок
        errors[key] = error; // сохраняем пустую строку, если поле валидно
        if (error) isValid = false;
    }

    if ('confirmPassword' in validators) {
        if ((data as any).password !== (data as any).confirmPassword) {
            errors.confirmPassword = 'Пароли не совпадают';
            isValid = false;
        }
    }

    return { isValid, errors };
};
