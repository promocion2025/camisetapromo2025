import { Injectable, inject } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class MediaStorageService {
  private readonly storage = inject(Storage);

  async subirImagenRecuerdo(file: File): Promise<{ url: string; path: string }> {
    const safeName = file.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '-')
      .toLowerCase();
    const path = `recuerdos/${Date.now()}-${safeName}`;
    const storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return { url, path };
  }

  eliminarPorPath(path: string): Promise<void> {
    return deleteObject(ref(this.storage, path));
  }
}
