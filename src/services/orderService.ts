import {
    collection,
    addDoc,
    updateDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    Timestamp
} from "firebase/firestore";
import { db } from "../firebase/config";
import type { Order, OrderStatus } from "../types";

const COLLECTION_NAME = "orders";

export const orderService = {
    // Crear un nuevo pedido
    async createOrder(orderData: Omit<Order, "id" | "createdAt" | "status">) {
        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                ...orderData,
                status: "pending",
                createdAt: serverTimestamp(),
            });
            return docRef.id;
        } catch (error) {
            console.error("Error creating order: ", error);
            throw error;
        }
    },

    // Escuchar pedidos en tiempo real
    subscribeToOrders(callback: (orders: Order[]) => void) {
        const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));

        return onSnapshot(q, (snapshot) => {
            const orders = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Convertir Timestamp de Firebase a Date de JS
                    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
                } as Order;
            });
            callback(orders);
        });
    },

    // Actualizar estado
    async updateOrderStatus(orderId: string, status: OrderStatus) {
        try {
            const orderRef = doc(db, COLLECTION_NAME, orderId);
            await updateDoc(orderRef, { status });
        } catch (error) {
            console.error("Error updating order status: ", error);
            throw error;
        }
    }
};
