import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, catchError, map, of } from 'rxjs';
import { AgendaItem, AgendaRegistro } from '../models/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private readonly firestore = inject(Firestore);
  private readonly coleccion = 'agenda_reencuentro';

  obtenerAgenda(): Observable<AgendaItem[]> {
    const ref = collection(this.firestore, this.coleccion);
    return (collectionData(ref, { idField: 'id' }) as Observable<AgendaItem[]>).pipe(
      map(items => [...items].sort((a, b) => this.claveOrden(a).localeCompare(this.claveOrden(b)))),
      catchError(() => of([]))
    );
  }

  async crearItem(item: AgendaRegistro): Promise<void> {
    const ref = collection(this.firestore, this.coleccion);
    await addDoc(ref, {
      ...this.limpiar(item),
      creadoEn: new Date().toISOString()
    });
  }

  actualizarItem(id: string, item: Partial<AgendaRegistro>): Promise<void> {
    return updateDoc(doc(this.firestore, this.coleccion, id), this.limpiar(item));
  }

  eliminarItem(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, this.coleccion, id));
  }

  private claveOrden(item: AgendaItem): string {
    const orden = String(item.orden ?? 999).padStart(3, '0');
    return `${item.fecha || '9999-12-31'} ${item.horaInicio || '99:99'} ${orden}`;
  }

  private limpiar<T extends Partial<AgendaRegistro>>(item: T): T {
    const data = { ...item };

    for (const key of ['titulo', 'lugar', 'descripcion'] as const) {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim();
      }
    }

    return data;
  }
}
