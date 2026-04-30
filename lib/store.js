let feedbacks = [];

export function getFeedbacks() {
  return feedbacks;
}

export function addFeedback(entry) {
  feedbacks.push(entry);
}