import React from "react"
import { Searchbar, GenericGrid, GiphyCard } from "components"
import { useSearch } from "customHooks"
import { GiphyResponseImageData } from "models"

// Instanciate Grid with inferred item type
const GiphyGrid = GenericGrid<GiphyResponseImageData>()

export const Home: React.FC = () => {
  const {
    resetSearch,
    searchValue,
    setSearch,
    getResults,
    deleteSearch,
    results,
    isLoading,
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
          onSubmit={getResults}
          isLoading={isLoading}
        />
      </div>
      <div className="mt-8 flex w-full justify-center">
        <GiphyGrid
          results={results}
          columnExtraClass="w-[200px]"
          renderItem={renderCard}
        />
      </div>
    </div>
  )
}
