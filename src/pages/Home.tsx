import React from "react"
import { Searchbar, Grid, GiphyCard } from "components"
import { useSearch } from "customHooks"

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
        <Grid
          results={results}
          columnExtraClass="w-[200px]"
          renderItem={(args) => <GiphyCard key={args.id} {...args} />}
        />
      </div>
    </div>
  )
}
