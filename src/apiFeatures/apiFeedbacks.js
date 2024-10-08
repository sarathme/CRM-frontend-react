import axios from "axios";

export async function getAllFeedbacks({ filter, page, limit }) {
  let url = `${import.meta.env.VITE_API_URL}/api/v1/feedbacks`;

  // Contructing query parameter
  const queryParams = new URLSearchParams();

  // Filter
  if (filter && filter.feedbackType) {
    queryParams.append("feedbackType", filter.feedbackType);
  }

  // Pagination
  queryParams.append("page", page);
  queryParams.append("limit", limit);

  try {
    const res = await axios.get(`${url}?${queryParams.toString()}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("crm-token")}`,
      },
    });

    return {
      feedbacks: res.data.data.feedbacks,
      totalFeedbacks: res.data.totalFeedbacks,
      totalPages: res.data.totalPages,
    };
  } catch (err) {
    console.log("Error 💥:", err);
    throw new Error(err.response.data.message);
  }
}

export async function getFeedbackStats() {
  let url = `${import.meta.env.VITE_API_URL}/api/v1/feedbacks/stats`;

  try {
    const res = await axios.get(url, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("crm-token")}`,
      },
    });

    return {
      feedbackStats: res.data.data.stats,
    };
  } catch (err) {
    console.log("Error 💥:", err);
    throw new Error(err.response.data.message);
  }
}
