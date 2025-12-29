import { useState, useEffect } from "react";
import { orderService } from "../services/orderService";
import type { Order, OrderStatus } from "../types";
import { formatPrice } from "../utils/format";
import { Package, Search, Filter, Lock } from "lucide-react";
import { Button } from "../components/Button";

const statusColors: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<OrderStatus, string> = {
    pending: "Pendiente",
    confirmed: "Confirmado",
    shipped: "En Camino",
    delivered: "Entregado",
    cancelled: "Cancelado",
};

export const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    const [orders, setOrders] = useState<Order[]>([]);
    const [filter, setFilter] = useState<OrderStatus | "all">("all");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedAuth = sessionStorage.getItem("adminAuth");
        if (savedAuth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;

        const unsubscribe = orderService.subscribeToOrders((data) => {
            setOrders(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "43212395") {
            setIsAuthenticated(true);
            sessionStorage.setItem("adminAuth", "true");
        } else {
            alert("Contraseña incorrecta");
        }
    };

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        try {
            await orderService.updateOrderStatus(orderId, newStatus);
        } catch (error) {
            alert("Error al actualizar estado");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Administrativo</h2>
                    <p className="text-gray-500 mb-6">Por favor ingrese el código de acceso.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Código de acceso"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-center text-lg tracking-widest"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
                            Ingresar
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    const filteredOrders = orders.filter((order) => {
        const matchesFilter = filter === "all" || order.status === filter;
        const matchesSearch =
            order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
            order.id?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) return <div className="p-8 text-center">Cargando pedidos...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <Package className="text-emerald-600" /> Panel de Pedidos
                </h1>
                <Button
                    variant="outline"
                    onClick={() => {
                        setIsAuthenticated(false);
                        sessionStorage.removeItem("adminAuth");
                    }}
                    className="text-sm"
                >
                    Cerrar Sesión
                </Button>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Search className="text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o ID..."
                        className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <Filter size={20} className="text-gray-500" />
                    {(["all", "pending", "confirmed", "shipped", "delivered"] as const).map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap border transition ${filter === s
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            {s === "all" ? "Todos" : statusLabels[s]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Fecha</th>
                                <th className="p-4">Cliente</th>
                                <th className="p-4">Items</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Estado</th>
                                <th className="p-4">Entrega</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 font-mono text-xs text-gray-500">#{order.id?.slice(-6)}</td>
                                    <td className="p-4">{order.createdAt?.toLocaleDateString()} <br /> <span className="text-xs text-gray-400">{order.createdAt?.toLocaleTimeString()}</span></td>
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{order.customer.name}</div>
                                        <div className="text-xs">{order.customer.phone}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="max-w-xs truncate" title={order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}>
                                            {order.items.length} productos
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold text-gray-900">{formatPrice(order.total)}</td>
                                    <td className="p-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id!, e.target.value as OrderStatus)}
                                            className={`px-2 py-1 rounded text-xs font-semibold border-none outline-none cursor-pointer appearance-none text-center ${statusColors[order.status]}`}
                                        >
                                            {Object.entries(statusLabels).map(([key, label]) => (
                                                <option key={key} value={key} className="bg-white text-gray-900">
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-4 text-xs">
                                        <span className="capitalize block">{order.customer.deliveryMethod}</span>
                                        <span className="text-gray-400 truncate max-w-[150px] block" title={order.customer.address}>{order.customer.address}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredOrders.length === 0 && (
                    <div className="p-12 text-center text-gray-400">
                        No se encontraron pedidos con estos filtros.
                    </div>
                )}
            </div>
        </div>
    );
};
