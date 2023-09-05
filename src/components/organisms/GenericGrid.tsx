import React from "react"
import clsx from "clsx"
import { GIPHY_PAGE_SIZE } from "utils"
import { Skeleton } from "components"

interface GridProps<T = unknown> {
  results: T[] | null
  renderItem: (args: T) => React.ReactNode
  columnExtraClass?: string
}

const N_COLUMNS = 5

export const GenericGrid =
  <T,>(): React.FC<GridProps<T>> =>
  ({ columnExtraClass, results, renderItem }) => {
    const getGridContent = () => {
      const placeholderArray: undefined[] =
        Array(GIPHY_PAGE_SIZE).fill(undefined)

      const cols: (T | undefined)[][] = []

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
        (accumulator: React.ReactNode[][], col, colIndex) => {
          col.forEach((item, itemIndex) => {
            const isColOdd = colIndex % 2 === 0
            const isItemOdd = itemIndex % 2 === 0

            if (accumulator[colIndex] === undefined) {
              accumulator[colIndex] = []
            }
            // default placeholder value
            let element: React.ReactNode = (
              <Skeleton
                key={`${colIndex}-${itemIndex}`}
                isTall={isColOdd ? !isItemOdd : isItemOdd}
              />
            )

            if (item !== undefined) {
              element = renderItem(item)
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
