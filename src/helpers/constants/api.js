export const API_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://market.pmnd.rs/api'
