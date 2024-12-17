import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { Search } from "lucide-react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
  };

  return (
    <section className="px-4 py-20 text-center md:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-5xl space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Unlock Your Potential with Expert-Led Online Courses
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-gray-600 dark:text-gray-300 md:text-xl">
          Join millions of learners worldwide and master new skills with our
          cutting-edge learning platform
        </p>

        <form
          onSubmit={searchHandler}
          className="mx-auto flex max-w-2xl items-center gap-2 rounded-full bg-white p-2 shadow-lg dark:bg-gray-800"
        >
          <Input
            type="search"
            placeholder="What do you want to learn?"
            className="h-12 flex-1 rounded-full border-0 bg-transparent px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="h-12 rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}
