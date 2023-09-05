import React from "react"
import { GiphyFormattedData } from "models"

type GiphyCardProps = GiphyFormattedData

export const GiphyCard: React.FC<GiphyCardProps> = ({ title, url }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-blue-200 shadow-lg">
      <div className="w-full truncate px-2 py-1">
        <span
          className="text-slate-00 max-w-full font-brand text-sm font-bold"
          title={title}
        >
          {title}
        </span>
      </div>
      <video src={url} title={title} autoPlay loop muted playsInline />
    </div>
  )
}
