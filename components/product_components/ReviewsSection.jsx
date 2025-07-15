"use client";

import { useReview } from "@/hooks/useReview";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import api from "@/lib/api";

function getInitials(firstName, lastName) {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

function ReviewsSection({ id }) {
  const { data, isLoading, isError, refetch } = useReview(id);

  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Comment is required.");
      return;
    }

    try {
      setLoading(true);
      const token = Cookies.get("token");

      await api.post(
        "review",
        { product: id, comment, rate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Review submitted!");
      setComment("");
      setRate(5);
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 lg:px-0 py-10">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Customer Reviews</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm mb-10 space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Leave a Review
        </h3>

        <textarea
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Write your honest feedback..."
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="rate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Rating:
            </label>
            <select
              id="rate"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="ml-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-150 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>

      {/* Reviews List */}
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading reviews...</p>
      ) : isError ? (
        <p className="text-sm text-red-500">Failed to load reviews.</p>
      ) : !data || data.length === 0 ? (
        <p className="text-gray-500">No reviews here.</p>
      ) : (
        <div className="space-y-6">
          {data.map((review) => (
            <div
              key={review._id}
              className="flex items-start gap-4 p-5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 shadow-sm"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 font-bold text-lg">
                {getInitials(review.user.firstName, review.user.lastName)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {review.user.firstName} {review.user.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <span className="text-yellow-500 font-semibold text-sm">
                    {review.rate.toFixed(1)} ★
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ReviewsSection;
