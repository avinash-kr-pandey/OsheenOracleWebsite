"use client";
import React from "react";
import { Star, StarOff } from "lucide-react";
import Image from "next/image";
import { Review } from "@/types/product";

interface ProductReviewsProps {
  reviews: Review[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  const totalReviews = reviews.length;

  // ⭐ Rating count (5 to 1)
  const ratingCount = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const averageRating =
    totalReviews === 0
      ? 0
      : (
          reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1);

  return (
    <section className="bg-[#C4F9FF] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Customer <span className="text-pink-500">Reviews</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Honest feedback from verified customers ✨
          </p>
        </div>

        {/* ⭐ Rating Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Average */}
            <div className="text-center md:w-1/3">
              <p className="text-5xl font-bold text-gray-800">
                {averageRating}
              </p>
              <div className="flex justify-center my-2">
                {[...Array(5)].map((_, i) =>
                  i < Math.round(Number(averageRating)) ? (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-500 fill-yellow-400"
                    />
                  ) : (
                    <StarOff key={i} className="w-6 h-6 text-gray-300" />
                  )
                )}
              </div>
              <p className="text-gray-500 text-sm">
                Based on {totalReviews} reviews
              </p>
            </div>

            {/* Progress Bars */}
            <div className="flex-1 space-y-3">
              {ratingCount.map(({ star, count }) => {
                const percent =
                  totalReviews === 0 ? 0 : (count / totalReviews) * 100;

                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-10 text-sm font-medium">
                      {star}★
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-yellow-400 h-3 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-10 text-sm text-gray-600">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">
            No reviews available.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur border rounded-2xl shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-pink-400 mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{r.name}</p>
                    <p className="text-sm text-gray-400">{r.date}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(5)].map((_, index) =>
                    index < r.rating ? (
                      <Star
                        key={index}
                        className="w-5 h-5 text-yellow-500 fill-yellow-400"
                      />
                    ) : (
                      <StarOff
                        key={index}
                        className="w-5 h-5 text-gray-300"
                      />
                    )
                  )}
                </div>

                <p className="text-gray-700">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
