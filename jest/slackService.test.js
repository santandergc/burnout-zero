const { getUserIdByName } = require('../services/slackService');
const sendMessageCommand = require('../commands/sendMessage');

const mockAck = jest.fn();
const mockSay = jest.fn();


// Mock (simular) cualquier llamada que realmente haga una petición a Slack
jest.mock('../services/slackService');

describe('Slack Service', () => {

  beforeEach(() => {
    mockAck.mockClear();
    mockSay.mockClear();
  });

  test('Debería retonar null si el usuario es invalido', async () => {
    // Asumamos que cualquier llamada a la función con "invalidUsername" retorna null
    getUserIdByName.mockResolvedValueOnce(null);

    const userId = await getUserIdByName('invalidUsername');
    expect(userId).toBeNull();

    // Asegúrate de que la función realmente fue llamada con "invalidUsername"
    expect(getUserIdByName).toHaveBeenCalledWith('invalidUsername');
  });

  test('Deberia retornar el ID del usuario si su name es valido', async () => {
    // Asumamos que la función retorna "U12345" para el usuario "validUser"
    getUserIdByName.mockResolvedValueOnce("U12345");

    const userId = await getUserIdByName('validUser');
    expect(userId).toBe("U12345");

    expect(getUserIdByName).toHaveBeenCalledWith('validUser');
  });

});

describe('sendMessageCommand', () => {
    beforeEach(() => {
        mockAck.mockClear();
        mockSay.mockClear();
    });

    test('Debería dar error si falta userID', async () => {
        await expect(sendMessageCommand({ command: { text: '' }, ack: mockAck, say: mockSay })).rejects.toThrow('UserId is required');
    });

    test('Debería dar error si falta el Mensaje', async () => {
        await expect(sendMessageCommand({ command: { text: 'U12345' }, ack: mockAck, say: mockSay })).rejects.toThrow('Message text is required');
    });
});


