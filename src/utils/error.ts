export enum ERROR_CODES {
  'auth/invalid-email' = 'Пользователь с таким email не был найден',
  'auth/wrong-password' = 'Неверный пароль',
  auth = 'Пожалуйста войдите в систему',
}

export function error(code: keyof typeof ERROR_CODES) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка' + code
}
