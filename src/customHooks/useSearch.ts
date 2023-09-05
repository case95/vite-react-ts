import React from "react"
import { GiphyReponse, GiphyResponseImageData, GiphyURLType } from "models"
import { getGiphyURL, GIPHY_PAGE_SIZE } from "utils"
import { useIsMounted } from "customHooks"

const getResultsAbortController = new AbortController()

export const useSearch = (search: string) => {
  const [searchValue, setSearchValue] = React.useState(search)
  const [isLoading, setIsLoading] = React.useState(false)
  const [results, setResults] = React.useState<null | GiphyResponseImageData[]>(
    null
  )

  const deleteSearch = () => {
    setSearchValue("")
  }
  const resetSearch = () => {
    deleteSearch()
    setResults(null)
  }

  const getIsMounted = useIsMounted()

  const getResults = async () => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const res = await fetch(
        getGiphyURL({
          type: GiphyURLType.SEARCH,
          limit: GIPHY_PAGE_SIZE,
          offset: 0,
          rating: "g",
          q: searchValue,
        }),
        {
          signal: getResultsAbortController.signal,
        }
      )

      const parsedRes: GiphyReponse = await res.json()

      // prevents memory leak
      getIsMounted() && setResults(parsedRes.data)
    } catch (error) {
      // NOTE: handle error, possibly set an error state
      console.error(error)
    }
    setIsLoading(false)
  }

  React.useEffect(() => {
    const getTrending = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(
          getGiphyURL({
            type: GiphyURLType.TRENDING,
            limit: GIPHY_PAGE_SIZE,
            offset: 0,
            rating: "g",
          })
        )

        const parsedRes: GiphyReponse = await res.json()

        // prevents memory leak
        getIsMounted() && setResults(parsedRes.data)
      } catch (error) {
        // NOTE: handle error, possibly set an error state
        console.error(error)
      }
      setIsLoading(false)
    }

    if (!results && !isLoading) {
      getTrending()
    }
  }, [getIsMounted, isLoading, results])

  return {
    searchValue,
    setSearch: setSearchValue,
    deleteSearch,
    resetSearch,
    results,
    getResults,
    isLoading,
  }
}
