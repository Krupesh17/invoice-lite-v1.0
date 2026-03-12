export const createError = (error, context = "processing your request") => ({
  error: {
    status: "CUSTOM_ERROR",
    data: {
      message:
        error.message || `An unexpected error occurred while ${context}.`,
    },
  },
});
