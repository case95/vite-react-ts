import React from "react"
import { Searchbar, GenericGrid, GiphyCard, Button } from "components"
import { useSearch } from "customHooks"
import { ButtonVariant, GiphyResponseImageData, GiphyURLType } from "models"

// Instanciate Grid with inferred item type
const GiphyGrid = GenericGrid<GiphyResponseImageData>()

export const Home: React.FC = () => {
  const {
    resetSearch,
    searchValue,
    setSearch,
    getResults,
    canRequestMore,
    deleteSearch,
    results,
    isLoading,
    isError,
  } = useSearch("")

  const renderCard = (item: GiphyResponseImageData) => {
    if (item === null) return null

    const {
      id,
      title,
      images: { preview, original, fixed_width: fixedWidth },
    } = item

    // Looks for optimized image URL in order of optimization level
    const url =
      preview?.mp4 ?? fixedWidth?.mp4 ?? original?.mp4 ?? "/public/404.png"

    return <GiphyCard key={id} title={title} url={url} />
  }

  const onSubmit = React.useCallback(
    () => getResults({ type: GiphyURLType.SEARCH }),
    [getResults]
  )

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-slate-100 p-8">
      <h1 className="mb-4 font-brand text-4xl font-light text-slate-400">
        <span className="font-black text-slate-950">GIPHY</span>
        Lenses
      </h1>
      <div className="flex items-end gap-4">
        <Searchbar
          inputLabel="Look for GIFs"
          onChange={setSearch}
          onReset={resetSearch}
          onDelete={deleteSearch}
          submitLabel={isLoading ? "Searching..." : "Search GIFs!"}
          value={searchValue}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
      {isError && (
        <div className="mx-auto flex w-64 flex-col py-8 text-center">
          <span className="text-red-500">Seems like there was an error</span>
          <span className="pb-4 text-red-500">Retry or Reload the Page</span>
          <div className="flex">
            <div className="w-32">
              <Button
                label="Reload Page"
                onClick={() => window.location.reload()}
                variant={ButtonVariant.DANGER}
                joinRight
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
            <div className="w-32">
              <Button
                label="Retry Query"
                onClick={() => getResults({})}
                joinLeft
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 flex w-full justify-center">
        <GiphyGrid
          results={results}
          columnExtraClass="w-[200px]"
          renderItem={renderCard}
        />
      </div>
      {canRequestMore && (
        <div className="mx-auto w-56 pt-16">
          <Button
            onClick={() => getResults({ loadMore: true })}
            label="Load More"
            isLoading={isLoading}
            disabled={isLoading || isError}
          />
        </div>
      )}
    </div>
  )
}
