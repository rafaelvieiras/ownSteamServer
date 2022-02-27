import {} from '@nestjs/testing';
import fetch from 'cross-fetch';

describe('Folder', () => {
  describe('Main', () => {
    it('List folders without any folder', async () => {
      const folders = await httpRequest('http://localhost:3000/folder', 'GET');

      expect(folders.data.length).toBe(0);
    });

    it('Create a new folder with system and delete the folder', async () => {
      const system = await httpRequest('http://localhost:3000/system', 'GET');

      console.log(system);

      const folder = await httpRequest('http://localhost:3000/folder', 'POST', {
        name: 'My folder',
        path: '/home',
        system: system.data[0].id,
      });

      const folderDelete = await httpRequest(
        `http://localhost:3000/folder/${folder.data.id}`,
        'DELETE',
      );

      expect(folder.data.name).toBe('My folder');
      expect(folder.data.path).toBe('/home');
      expect(folder.data.systemId).toBe(system.data[0].id);
      expect(folder.status).toBe(201);
      expect(folderDelete.status).toBe(200);
    });

    it('List all local machine folders folders of a path', async () => {
      const folders = await httpRequest(
        'http://localhost:3000/folder/local',
        'GET',
      );

      console.log(folders);

      expect(folders.data.length).toBeGreaterThanOrEqual(1);
    });
  });
});

function httpRequest(url: string, method: string, body?: any): Promise<any> {
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
        if (response.status === 200) {
          resolve({ status: response.status, data: await response.json() });
        } else {
          reject({ status: response.status, data: await response.json() });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
