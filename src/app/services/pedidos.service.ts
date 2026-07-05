import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pedido, PedidoRegistro } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private readonly firestore = inject(Firestore);
  private readonly coleccion = 'pedidos_camisetas';

  obtenerPedidos(): Observable<Pedido[]> {
    const ref = collection(this.firestore, this.coleccion);
    return (collectionData(ref, { idField: 'id' }) as Observable<Pedido[]>).pipe(
      map(pedidos => [...pedidos].sort((a, b) => (a.numero ?? 0) - (b.numero ?? 0)))
    );
  }

  async agregarPedido(pedido: PedidoRegistro): Promise<void> {
    const response = await fetch(this.collectionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: this.toFirestoreFields({
          ...pedido,
          nombre: pedido.nombre.trim(),
          telefono: pedido.telefono?.trim() || '',
          notas: pedido.notas?.trim() || '',
          fecha: new Date().toISOString()
        })
      })
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.error?.message || 'Firebase rechazó el registro.');
    }
  }

  eliminarPedido(id: string): Promise<void> {
    const ref = doc(this.firestore, this.coleccion, id);
    return deleteDoc(ref);
  }

  async verificarNumeroExiste(numero: number): Promise<boolean> {
    const response = await fetch(this.runQueryUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: this.coleccion }],
          where: {
            fieldFilter: {
              field: { fieldPath: 'numero' },
              op: 'EQUAL',
              value: { integerValue: String(numero) }
            }
          },
          limit: 1
        }
      })
    });

    if (!response.ok) {
      return false;
    }

    const rows = await response.json();
    return Array.isArray(rows) && rows.some(row => !!row.document);
  }

  private get collectionUrl(): string {
    return `${this.firestoreBaseUrl}/documents/${this.coleccion}?key=${environment.firebase.apiKey}`;
  }

  private get runQueryUrl(): string {
    return `${this.firestoreBaseUrl}/documents:runQuery?key=${environment.firebase.apiKey}`;
  }

  private get firestoreBaseUrl(): string {
    return `https://firestore.googleapis.com/v1/projects/${environment.firebase.projectId}/databases/(default)`;
  }

  private toFirestoreFields(pedido: PedidoRegistro & { fecha: string }): Record<string, any> {
    return {
      nombre: { stringValue: pedido.nombre },
      numero: { integerValue: String(pedido.numero ?? 0) },
      talla: { stringValue: pedido.talla },
      genero: { stringValue: pedido.genero },
      corte: { stringValue: pedido.corte },
      telefono: { stringValue: pedido.telefono || '' },
      notas: { stringValue: pedido.notas || '' },
      fecha: { stringValue: pedido.fecha }
    };
  }
}
