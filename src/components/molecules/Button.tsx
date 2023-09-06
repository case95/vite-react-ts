import React from "react"
import clsx from "clsx"
import { ButtonVariant, SpinnerSize } from "models"
import Spinner from "components/atoms/Spinner"

type ButtonProps = {
  label: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  variant?: ButtonVariant
  disabled?: boolean
  isLoading?: boolean
  joinLeft?: boolean
  joinRight?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  onClick,
  variant = ButtonVariant.DEFAULT,
  disabled,
  isLoading,
  joinLeft,
  joinRight,
}) => {
  const buttonColor: string = buttonColors[variant]

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
      type={type}
    >
      {isLoading ? <Spinner size={SpinnerSize.SMALL} /> : label}
    </button>
  )
}

type ButtonColors = {
  [key in ButtonVariant]: string
}

const buttonColors: ButtonColors = {
  [ButtonVariant.DANGER]:
    "bg-red-500 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-slate-400",
  [ButtonVariant.DEFAULT]:
    "bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white disabled:bg-slate-400",
}
