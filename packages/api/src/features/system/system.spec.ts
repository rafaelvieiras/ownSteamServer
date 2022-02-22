import fetch from 'cross-fetch';

describe('System', () => {
  describe('Main', () => {
    it('List systems and get one default result or more', async () => {
      const systems = await fetch('http://localhost:3000/system');
      const result = await systems.json();

      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('Create a system and delete', async () => {
      const systems = await fetch('http://localhost:3000/system', {
        method: 'POST',
        body: JSON.stringify({
          name: 'My system',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await systems.json();
      expect(result.name).toBe('My system');

      const deleteSystem = await fetch(
        `http://localhost:3000/system/${result.id}`,
        {
          method: 'DELETE',
        },
      );

      expect(deleteSystem.status).toBe(200);
    });
  });
});
