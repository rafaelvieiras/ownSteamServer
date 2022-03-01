import { TestHelper } from '../../shared/helpers/test.helper';

describe('System', () => {
  describe('Main', () => {
    it('List library', async () => {
      const library = await TestHelper.httpRequest(
        'http://localhost:3000/library',
        'GET',
      );
      // const result = await library.json();

      expect(library.status).toBe(200);
    });

    // it('Create a library', async () => {
    //   const folders = await TestHelper.httpRequest('http://localhost:3000/folders', 'GET');
    //   const libraryPayload = {
    //     name: 'Main Library',
    //   }
    // });

    it('Start a sync job', async () => {
      const library = await TestHelper.httpRequest(
        'http://localhost:3000/library',
        'GET',
      );
      expect(library.data.length).toBeGreaterThanOrEqual(1);

      const libraryIdToSync = library.data[0].id;
      const syncJob = await TestHelper.httpRequest(
        'http://localhost:3000/library/sync',
        'POST',
        {
          libraryId: libraryIdToSync,
        },
      );
      await new Promise((r) => setTimeout(r, 2000));
      console.log(syncJob);
    });

    it('List all sync job running', async () => {
      const library = await TestHelper.httpRequest(
        'http://localhost:3000/library/sync',
        'GET',
      );
      expect(library.data.length).toBeGreaterThanOrEqual(1);
    });
  });
});
