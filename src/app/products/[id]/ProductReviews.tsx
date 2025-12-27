// ProductReviews.tsx
"use client";
import React, { useState } from "react";
import { Star, StarOff, X } from "lucide-react";
import Image from "next/image";
import { addProductReview } from "@/utils/api/api"; // ✅ Import API function

interface Review {
  name: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

interface ProductReviewsProps {
  productId: number;
  reviews: Review[]; // ✅ Props से reviews लें
}

interface ReviewForm {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

export default function ProductReviews({
  productId,
  reviews,
}: ProductReviewsProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState<ReviewForm>({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });

  const handleStarClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ API call to add review
      await addProductReview(productId, {
        name: formData.name,
        comment: formData.comment,
        rating: formData.rating,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
      });

      // Reset form aur modal band karein
      setFormData({
        name: "",
        email: "",
        rating: 0,
        comment: "",
      });
      setShowReviewModal(false);

      // Success message
      alert(
        "Thank you for your review! It will be published after verification."
      );

      // Refresh page to show new review
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const isFormValid =
    formData.name && formData.email && formData.rating > 0 && formData.comment;

  return (
    <>
      <section className="bg-[#C4F9FF] py-12 px-4 ">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Customer <span className="text-pink-500">Reviews</span>
            </h2>
            <p className="text-gray-500 mt-2">
              See what our happy customers are saying about this product ✨
            </p>
          </div>

          {/* Reviews */}
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="bg-white/70 backdrop-blur-lg border border-pink-100 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Top Section */}
                  <div className="flex items-center mb-4">
                    <Image
                      src={r.avatar}
                      alt={r.name}
                      className="w-12 h-12 rounded-full border-2 border-pink-400 mr-4"
                      width={48}
                      height={48}
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{r.name}</p>
                      <p className="text-sm text-gray-400">{r.date}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        {index < r.rating ? (
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
                        ) : (
                          <StarOff className="w-5 h-5 text-gray-300" />
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* Write a Review CTA */}
          <div className="text-center mt-10">
            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              Write a Review
            </button>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">
                Write a Review
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Rating Stars */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Rating *
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      {star <= (hoverRating || formData.rating) ? (
                        <Star className="w-8 h-8 text-yellow-500 fill-yellow-400" />
                      ) : (
                        <StarOff className="w-8 h-8 text-gray-300" />
                      )}
                    </button>
                  ))}
                </div>
                {formData.rating > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    You rated: {formData.rating} star
                    {formData.rating > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Review *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  placeholder="Share your experience with this product..."
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
