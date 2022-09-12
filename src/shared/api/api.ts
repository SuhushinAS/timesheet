/**
 * АПИ.
 */
export class Api {
  host = '';

  options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };

  public set token(value: string) {
    this.options.headers = this.getHeaders({ Authorization: `OAuth ${value}` });
  }

  /**
   * Получить JSON.
   * @param response Ответ.
   * @return JSON.
   */
  getJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  /**
   * Получить опции.
   * @param options Опции.
   * @return Опции.
   */
  getOptions(options: RequestInit = {}): RequestInit {
    const { headers } = options;

    return {
      ...this.options,
      ...options,
      headers: this.getHeaders(headers),
    };
  }

  /**
   * Задать опции.
   * @param options Опции.
   */
  setOptions(options: RequestInit = {}) {
    this.options = this.getOptions(options);
  }

  /**
   * Получить заголовки
   * @param headers Заголовки.
   * @return Заголовки.
   */
  getHeaders(headers: HeadersInit = {}): HeadersInit {
    return { ...this.options.headers, ...headers };
  }

  /**
   * Задать заголовки.
   * @param headers Заголовки.
   */
  setHeaders(headers: HeadersInit = {}) {
    this.options.headers = this.getHeaders(headers);
  }

  /**
   * Отправить запрос.
   * @param url Адрес.
   * @param options Опции.
   * @return Запрос.
   */
  request<T>(url = '', options?: RequestInit): Promise<T> {
    return this.fetch(url, this.host, options).then(this.getJSON<T>);
  }

  /**
   * Отправить запрос.
   * @param url Адрес.
   * @param options Опции.
   * @return Запрос.
   */
  requestRaw(url = '', options?: RequestInit): Promise<Response> {
    return this.fetch(url, this.host, options);
  }

  /**
   * Отправить запрос.
   * @param url Адрес.
   * @param host Хост.
   * @param options Опции.
   * @return Запрос.
   */
  fetch(url = '', host = '', options = {}): Promise<Response> {
    const fetchUrl = `${host}${url}`;
    const fetchOptions = this.getOptions(options);

    return fetch(fetchUrl, fetchOptions);
  }

  /**
   * Отправить запрос.
   * @param url Адрес.
   * @return Ответ.
   */
  requestLocal<T>(url = ''): Promise<T> {
    return this.fetch(url, '/local').then(this.getJSON<T>);
  }
}

export const api = new Api();
