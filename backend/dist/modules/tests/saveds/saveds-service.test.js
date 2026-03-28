import { describe, expect, it, vi } from "vitest";
import FileModel from "../../file/file.model.js";
import { SavedsService } from "../../saveds/saveds.service.js";
import { AppError } from "../../errors/AppError.js";
import YoutubeVideo from "../../youtube-video/youtube-video.model.js";
describe('Saveds Service.getFiles', () => {
    it('debe devolver un archivo válido', async () => {
        const mockUser = { id: 123 };
        vi.spyOn(FileModel, "find").mockResolvedValue([
            { fileId: "1", title: "Archivo 1" }
        ]);
        const files = await SavedsService.getFiles(mockUser);
        expect(files).toHaveLength(1);
        expect(files[0].title).toBe('Archivo 1');
    });
    it('debe lanzar error si no hay usuario', async () => {
        await expect(SavedsService.getFiles(null)).rejects.toThrow(AppError);
    });
});
describe('Saveds Service.getYoutubeFiles', () => {
    it('debe devolver un archivo válido', async () => {
        const mockUser = { id: 123 };
        vi.spyOn(YoutubeVideo, "find").mockResolvedValue([
            { fileId: "1", title: "Archivo 1" }
        ]);
        const files = await SavedsService.getYoutubeFiles(mockUser);
        expect(files).toHaveLength(1);
        expect(files[0].title).toBe('Archivo 1');
    });
    it('debe lanzar un error si no hay usuario', async () => {
        await expect(SavedsService.getYoutubeFiles(null)).rejects.toThrow(AppError);
    });
});
describe('Saveds Service.getFile', () => {
    it('debe devolver archivo válido', async () => {
        const id = '123';
        const mockUser = { id: 123 };
        vi.spyOn(YoutubeVideo, "find").mockResolvedValue([
            { fileId: "1", title: "Archivo 1" }
        ]);
        vi.spyOn(FileModel, "find").mockResolvedValue([
            { fileId: "1", title: "Archivo 1" }
        ]);
        const file = await SavedsService.getFile(id);
        expect(file[0].title).toBe('Archivo 1');
    });
});
describe('Saveds Service.delete', () => {
    it('Debe eliminar un archivo de Youtube si no existe en FileModel', async () => {
        const id = '123';
        const youtubeFileMock = {
            deleteOne: vi.fn().mockResolvedValue(true)
        };
        // Mockeamos los findOne
        vi.spyOn(FileModel, 'findOne').mockResolvedValue(null); // no existe en FileModel
        vi.spyOn(YoutubeVideo, 'findOne').mockResolvedValue(youtubeFileMock);
        const deleted = await SavedsService.delete(id);
        expect(youtubeFileMock.deleteOne).toHaveBeenCalled();
        expect(deleted).toBe(true);
    });
    it('Debe eliminar un archivo de FileModel si existe', async () => {
        const id = '456';
        const fileMock = {
            deleteOne: vi.fn().mockResolvedValue(true)
        };
        vi.spyOn(FileModel, 'findOne').mockResolvedValue(fileMock);
        const deleted = await SavedsService.delete(id);
        expect(fileMock.deleteOne).toHaveBeenCalled();
        expect(deleted).toBe(true);
    });
});
describe('Saveds Service.edit', () => {
    it('debe editar el titulo de un archivo del usuario si existe', async () => {
        const id = '123';
        const newTitle = 'nuevo titulo';
        const fileMock = {
            title: 'viejo titulo',
            save: vi.fn().mockResolvedValue(true)
        };
        vi.spyOn(FileModel, 'findOne').mockResolvedValue(fileMock);
        vi.spyOn(YoutubeVideo, 'findOne').mockResolvedValue(null);
        await SavedsService.edit(newTitle, id);
        expect(fileMock.title).toBe(newTitle);
        expect(fileMock.save).toHaveBeenCalled();
    });
    it('debe editar el título de un archivo de youtube si no existe en FileModel', async () => {
        const id = '123';
        const newTitle = 'nuevo titulo';
        const youtubeFileMock = {
            title: 'Viejo titulo',
            save: vi.fn().mockResolvedValue(true)
        };
        vi.spyOn(FileModel, 'findOne').mockResolvedValue(null);
        vi.spyOn(YoutubeVideo, 'findOne').mockResolvedValue(youtubeFileMock);
        await SavedsService.edit(newTitle, id);
        expect(youtubeFileMock.title).toBe(newTitle);
        expect(youtubeFileMock.save).toHaveBeenCalled();
    });
});
