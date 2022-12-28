export const getSWRCacheKey = () => {
  return {
    user: () => `user`,
  };
};

export default getSWRCacheKey;
