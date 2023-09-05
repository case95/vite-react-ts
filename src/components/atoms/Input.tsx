import React from "react"
import clsx from "clsx"

type InputProps = {
  type?: React.HTMLInputTypeAttribute
  onChange?: (val: string) => void
  onDelete?: () => void
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"]
  label?: string
  disabled?: boolean
  joinLeft?: boolean
  joinRight?: boolean
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  onChange,
  onDelete,
  label,
  joinLeft,
  joinRight,
  disabled,
  ...otherProps
}) => {
  const hasResetIcon = onDelete !== undefined

  let input = (
    <input
      type={type}
      onChange={(e) => onChange?.(e.target.value)}
      className={clsx(
        "flex-1 bg-white px-4 py-2 focus:outline-blue-300 active:outline-blue-500 disabled:bg-slate-200",
        !hasResetIcon && "rounded-md",
        !hasResetIcon && joinLeft && "rounded-l-none",
        !hasResetIcon && joinRight && "rounded-r-none"
      )}
      disabled={disabled}
      {...otherProps}
    />
  )
  if (hasResetIcon) {
    input = (
      <div
        className={clsx(
          "flex w-full overflow-hidden rounded-md",
          joinLeft && "rounded-l-none",
          joinRight && "rounded-r-none"
        )}
      >
        {input}
        <button
          className={clsx(
            "h-full w-10 bg-white p-2",
            disabled && "bg-slate-200"
          )}
          onClick={onDelete}
          disabled={disabled}
          type="button"
        >
          <span className="sr-only">Delete</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className={clsx(
              "h-6 w-6",
              disabled
                ? "fill-slate-300 stroke-slate-500"
                : "fill-red-200 stroke-red-500 active:fill-red-300 active:stroke-red-800"
            )}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
            />
          </svg>
        </button>
      </div>
    )
  }

  return label !== undefined ? (
    <label className="flex w-full flex-col gap-1">
      <span className="font-brand text-sm font-bold text-blue-500">
        {label}
      </span>
      {input}
    </label>
  ) : (
    <div className="w-full">{input}</div>
  )
}
