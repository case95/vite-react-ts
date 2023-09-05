type GiphyUserData = {
  avatar_url: string
  banner_url: string
  profile_url: string
  username: string
  display_name: string
}

type GiphyResponseImageRenditionOptions = {
  fixed_width?: {
    url: string
    width: string
    height: string
    size: string
    mp4: string
    mp4_size: string
    webp: string
    webp_size: string
  }
  fixed_width_still?: {
    url: string
    width: string
    height: string
  }
  fixed_width_downsampled?: {
    url: string
    width: string
    height: string
    size: string
    webp: string
    webp_size: string
  }
  fixed_width_small?: {
    url: string
    width: string
    height: string
    size: string
    mp4: string
    mp4_size: string
    webp: string
    webp_size: string
  }
  fixed_width_small_still?: {
    url: string
    width: string
    height: string
  }
  downsized?: {
    url: string
    width: string
    height: string
    size: string
  }
  downsized_still?: {
    url: string
    width: string
    height: string
  }
  downsized_small?: {
    width: string
    height: string
    mp4: string
    mp4_size: string
  }
  original?: {
    width: string
    height: string
    mp4: string
    mp4_size: string
    webp: string
    webp_size: string
    frames: string
  }
  original_still?: {
    url: string
    width: string
    height: string
  }
  preview?: {
    width: string
    height: string
    mp4: string
    mp4_size: string
  }
  preview_gif?: {
    url: string
    width: string
    height: string
  }
  // NOTE: some options are missing but rewriting all the types from the site would have taken too long for the challenge suggested timeframe
}

export type GiphyResponseImageData = {
  type: string
  id: string
  slug: string
  url: string
  bitly_url: string
  embed_url: string
  username: string
  source: string
  rating: string
  content_url: string
  user: GiphyUserData
  source_tld: string
  source_post_url: string
  update_datetime: string
  create_datetime: string
  import_datetime: string
  trending_datetime: string
  images: GiphyResponseImageRenditionOptions
  title: string
  alt_text: string
}

export type GiphyFormattedData = Pick<
  GiphyResponseImageData,
  "id" | "url" | "title"
>

export type GiphyReponse = {
  data: GiphyResponseImageData[]
  // NOTE: the rest of the response should have been defined but rewriting the types from the site would have taken too long for the challenge suggested timeframe
}
