import React from "react"
import clsx from "clsx"
import { GiphyResponseImageData, GiphyFormattedData } from "models"
import { GIPHY_PAGE_SIZE } from "utils"
import { Skeleton } from "components"

type BaseGridProps = {
  renderItem: (args: GiphyFormattedData) => JSX.Element
  columnExtraClass?: string
}

type GridResultProps = {
  results: GiphyResponseImageData[]
}
type GridPlaceholderProps = {
  results: null
}

type GridProps = (GridResultProps | GridPlaceholderProps) & BaseGridProps

const N_COLUMNS = 5

export const Grid: React.FC<GridProps> = ({
  columnExtraClass,
  results,
  renderItem,
}) => {
  const getGridContent = () => {
    const placeholderArray = Array(GIPHY_PAGE_SIZE).fill(undefined)

    const cols: (GiphyResponseImageData | undefined)[][] = []

    const array = results ?? placeholderArray

    for (let i = 0; i < array.length; i += N_COLUMNS) {
      const chunk = array.slice(i, i + N_COLUMNS)

      chunk.forEach((item, index) => {
        if (cols[index] === undefined) {
          cols[index] = []
        }
        cols[index].push(item)
      })
    }

    const colsElement = cols.reduce(
      (accumulator: JSX.Element[][], col, colIndex) => {
        col.forEach((item, itemIndex) => {
          const isColOdd = colIndex % 2 === 0
          const isItemOdd = itemIndex % 2 === 0

          if (accumulator[colIndex] === undefined) {
            accumulator[colIndex] = []
          }
          // default placeholder value
          let element: JSX.Element = (
            <Skeleton
              key={`${colIndex}-${itemIndex}`}
              isTall={isColOdd ? !isItemOdd : isItemOdd}
            />
          )

          if (item !== undefined) {
            const {
              id,
              title,
              images: { preview, original, fixed_width: fixedWidth },
            } = item

            // Looks for optimized image URL in order of optimization level
            const url =
              preview?.mp4 ??
              fixedWidth?.mp4 ??
              original?.mp4 ??
              "/public/404.png"

            element = renderItem({ id, title, url })
          }

          accumulator[colIndex][itemIndex] = element
        })
        return accumulator
      },
      []
    )

    return colsElement.map((col, index) => (
      <div
        key={index}
        className={clsx(
          "flex flex-1 flex-col gap-1 md:gap-2 lg:gap-4",
          columnExtraClass
        )}
      >
        {col}
      </div>
    ))
  }

  return (
    <div className="flex gap-1 whitespace-nowrap md:gap-2 lg:gap-4">
      {getGridContent()}
    </div>
  )
}
