import React from "react";
import CommonPageHeader from "../CommonPages/CommonPageHeader";
import { blogPosts } from "@/utils/blog";

const Blog = () => {
  return (
    <div className=" min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col justify-center text-center border-b border-black/30">
        <CommonPageHeader title="News & Blog" subtitle="Home - News & Blog" />
      </div>

      {/* Page Layout */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT BLOG POSTS */}
        <div className="lg:col-span-2 space-y-10">
          {blogPosts?.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#6a5f57] to-[#8a7967] text-white shadow-2xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:translate-y-[-5px]"
            >
              {/* Blog Image */}
              <div className="relative h-72 bg-cover bg-[center_30%] group overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-[center_30%] transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {post.category}
                </div>
              </div>

              {/* Blog Content */}
              <div className="bg-gradient-to-br from-[#1e1a17] to-[#2a231e] p-8">
                <div className="flex items-center gap-4 text-sm opacity-80 mb-3">
                  <div className="flex items-center gap-1">
                    <span>📅</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💬</span>
                    <span>{post.comments} Comments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>👁️</span>
                    <span>{post.views} Views</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                  {post.title}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  {/* <button className="group flex items-center gap-2 text-orange-300 hover:text-orange-200 font-semibold transition-all duration-300">
                    READ MORE
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </button> */}

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 flex items-center justify-center text-xs">
                      {post.authorInitials}
                    </div>
                    <span className="text-sm opacity-70">{post.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-10">
          {/* Search Box */}
          <div className="bg-gradient-to-br from-[#362f2b] to-[#4a4038] p-6 rounded-2xl text-white shadow-xl border border-white/10">
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              🔍 Search the Cosmos
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search celestial wisdom..."
                className="w-full bg-[#2a231e] border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-purple-600 px-4 py-1 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all">
                Search
              </button>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-gradient-to-br from-[#362f2b] to-[#4a4038] p-6 rounded-2xl text-white shadow-xl border border-white/10">
            <h3 className="font-bold text-lg mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              🌟 Recent Cosmic Insights
            </h3>
            <div className="space-y-4">
              {blogPosts.slice(0, 4).map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                >
                  <div
                    className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-orange-300 mb-1">{post.date}</p>
                    <p className="text-sm font-medium truncate group-hover:text-orange-200 transition-colors">
                      {post.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-gradient-to-br from-[#362f2b] to-[#4a4038] p-6 rounded-2xl text-white shadow-xl border border-white/10">
            <h3 className="font-bold text-lg mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              📂 Cosmic Categories
            </h3>
            <div className="space-y-3">
              {[
                "Zodiac Signs",
                "Planetary Transits",
                "Moon Phases",
                "Birth Charts",
                "Cosmic Events",
                "Spiritual Growth",
              ].map((category, index) => (
                <div
                  key={category}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                >
                  <span className="text-sm group-hover:text-orange-200 transition-colors">
                    {category}
                  </span>
                  <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-xs px-2 py-1 rounded-full">
                    {index + 12}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-gradient-to-br from-[#362f2b] to-[#4a4038] p-6 rounded-2xl text-white shadow-xl border border-white/10">
            <h3 className="font-bold text-lg mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              🏷️ Cosmic Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Zodiac",
                "Astrology",
                "Horoscope",
                "Planets",
                "Moon Magic",
                "Tarot",
                "Spirituality",
                "Cosmic",
                "Birth Chart",
                "Manifestation",
                "Energy",
                "Universe",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 border border-white/20 rounded-xl text-xs hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:border-transparent hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-gradient-to-br from-[#362f2b] to-[#4a4038] p-6 rounded-2xl text-white shadow-xl border border-white/10">
            <h3 className="font-bold text-lg mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              📸 Cosmic Gallery
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=200&h=200&fit=crop",
                "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=200&h=200&fit=crop",
              ].map((src, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-cover bg-center cursor-pointer hover:scale-105 transition-transform duration-300 border border-white/10"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </div>
            <button className="w-full bg-gradient-to-r from-orange-500 to-purple-600 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
              Follow @CosmicWisdom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
