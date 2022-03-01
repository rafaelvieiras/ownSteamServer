import fetch from 'cross-fetch';

describe('Folder', () => {
  describe('Main', () => {
    it('List folders', async () => {
      const folders = await httpRequest('http://localhost:3000/folder', 'GET');

      expect(folders.status).toBe(200);
    });

    it('Create a new folder with system and delete the folder', async () => {
      const rash = Math.random().toString();
      const folderPayload = {
        name: `My Folder-${rash}`,
        path: `/home-${rash}`,
        system: '',
      };

      const system = await httpRequest('http://localhost:3000/system', 'GET');
      folderPayload.system = system.data[0].id;

      const folder = await httpRequest(
        'http://localhost:3000/folder',
        'POST',
        folderPayload,
      );

      const folderDelete = await httpRequest(
        `http://localhost:3000/folder/${folder.data.id}`,
        'DELETE',
      );

      expect(folder.data.name).toBe(folderPayload.name);
      expect(folder.data.path).toBe(folderPayload.path);
      expect(folder.data.systemId).toBe(folderPayload.system);
      expect(folder.status).toBe(201);
      expect(folderDelete.status).toBe(200);
    });

    it('List all local machine folders folders of a path', async () => {
      const folders = await httpRequest(
        'http://localhost:3000/folder/local',
        'GET',
      );

      expect(folders.data.length).toBeGreaterThanOrEqual(1);
    });

    // it('Create a folder and sync roms', async () => {
    //   const folders = await httpRequest(
    //     'http://localhost:3000/folder/local',
    //     'GET',
    //   );

    //   expect(folders.data.length).toBeGreaterThanOrEqual(1);
    // });
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
