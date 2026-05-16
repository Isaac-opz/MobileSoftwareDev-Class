import { useState } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

type FileStatus = 'idle' | 'saved' | 'loaded' | 'error';

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : 'No se pudo escribir el archivo';
};

export const useFilesystem = () => {
  const [contenidoLeido, setContenidoLeido] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [estado, setEstado] = useState<FileStatus>('idle');

  const escribirArchivo = async (texto: string) => {
    try {
      await Filesystem.writeFile({
        path: 'reto7_archivo.txt',
        data: texto || 'Archivo creado desde ChallengeTailwind',
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      setEstado('saved');
      setMensaje('Archivo guardado dentro del almacenamiento privado de la app.');
      setError('');
    } catch (err: unknown) {
      setEstado('error');
      setMensaje('');
      setError(getErrorMessage(err));
    }
  };

  const leerArchivo = async () => {
    try {
      const contents = await Filesystem.readFile({
        path: 'reto7_archivo.txt',
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      setContenidoLeido(contents.data.toString());
      setEstado('loaded');
      setMensaje('Archivo leído correctamente desde el sandbox de la app.');
      setError('');
    } catch {
      setEstado('error');
      setMensaje('');
      setError('Archivo no encontrado. Escribe un texto y guarda el archivo primero.');
    }
  };

  return { contenidoLeido, error, mensaje, estado, escribirArchivo, leerArchivo };
};
