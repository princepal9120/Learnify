import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BrutalCard from '@/components/brutal/BrutalCard';
import BrutalButton from '@/components/brutal/BrutalButton';
import BrutalBadge from '@/components/brutal/BrutalBadge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, DollarSign, Star, Upload, BookOpen, Eye, MessageSquare } from 'lucide-react';

const InstructorDashboardTemplate = () => {
    const [timeRange, setTimeRange] = useState('month');

    // Sample data
    const analyticsData = [
        { name: 'Week 1', students: 120, revenue: 4200 },
        { name: 'Week 2', students: 150, revenue: 5100 },
        { name: 'Week 3', students: 180, revenue: 6300 },
        { name: 'Week 4', students: 220, revenue: 7800 },
    ];

    const courseStats = [
        { id: 1, title: 'React Fundamentals', students: 1234, rating: 4.8, reviews: 342, revenue: 45680 },
        { id: 2, title: 'Advanced JavaScript', students: 892, rating: 4.9, reviews: 251, revenue: 32150 },
        { id: 3, title: 'Web Design Basics', students: 654, rating: 4.6, reviews: 189, revenue: 23420 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black mb-2">Instructor Dashboard</h1>
                        <p className="text-gray-600 text-lg">Manage your courses and track performance</p>
                        <div className="h-1 w-20 bg-black rounded-full mt-4"></div>
                    </div>
                    <BrutalButton variant="primary" size="lg" className="flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Upload Course
                    </BrutalButton>
                </div>

                {/* KPI Cards - Bento Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <KPICard
                            icon={Users}
                            label="Total Students"
                            value="3,780"
                            change="+12%"
                            color="primary"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <KPICard
                            icon={DollarSign}
                            label="Total Revenue"
                            value="₹101,250"
                            change="+8%"
                            color="success"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <KPICard
                            icon={Star}
                            label="Avg Rating"
                            value="4.8/5.0"
                            change="+0.2"
                            color="accent"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <KPICard
                            icon={BookOpen}
                            label="Active Courses"
                            value="3"
                            change="1 new"
                            color="secondary"
                        />
                    </motion.div>
                </motion.div>

                {/* Charts - Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Revenue Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <BrutalCard className="border-3 p-6">
                            <div className="mb-6 pb-4 border-b-3 border-black flex justify-between items-center">
                                <h3 className="text-2xl font-black">Revenue Overview</h3>
                                <select
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    className="border-2 border-black px-3 py-2 rounded-lg font-bold focus:outline-none"
                                >
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                    <option value="year">This Year</option>
                                </select>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={analyticsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#FFFFFF',
                                            border: '2px solid #000000',
                                            borderRadius: '4px',
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#1A73E8"
                                        strokeWidth={3}
                                        dot={{ fill: '#1A73E8', r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </BrutalCard>
                    </motion.div>

                    {/* Student Growth Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <BrutalCard className="border-3 p-6">
                            <div className="mb-6 pb-4 border-b-3 border-black">
                                <h3 className="text-2xl font-black">Student Enrollment</h3>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={analyticsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#FFFFFF',
                                            border: '2px solid #000000',
                                            borderRadius: '4px',
                                        }}
                                    />
                                    <Bar dataKey="students" fill="#F7D900" stroke="#000000" strokeWidth={2} />
                                </BarChart>
                            </ResponsiveContainer>
                        </BrutalCard>
                    </motion.div>
                </div>

                {/* Courses Performance Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <BrutalCard className="border-3 p-6">
                        <div className="mb-6 pb-4 border-b-3 border-black">
                            <h3 className="text-2xl font-black">Your Courses</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b-2 border-black">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-black">Course</th>
                                        <th className="text-center px-4 py-3 font-black">Students</th>
                                        <th className="text-center px-4 py-3 font-black">Rating</th>
                                        <th className="text-center px-4 py-3 font-black">Reviews</th>
                                        <th className="text-right px-4 py-3 font-black">Revenue</th>
                                        <th className="text-center px-4 py-3 font-black">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-black">
                                    {courseStats.map((course, idx) => (
                                        <motion.tr
                                            key={course.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-4 py-4">
                                                <div>
                                                    <p className="font-bold">{course.title}</p>
                                                    <p className="text-xs text-gray-600">Course ID: {course.id}</p>
                                                </div>
                                            </td>
                                            <td className="text-center px-4 py-4 font-bold">{course.students}</td>
                                            <td className="text-center px-4 py-4">
                                                <div className="flex items-center justify-center gap-1">
                                                    <Star className="w-4 h-4 fill-accent text-accent" />
                                                    <span className="font-black">{course.rating}</span>
                                                </div>
                                            </td>
                                            <td className="text-center px-4 py-4 font-bold">{course.reviews}</td>
                                            <td className="text-right px-4 py-4 font-black">
                                                ₹{course.revenue.toLocaleString()}
                                            </td>
                                            <td className="text-center px-4 py-4 space-x-2">
                                                <button
                                                    title="View"
                                                    className="inline-flex items-center justify-center w-8 h-8 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    title="Edit"
                                                    className="inline-flex items-center justify-center w-8 h-8 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors"
                                                >
                                                    ✏️
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </BrutalCard>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <QuickActionCard
                            title="Upload New Lecture"
                            description="Add content to your courses"
                            icon="🎥"
                            action="Upload"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <QuickActionCard
                            title="View Student Messages"
                            description="Respond to student inquiries"
                            icon="💬"
                            action="Messages"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <QuickActionCard
                            title="Course Analytics"
                            description="Deep dive into metrics"
                            icon="📊"
                            action="Analyze"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

const KPICard = ({ icon: Icon, label, value, change, color }) => {
    const colorMap = {
        primary: 'border-black bg-white',
        secondary: 'border-secondary bg-secondary/10',
        success: 'border-success bg-success/10',
        accent: 'border-accent bg-accent/10',
        warning: 'border-warning bg-warning/10',
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            <BrutalCard className={`border-3 ${colorMap[color]} p-6`}>
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gray-100 border-2 border-black rounded-lg">
                        <Icon className="w-6 h-6 text-black" />
                    </div>
                    <BrutalBadge variant="success" className="text-xs">
                        {change}
                    </BrutalBadge>
                </div>
                <p className="text-3xl font-black mb-1">{value}</p>
                <p className="text-sm text-gray-600 font-bold uppercase tracking-wider">{label}</p>
            </BrutalCard>
        </motion.div>
    );
};

const QuickActionCard = ({ title, description, icon, action }) => {
    return (
        <BrutalCard className="border-3 p-6 hover:shadow-brutal-lg transition-all">
            <div className="text-4xl mb-4">{icon}</div>
            <h4 className="text-lg font-black mb-2">{title}</h4>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <BrutalButton variant="outline" size="sm" fullWidth>
                {action}
            </BrutalButton>
        </BrutalCard>
    );
};

export default InstructorDashboardTemplate;
