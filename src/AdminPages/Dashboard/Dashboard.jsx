import { TrendingUp, ShoppingCart, DollarSign, Star, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
    // Dummy Data
    const todayStats = {
        orders: 45,
        revenue: 12500,
        mostOrdered: "Margherita Pizza",
    };

    const yesterdayStats = {
        orders: 32,
        revenue: 9800,
        mostOrdered: "Veg Burger",
    };

    const weeklyRevenue = [
        { day: "Mon", revenue: 8500 },
        { day: "Tue", revenue: 9200 },
        { day: "Wed", revenue: 11000 },
        { day: "Thu", revenue: 7500 },
        { day: "Fri", revenue: 12500 },
        { day: "Sat", revenue: 14200 },
        { day: "Sun", revenue: 13500 },
    ];

    const topItems = [
        { id: 1, name: "Margherita Pizza", orders: 120 },
        { id: 2, name: "Veg Burger", orders: 95 },
        { id: 3, name: "Pasta Alfredo", orders: 78 },
        { id: 4, name: "French Fries", orders: 64 },
        { id: 5, name: "Paneer Tikka", orders: 50 },
    ];

    const reservations = [
        { id: 1, customer: "Rahul Sharma", time: "7:30 PM", table: "Table 3" },
        { id: 2, customer: "Neha Gupta", time: "8:00 PM", table: "Table 1" },
        { id: 3, customer: "Amit Kumar", time: "9:00 PM", table: "Table 2" },
    ];

    return (
        <div className="overflow-auto max-h-full">
            <h2 className="text-2xl font-bold mb-1 text-center header_color p-2">📊 Admin Dashboard</h2>

            {/* Today & Yesterday Overview */}
            <div className="grid md:grid-cols-2 gap-2 mb-2">
                {/* Today */}
                <div className="bg-gradient-to-r from-white to-[#1cd8cb] p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-3">Today’s Overview</h3>
                    <div className="grid grid-cols-3 text-center">
                        <div>
                            <ShoppingCart className="mx-auto text-blue-600" />
                            <p className="text-xl font-bold">{todayStats.orders}</p>
                            <p className="text-gray-500">Orders</p>
                        </div>
                        <div>
                            <DollarSign className="mx-auto text-green-600" />
                            <p className="text-xl font-bold">₹{todayStats.revenue}</p>
                            <p className="text-gray-500">Revenue</p>
                        </div>
                        <div>
                            <Star className="mx-auto text-yellow-500" />
                            <p className="text-md font-bold">{todayStats.mostOrdered}</p>
                            <p className="text-gray-500">Most Ordered</p>
                        </div>
                    </div>
                </div>

                {/* Yesterday */}
                <div className="bg-gradient-to-r from-white to-[#1cd8cb] p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-3">Yesterday’s Overview</h3>
                    <div className="grid grid-cols-3 text-center">
                        <div>
                            <ShoppingCart className="mx-auto text-blue-600" />
                            <p className="text-xl font-bold">{yesterdayStats.orders}</p>
                            <p className="text-gray-500">Orders</p>
                        </div>
                        <div>
                            <DollarSign className="mx-auto text-green-600" />
                            <p className="text-xl font-bold">₹{yesterdayStats.revenue}</p>
                            <p className="text-gray-500">Revenue</p>
                        </div>
                        <div>
                            <Star className="mx-auto text-yellow-500" />
                            <p className="text-md font-bold">{yesterdayStats.mostOrdered}</p>
                            <p className="text-gray-500">Most Ordered</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue Chart & Top Items */}
            <div className="grid md:grid-cols-2 gap-2 mb-2">
                {/* Revenue Trend */}
                <div className="bg-gradient-to-r from-white to-[#1cd8cb] p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="text-green-600" /> Weekly Revenue
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={weeklyRevenue}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#3b82f6" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Items */}
                <div className="bg-gradient-to-r from-white to-[#1cd8cb] p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-3">🔥 Top Selling Items</h3>
                    <ul>
                        {topItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between py-2 border-b last:border-none"
                            >
                                <span>{item.name}</span>
                                <span className="font-bold">{item.orders} orders</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Reservations */}
            <div className="bg-gradient-to-r from-[#69c2ef] to-[#9eeee9] p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="text-purple-600" /> Upcoming Reservations
                </h3>
                <ul>
                    {reservations.map((r) => (
                        <li
                            key={r.id}
                            className="flex justify-between py-2 border-b last:border-none"
                        >
                            <span>
                                <strong>{r.customer}</strong> – {r.time}
                            </span>
                            <span className="text-gray-500">{r.table}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
