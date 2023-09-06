import React from "react"
import {
  GiphyReponse,
  GiphyResponseImageData,
  GiphyURLSearchParams,
  GiphyURLTrendingParams,
  GiphyURLType,
} from "models"
import { getGiphyURL, GIPHY_PAGE_SIZE } from "utils"
import { useIsMounted } from "customHooks"

export const useSearch = (search: string) => {
  const [searchValue, setSearchValue] = React.useState(search)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [results, setResults] = React.useState<null | GiphyResponseImageData[]>(
    null
  )
  const [offset, setOffset] = React.useState(0)
  const [totalCount, setTotalCount] = React.useState<number | null>(null)
  const lastQueryType = React.useRef(GiphyURLType.TRENDING)
  const lastQueryValue = React.useRef(searchValue)

  const deleteSearch = () => {
    setSearchValue("")
  }
  const resetSearch = () => {
    deleteSearch()
    setResults(null)
    setOffset(0)
  }

  const getIsMounted = useIsMounted()

  const getResults = React.useCallback(
    async ({
      type = lastQueryType.current,
      abortController,
      loadMore,
    }: {
      type?: GiphyURLType
      loadMore?: boolean
      abortController?: AbortController
    }) => {
      setIsLoading(true)
      const q = loadMore ? lastQueryValue.current : searchValue

      try {
        const giphyURLParams: GiphyURLTrendingParams | GiphyURLSearchParams = {
          limit: GIPHY_PAGE_SIZE,
          offset: loadMore ? offset : 0,
          rating: "g",
          ...(type === GiphyURLType.SEARCH ? { q, type } : { type }),
        }

        lastQueryType.current = type

        const res = await fetch(getGiphyURL(giphyURLParams), {
          signal: abortController?.signal,
        })

        const parsedRes: GiphyReponse = await res.json()

        // prevents memory leak
        if (getIsMounted()) {
          setResults((prev) => [
            ...(prev !== null && loadMore ? prev : []),
            ...parsedRes.data,
          ])
          setOffset(
            loadMore
              ? offset + parsedRes.pagination.count
              : parsedRes.pagination.count
          )
          setTotalCount(parsedRes.pagination.total_count)
          lastQueryValue.current = searchValue
        }
        setIsError(false)
      } catch (error) {
        console.error(error)
        setIsError(true)
      }
      getIsMounted() && setIsLoading(false)
    },
    [getIsMounted, offset, searchValue]
  )

  const shouldLoadDefaultTrend = React.useRef(!results && !isLoading)

  React.useEffect(() => {
    shouldLoadDefaultTrend.current = !results && !isLoading && !isError
  }, [isError, isLoading, results])

  // loads trending on mount and on reset
  React.useEffect(() => {
    const abortController = new AbortController()
    if (shouldLoadDefaultTrend.current) {
      getResults({
        type: GiphyURLType.TRENDING,
        abortController: abortController,
      })
    }

    return () => {
      abortController.abort()
    }
  }, [getResults])

  return {
    searchValue,
    setSearch: setSearchValue,
    deleteSearch,
    resetSearch,
    results,
    getResults,
    canRequestMore:
      results !== null && totalCount !== null && results.length < totalCount,
    isLoading,
    isError,
  }
}
