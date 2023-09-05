import React from "react"
import clsx from "clsx"
import { ButtonType, SpinnerSize } from "models"
import Spinner from "components/atoms/Spinner"

type ButtonProps = {
  onClick: () => void
  label: string
  type?: ButtonType
  disabled?: boolean
  isLoading?: boolean
  joinLeft?: boolean
  joinRight?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = ButtonType.DEFAULT,
  disabled,
  isLoading,
  joinLeft,
  joinRight,
}) => {
  const buttonColor: string = buttonColors[type]

  return (
    <button
      className={clsx(
        "flex w-full justify-center whitespace-nowrap rounded-md px-4 py-2",
        buttonColor,
        joinLeft && "rounded-l-none",
        joinRight && "rounded-r-none"
      )}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? <Spinner size={SpinnerSize.SMALL} /> : label}
    </button>
  )
}

type ButtonColors = {
  [key in ButtonType]: string
}

const buttonColors: ButtonColors = {
  [ButtonType.DANGER]:
    "bg-red-500 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-slate-400",
  [ButtonType.DEFAULT]:
    "bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white disabled:bg-slate-400",
}
