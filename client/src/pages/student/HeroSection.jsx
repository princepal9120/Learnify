import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link, useNavigate } from 'react-router-dom';
import BrutalButton from '@/components/brutal/BrutalButton';
import BrutalCard from '@/components/brutal/BrutalCard';
import BrutalInput from '@/components/brutal/BrutalInput';
import { ArrowRight, BookOpen, Search, Users, TrendingUp } from 'lucide-react';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const searchRef = useRef(null);
  const statsRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    // Hero text animation
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .to(titleRef.current, {
          duration: 0.8,
          opacity: 1,
          y: 0,
        }, 0)
        .to(subtitleRef.current, {
          duration: 0.8,
          opacity: 1,
          y: 0,
        }, 0.2)
        .to(searchRef.current, {
          duration: 0.8,
          opacity: 1,
          scale: 1,
        }, 0.4)
        .to(statsRef.current, {
          duration: 0.8,
          opacity: 1,
          y: 0,
        }, 0.6);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section ref={containerRef} className="min-h-screen bg-white pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div>
            <div
              ref={titleRef}
              className="opacity-0 translate-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tighter">
                Learn Anything.<br />Teach Everything.
              </h1>
            </div>

            <div
              ref={subtitleRef}
              className="opacity-0 translate-y-8"
            >
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg font-medium">
                Join thousands of students and instructors on Learnify. Discover, create, and master skills in a clean, structured learning environment.
              </p>
            </div>

            <div className="flex gap-4 mb-12 flex-wrap">
              <Link to="/courses">
                <BrutalButton size="lg" variant="primary">
                  Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
                </BrutalButton>
              </Link>
              <Link to="/admin/dashboard">
                <BrutalButton size="lg" variant="outline">
                  Teach Now
                </BrutalButton>
              </Link>
            </div>

            <div
              ref={statsRef}
              className="opacity-0 translate-y-8 grid grid-cols-3 gap-6"
            >
              <div className="border-l-3 border-black pl-4">
                <p className="text-3xl font-black">10K+</p>
                <p className="text-gray-600 text-sm font-medium">Active Students</p>
              </div>
              <div className="border-l-3 border-black pl-4">
                <p className="text-3xl font-black">500+</p>
                <p className="text-gray-600 text-sm font-medium">Courses</p>
              </div>
              <div className="border-l-3 border-black pl-4">
                <p className="text-3xl font-black">4.9★</p>
                <p className="text-gray-600 text-sm font-medium">Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <BrutalCard className="p-8 border-3">
                <div className="space-y-6">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-black">
                    <div className="text-center">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600 font-bold">Featured Course</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Course Progress</span>
                      <span className="font-black">65%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 border-2 border-black rounded-sm overflow-hidden">
                      <div className="h-full bg-accent w-2/3"></div>
                    </div>
                  </div>
                </div>
              </BrutalCard>
            </motion.div>
          </div>
        </div>

        {/* Search Bar Section */}
        <div
          ref={searchRef}
          className="opacity-0 scale-75 py-16 border-t-3 border-b-3 border-black"
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-sm font-black text-gray-600 mb-8 uppercase tracking-widest">Find Your Next Skill</p>
            <form onSubmit={searchHandler} className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <BrutalInput
                  type="text"
                  placeholder="Search courses, skills, instructors..."
                  className="pl-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <BrutalButton size="lg" variant="primary">
                Search
              </BrutalButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
