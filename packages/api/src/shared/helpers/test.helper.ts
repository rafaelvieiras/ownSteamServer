import fetch from 'cross-fetch';
export class TestHelper {
  static httpRequest(url: string, method: string, body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpOptions = {};

      if (body) {
        httpOptions = {
          body: JSON.stringify(body),
        };
      }

      fetch(url, {
        method,
        ...httpOptions,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (response) => {
          let data = {};

          try {
            data = await response.json();
          } catch (error) {}

          if (response.status >= 200 && response.status < 300) {
            resolve({ status: response.status, data });
          } else {
            reject({ status: response.status, data });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
