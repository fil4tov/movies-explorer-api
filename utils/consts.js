const MESSAGE = {
  COMMON: {
    NOT_FOUND: 'По указанному пути ничего не найдено',
    SERVER_ERROR: 'На сервере произошла ошибка',
  },
  USER: {
    NOT_FOUND: 'Пользователь не найден',
    CONFLICT_EMAIL: 'Пользователь с указанным email уже существует',
    LOGIN_ERROR: 'Передан неверный логин или пароль',
    LOGIN_SUCCESS: 'Вы успешно авторизавались',
    LOGOUT_SUCCESS: 'Вы успешно разлогинились',
  },
  MOVIE: {
    CONFLICT_ID: 'Фильм с указанным id уже есть в базе',
    NOT_FOUND: 'Фильм с указанным id не найден',
    DELETE_FORBIDDEN: 'Удалять можно только свои фильмы',
    DELETE_SUCCESS: 'Фильм успешно удален',
  },
};

const STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  DEFAULT: 500,
};

const ALLOWED_CORS = [
  'https://movies.fil4tov.ru',
  'http://dev.local:3000',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const URL_REGEX = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;

module.exports = {
  STATUS,
  URL_REGEX,
  MESSAGE,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
