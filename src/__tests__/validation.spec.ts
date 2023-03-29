import { mockUser } from "../services/_utils";
import Validation from "../services/validation";

describe('Testing validation', () => {
    it('should return false', () => {
        const error = Validation(mockUser);
        expect(error).toBe(false);
    });
});