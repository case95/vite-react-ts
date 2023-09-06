import {
  GiphyURLSearchParams,
  GiphyURLTrendingParams,
  GiphyURLType,
} from "models"

type GiphyURLParams = GiphyURLTrendingParams | GiphyURLSearchParams

export const getGiphyURL = (args: GiphyURLParams) => {
  const { limit, offset, rating, type } = args

  const url = `${import.meta.env.VITE_GIPHY_BASE_URL}/${type}?api_key=${
    import.meta.env.VITE_GIPHY_KEY
  }&limit=${limit}&offset=${offset}&rating=${rating}&bundle=clips_grid_picker`

  if (type === GiphyURLType.SEARCH) {
    return `${url}&lang=en&q=${args.q}`
  }

  return url
}
