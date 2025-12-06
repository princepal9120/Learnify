import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGetCourseDetailQuery } from '@/features/api/courseApi';
import BrutalCard from '@/components/brutal/BrutalCard';
import BrutalButton from '@/components/brutal/BrutalButton';
import BrutalBadge from '@/components/brutal/BrutalBadge';
import { Star, Users, Clock, BookOpen, CheckCircle, Play, Share2, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const { data: course, isLoading } = useGetCourseDetailQuery(courseId);
    const [isWishlisted, setIsWishlisted] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-2xl font-bold">Loading course...</div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-black mb-4">Course Not Found</h2>
                    <Link to="/courses">
                        <BrutalButton variant="primary">Back to Courses</BrutalButton>
                    </Link>
                </div>
            </div>
        );
    }

    const courseData = course?.course || course;

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-black text-white py-4 px-4 md:px-8 sticky top-0 z-40 border-b-3 border-white">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/courses" className="font-bold hover:underline flex items-center gap-2">
                        ← Back
                    </Link>
                    <h1 className="text-xl font-black hidden md:block">{courseData?.courseTitle}</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                        <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Split Screen Layout */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Video Player & Content */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Video Player */}
                        <BrutalCard className="border-3 mb-8 overflow-hidden bg-black">
                            <div className="aspect-video bg-gray-900 flex items-center justify-center relative group">
                                <img
                                    src={courseData?.courseThumbnail}
                                    alt={courseData?.courseTitle}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                    <button className="w-16 h-16 bg-accent border-3 border-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                        <Play className="w-8 h-8 text-black fill-black" />
                                    </button>
                                </div>
                            </div>
                        </BrutalCard>

                        {/* Course Info Tabs */}
                        <div className="mb-8">
                            <div className="flex gap-2 mb-6 border-b-2 border-black overflow-x-auto pb-2">
                                {['Overview', 'Curriculum', 'Reviews', 'Requirements'].map((tab) => (
                                    <button
                                        key={tab}
                                        className="px-4 py-2 font-bold text-sm border-b-3 border-transparent hover:border-black whitespace-nowrap"
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Overview Tab Content */}
                            <div className="space-y-8">
                                {/* Description */}
                                <div>
                                    <h2 className="text-3xl font-black mb-4">About This Course</h2>
                                    <p className="text-gray-700 leading-relaxed text-lg mb-4">
                                        {courseData?.description || 'Course description not available.'}
                                    </p>
                                </div>

                                {/* What You'll Learn - Bento Grid */}
                                <div>
                                    <h3 className="text-2xl font-black mb-4">What You'll Learn</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            'Master core fundamentals and best practices',
                                            'Build real-world projects from scratch',
                                            'Understand advanced concepts and patterns',
                                            'Join a supportive community of learners',
                                        ].map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <BrutalCard className="border-2 p-4 flex items-start gap-3 hover:shadow-brutal-md">
                                                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-success" />
                                                    <span className="font-medium">{item}</span>
                                                </BrutalCard>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Curriculum Preview */}
                                <div>
                                    <h3 className="text-2xl font-black mb-4">Course Content</h3>
                                    <BrutalCard className="border-2 p-6">
                                        <div className="space-y-3">
                                            {courseData?.lectures?.slice(0, 5).map((lecture, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between p-3 bg-gray-50 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-lg font-black text-gray-400">{idx + 1}</span>
                                                        <div>
                                                            <p className="font-bold">{lecture.lectureTitle}</p>
                                                            <p className="text-sm text-gray-600">{lecture.videoDuration || '5 min'}</p>
                                                        </div>
                                                    </div>
                                                    <Play className="w-5 h-5 text-gray-400" />
                                                </div>
                                            ))}
                                            {courseData?.lectures?.length > 5 && (
                                                <button className="w-full p-3 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors rounded-lg">
                                                    View All {courseData.lectures.length} Lectures
                                                </button>
                                            )}
                                        </div>
                                    </BrutalCard>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Sidebar */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Course Card - Sticky */}
                        <div className="sticky top-20 space-y-4">
                            {/* Price Card */}
                            <BrutalCard className="border-3 p-6">
                                <div className="mb-6 pb-4 border-b-3 border-black">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-4xl font-black">₹{courseData?.coursePrice}</span>
                                        <span className="text-sm text-gray-600 line-through">₹{Math.ceil(courseData?.coursePrice * 1.5)}</span>
                                    </div>
                                    <BrutalBadge variant="success" className="text-xs">
                                        50% Off
                                    </BrutalBadge>
                                </div>

                                <BrutalButton variant="primary" size="lg" fullWidth className="mb-3">
                                    Enroll Now
                                </BrutalButton>
                                <BrutalButton variant="outline" size="lg" fullWidth>
                                    Add to Cart
                                </BrutalButton>

                                <p className="text-center text-xs text-gray-600 mt-4 font-medium">
                                    30-day money-back guarantee
                                </p>
                            </BrutalCard>

                            {/* Course Stats */}
                            <BrutalCard className="border-2 p-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <p className="text-xs text-gray-600 font-bold uppercase">Students</p>
                                        <p className="font-black">12,483</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <p className="text-xs text-gray-600 font-bold uppercase">Duration</p>
                                        <p className="font-black">{courseData?.lectures?.length || 20} hrs</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BookOpen className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <p className="text-xs text-gray-600 font-bold uppercase">Lessons</p>
                                        <p className="font-black">{courseData?.lectures?.length || 50}</p>
                                    </div>
                                </div>
                            </BrutalCard>

                            {/* Rating */}
                            <BrutalCard className="border-2 p-4 text-center">
                                <div className="flex justify-center gap-1 mb-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                                    ))}
                                </div>
                                <p className="font-black text-xl mb-1">4.9/5.0</p>
                                <p className="text-xs text-gray-600">Based on 2,341 reviews</p>
                            </BrutalCard>

                            {/* Instructor Card */}
                            <BrutalCard className="border-2 p-4">
                                <p className="text-xs font-bold text-gray-600 uppercase mb-3 tracking-wider">Instructor</p>
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-12 h-12 border-2 border-black">
                                        <AvatarImage src={courseData?.creator?.photoUrl} />
                                        <AvatarFallback className="font-bold">
                                            {courseData?.creator?.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold">{courseData?.creator?.name}</h4>
                                        <p className="text-xs text-gray-600">Expert Instructor</p>
                                    </div>
                                </div>
                                <button className="w-full mt-4 p-2 border-2 border-black font-bold rounded-lg hover:bg-black hover:text-white transition-colors text-sm">
                                    View Profile
                                </button>
                            </BrutalCard>

                            {/* Share */}
                            <BrutalCard className="border-2 p-4">
                                <p className="text-xs font-bold text-gray-600 uppercase mb-3 tracking-wider">Share</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 p-2 bg-gray-100 border-2 border-gray-300 rounded-lg font-bold text-sm hover:bg-gray-200">
                                        Facebook
                                    </button>
                                    <button className="flex-1 p-2 bg-gray-100 border-2 border-gray-300 rounded-lg font-bold text-sm hover:bg-gray-200">
                                        Twitter
                                    </button>
                                    <button className="flex-1 p-2 bg-gray-100 border-2 border-gray-300 rounded-lg font-bold text-sm hover:bg-gray-200">
                                        Copy
                                    </button>
                                </div>
                            </BrutalCard>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
