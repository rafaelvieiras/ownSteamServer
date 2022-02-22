import {} from '@nestjs/testing';
import fetch from 'cross-fetch';

describe('Folder', () => {
  describe('Main', () => {
    it('List folders without any folder', async () => {
      const folders = await fetch('http://localhost:3000/folder');
      const result = await folders.json();

      expect(result.length).toBe(0);
    });

    it('Create a new folder with system and delete the folder', async () => {
      const systemRequest = await fetch('http://localhost:3000/system');
      const system = await systemRequest.json();

      const folderRequest = await fetch('http://localhost:3000/folder', {
        method: 'POST',
        body: JSON.stringify({
          name: 'My folder',
          path: '/home',
          system: system[0].id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const folder = await folderRequest.json();

      const folderDeleteRequest = await fetch(
        `http://localhost:3000/folder/${folder.id}`,
        {
          method: 'DELETE',
        },
      );

      expect(folder.name).toBe('My folder');
      expect(folder.path).toBe('/home');
      expect(folder.systemId).toBe(system[0].id);
      expect(folderRequest.status).toBe(201);
      expect(folderDeleteRequest.status).toBe(200);
    });
  });
});
