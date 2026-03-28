import { AppError } from "../errors/AppError.js";
import User from "./user.model.js";
export class UserService {
    static delete = async (user) => {
        try {
            const userExists = await User.findOne({
                email: user.email
            });
            if (!userExists) {
                throw new AppError('Credenciales incorrectas', 404);
            }
            await userExists.deleteOne();
        }
        catch (error) {
            if (error instanceof AppError)
                throw error;
            throw new Error('Hubo un error al eliminar el usuario');
        }
    };
}
