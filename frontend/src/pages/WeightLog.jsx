import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiPlus, FiHash } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useAuth, useUser } from "@clerk/clerk-react"; // Added Clerk hooks
import { setAuthToken, fetchWeightLogs, addWeightLog } from "../services/api"; // Added setAuthToken
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WeightLog() {
    const { getToken } = useAuth();
    const { user } = useUser();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newLog, setNewLog] = useState({ weight: "", unit: "kg" });

    useEffect(() => {
        if (user) {
            loadLogs();
        }
    }, [user]);

    const loadLogs = async () => {
        try {
            const token = await getToken();
            if (token) setAuthToken(token);
            const data = await fetchWeightLogs();
            setLogs(data);
        } catch (error) {
            console.error("Error loading weight logs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddLog = async (e) => {
        e.preventDefault();
        if (!newLog.weight) return;

        try {
            await addWeightLog({
                weight: parseFloat(newLog.weight),
                unit: newLog.unit
            });
            setNewLog({ ...newLog, weight: "" });
            loadLogs();
        } catch (error) {
            console.error("Error adding weight log:", error);
        }
    };

    // Format data for chart
    const chartData = logs.map(log => ({
        date: new Date(log.date).toLocaleDateString(),
        weight: log.weight
    }));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="pt-24 pb-12 px-4 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl"
                >
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Column: Form & List */}
                        <div className="flex-1 space-y-8">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                        <FiTrendingUp className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                                    </div>
                                    <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Weight Tracker</h1>
                                </div>

                                <form onSubmit={handleAddLog} className="flex gap-4 items-end mb-8">
                                    <div className="flex-1">
                                        <label className="label text-sm font-medium">Current Weight</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                step="0.1"
                                                placeholder="0.0"
                                                value={newLog.weight}
                                                onChange={(e) => setNewLog({ ...newLog, weight: e.target.value })}
                                                className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                            <select
                                                value={newLog.unit}
                                                onChange={(e) => setNewLog({ ...newLog, unit: e.target.value })}
                                                className="select select-bordered dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="kg">kg</option>
                                                <option value="lbs">lbs</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        <FiPlus /> Log
                                    </button>
                                </form>

                                <div className="divider">History</div>

                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {logs.slice().reverse().map((log) => (
                                        <div key={log._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                            <span className="text-sm text-gray-500">{new Date(log.date).toLocaleDateString()}</span>
                                            <span className="font-bold dark:text-white">{log.weight} <small>{log.unit}</small></span>
                                        </div>
                                    ))}
                                    {!loading && logs.length === 0 && <p className="text-center text-gray-400">No data yet.</p>}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Chart */}
                        <div className="flex-1">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 h-full">
                                <h3 className="text-xl font-bold mb-6 dark:text-white">Progress Overview</h3>
                                <div className="h-64 md:h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                                            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="weight"
                                                stroke="#2563eb"
                                                strokeWidth={4}
                                                dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                                                activeDot={{ r: 6 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
