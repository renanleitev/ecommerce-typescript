import { mockUser } from "../services/_utils";
import validationUser from "../services/validationUser";

describe('Testing validation', () => {
    it('should return false', () => {
        const error = validationUser(mockUser);
        expect(error).toBe(false);
    });
});