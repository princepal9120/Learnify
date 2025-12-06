import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useGetEnrolledCoursesQuery } from '@/features/api/courseProgressApi';
import BrutalCard from '@/components/brutal/BrutalCard';
import BrutalButton from '@/components/brutal/BrutalButton';
import BrutalBadge from '@/components/brutal/BrutalBadge';
import { BookOpen, Award, TrendingUp, Calendar, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: enrolledCourses, isLoading } = useGetEnrolledCoursesQuery();
    const [stats, setStats] = useState({
        enrolledCourses: 0,
        completedCourses: 0,
        inProgressCourses: 0,
        totalHours: 120,
        currentStreak: 5,
        badges: 12,
    });

    useEffect(() => {
        if (enrolledCourses?.courses) {
            setStats({
                enrolledCourses: enrolledCourses.courses.length,
                completedCourses: enrolledCourses.courses.filter(c => c.progress === 100).length,
                inProgressCourses: enrolledCourses.courses.filter(c => c.progress > 0 && c.progress < 100).length,
                totalHours: enrolledCourses.courses.reduce((acc, c) => acc + (c.totalDuration || 0), 0),
                currentStreak: 5,
                badges: 12,
            });
        }
    }, [enrolledCourses]);

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
                <div className="mb-12">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black mb-2">
                                Welcome back, {user?.name?.split(' ')[0]}!
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Keep learning and building your skills
                            </p>
                        </div>
                        <Link to="/courses">
                            <BrutalButton variant="outline" size="lg">
                                Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
                            </BrutalButton>
                        </Link>
                    </div>
                    <div className="h-1 w-20 bg-black rounded-full"></div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <StatsTile
                            icon={BookOpen}
                            value={stats.enrolledCourses}
                            label="Enrolled"
                            color="primary"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <StatsTile
                            icon={CheckCircle}
                            value={stats.completedCourses}
                            label="Completed"
                            color="success"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <StatsTile
                            icon={TrendingUp}
                            value={stats.inProgressCourses}
                            label="In Progress"
                            color="secondary"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <StatsTile
                            icon={Clock}
                            value={`${stats.totalHours}h`}
                            label="Total Hours"
                            color="accent"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <StatsTile
                            icon={Calendar}
                            value={`${stats.currentStreak}d`}
                            label="Streak"
                            color="warning"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <StatsTile
                            icon={Award}
                            value={stats.badges}
                            label="Badges"
                            color="info"
                        />
                    </motion.div>
                </motion.div>

                {/* Main Bento Grid */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Continue Learning */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <ContinueLearningSection courses={enrolledCourses?.courses || []} isLoading={isLoading} />
                    </motion.div>

                    {/* Learning Goals */}
                    <motion.div variants={itemVariants}>
                        <LearningGoalsSection />
                    </motion.div>

                    {/* Progress Overview */}
                    <motion.div variants={itemVariants}>
                        <ProgressOverviewSection stats={stats} />
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <RecentActivitySection />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

const StatsTile = ({ icon: Icon, value, label, color }) => {
    const colorMap = {
        primary: 'border-black bg-white text-black',
        secondary: 'border-secondary bg-secondary/10 text-secondary',
        success: 'border-success bg-success/10 text-success',
        accent: 'border-accent bg-accent/10 text-black',
        warning: 'border-warning bg-warning/10 text-black',
        info: 'border-info bg-info/10 text-info',
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            <BrutalCard className={`p-4 border-3 ${colorMap[color]} text-center`}>
                <Icon className="w-6 h-6 mx-auto mb-2 opacity-60" />
                <p className="text-2xl font-black">{value}</p>
                <p className="text-xs font-bold uppercase tracking-wider opacity-70">{label}</p>
            </BrutalCard>
        </motion.div>
    );
};

const ContinueLearningSection = ({ courses, isLoading }) => {
    const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100).slice(0, 3);

    return (
        <BrutalCard className="border-3 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
                <h3 className="text-2xl font-black">Continue Learning</h3>
                <BrutalBadge variant="accent">{inProgressCourses.length} courses</BrutalBadge>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center py-8 text-gray-600">Loading courses...</div>
                ) : inProgressCourses.length > 0 ? (
                    inProgressCourses.map((course, idx) => (
                        <motion.div
                            key={course._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-4 bg-gray-50 border-2 border-black rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="font-bold line-clamp-1 flex-1">{course.title}</h4>
                                <span className="ml-2 text-sm font-bold whitespace-nowrap">{course.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 border border-black rounded-sm overflow-hidden">
                                <motion.div
                                    className="h-full bg-accent"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${course.progress}%` }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">No courses in progress</p>
                        <Link to="/courses">
                            <BrutalButton variant="outline" size="sm">
                                Explore Courses
                            </BrutalButton>
                        </Link>
                    </div>
                )}
            </div>
        </BrutalCard>
    );
};

const LearningGoalsSection = () => {
    const goals = [
        { title: 'Complete 1 Course', completed: false },
        { title: 'Learn Web Dev', completed: true },
        { title: '10 Day Streak', completed: false },
        { title: 'Get 5 Badges', completed: true },
    ];

    return (
        <BrutalCard className="border-3 p-6 h-full">
            <h3 className="text-xl font-black mb-4 pb-3 border-b-2 border-black">Learning Goals</h3>
            <div className="space-y-3">
                {goals.map((goal, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-gray-50 border-2 border-black rounded-lg"
                    >
                        <input
                            type="checkbox"
                            checked={goal.completed}
                            readOnly
                            className="w-5 h-5 border-2 border-black cursor-pointer"
                        />
                        <span className={`font-bold flex-1 ${goal.completed ? 'line-through text-gray-400' : ''}`}>
                            {goal.title}
                        </span>
                    </motion.div>
                ))}
            </div>
        </BrutalCard>
    );
};

const ProgressOverviewSection = ({ stats }) => {
    return (
        <BrutalCard className="border-3 p-6">
            <h3 className="text-xl font-black mb-4 pb-3 border-b-2 border-black">Progress</h3>
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="font-bold text-sm">Overall Progress</span>
                        <span className="font-black">65%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 border-2 border-black rounded-sm overflow-hidden">
                        <motion.div
                            className="h-full bg-accent"
                            initial={{ width: 0 }}
                            animate={{ width: '65%' }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                </div>

                <div className="border-t-2 border-black pt-4">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">
                        This Week
                    </p>
                    <div className="grid grid-cols-7 gap-1">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                            <div
                                key={day}
                                className={`h-8 rounded-sm border-2 border-black flex items-center justify-center text-xs font-bold ${idx < 5 ? 'bg-accent' : 'bg-gray-100'
                                    }`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BrutalCard>
    );
};

const RecentActivitySection = () => {
    const activities = [
        { type: 'completed', course: 'React Fundamentals', time: '2 hours ago' },
        { type: 'badge', course: 'Earned "Fast Learner" badge', time: '1 day ago' },
        { type: 'enrolled', course: 'Advanced JavaScript', time: '3 days ago' },
    ];

    return (
        <BrutalCard className="border-3 p-6">
            <h3 className="text-2xl font-black mb-6 pb-4 border-b-2 border-black">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-4 p-4 bg-gray-50 border-2 border-black rounded-lg"
                    >
                        <div className="flex-shrink-0 w-10 h-10 bg-accent border-2 border-black rounded-lg flex items-center justify-center font-bold">
                            {activity.type === 'completed' && '✓'}
                            {activity.type === 'badge' && '⭐'}
                            {activity.type === 'enrolled' && '+'}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm">{activity.course}</p>
                            <p className="text-xs text-gray-600">{activity.time}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </BrutalCard>
    );
};

export default StudentDashboard;
