import { useState } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const useFilesystem = () => {
  const [contenidoLeido, setContenidoLeido] = useState<string>('');
  const [error, setError] = useState<string>('');

  const escribirArchivo = async (texto: string) => {
    try {
      await Filesystem.writeFile({
        path: 'reto7_archivo.txt',
        data: texto,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const leerArchivo = async () => {
    try {
      const contents = await Filesystem.readFile({
        path: 'reto7_archivo.txt',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      setContenidoLeido(contents.data.toString());
      setError('');
    } catch (err: any) {
      setError('Archivo no encontrado o formato inválido');
    }
  };

  return { contenidoLeido, error, escribirArchivo, leerArchivo };
};
