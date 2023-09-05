import React from "react"
import { Button, Input } from "components"
import { ButtonType } from "models"

type SearchbarProps = {
  value: string
  onChange: (val: string) => void
  onDelete: () => void
  onReset: () => void
  submitLabel: string
  inputLabel: string
  onSubmit: (val: string) => void
  isLoading: boolean
}

export const Searchbar: React.FC<SearchbarProps> = ({
  onChange,
  onDelete,
  onReset,
  value,
  inputLabel,
  submitLabel,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = () => onSubmit(value)

  const submitOnEnterPress: React.KeyboardEventHandler<HTMLFormElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form className="flex items-end" onKeyDown={submitOnEnterPress}>
      <div className="w-32">
        <Button
          label="Reset"
          type={ButtonType.DANGER}
          onClick={onReset}
          disabled={isLoading}
          isLoading={isLoading}
          joinRight
        />
      </div>
      <div>
        <Input
          onChange={onChange}
          onDelete={onDelete}
          value={value}
          label={inputLabel}
          joinLeft
          joinRight
          disabled={isLoading}
        />
      </div>
      <div className="w-32">
        <Button
          label={submitLabel}
          joinLeft
          onClick={handleSubmit}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </div>
    </form>
  )
}
