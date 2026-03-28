import { describe, it, expect, vi } from "vitest";
import { authenticate } from "../../../shared/middlewares/auth.middleware.js";
import User from "../../user/user.model.js";
// Mock completo de jsonwebtoken
vi.mock("jsonwebtoken", () => {
    return {
        default: {
            verify: vi.fn(() => ({ id: "123" })) // devuelve siempre id falso
        }
    };
});
describe("authenticate middleware", () => {
    it("debe devolver 401 si no hay usuario", async () => {
        const req = {
            headers: {}
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        const next = vi.fn();
        await authenticate(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });
    it("debe dejar pasar si hay usuario y token", async () => {
        const req = {
            headers: { authorization: "Bearer token-falso" }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        const next = vi.fn();
        // Mock de User.findById().select()
        vi.spyOn(User, "findById").mockReturnValue({
            select: vi.fn().mockResolvedValue({
                name: "jose maria",
                email: "jose@frlnc01@gmail.com",
                suscription: "free"
            })
        });
        await authenticate(req, res, next);
        expect(next).toHaveBeenCalled(); // next debe llamarse
        expect(req.user).toBeDefined(); // req.user debe existir
        expect(req.user.name).toBe("jose maria");
    });
});
