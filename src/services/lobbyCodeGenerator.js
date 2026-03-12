import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ123456789', 6);
export const generateLobbyCode = () => nanoid();

export default generateLobbyCode;