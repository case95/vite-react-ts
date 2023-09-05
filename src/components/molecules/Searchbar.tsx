import React from "react"
import { Button, Input } from "components"
import { ButtonVariant } from "models"

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
  const validateSubmit = () => {
    // prevents fetch on press Enter & on button click when empty value
    value.length && onSubmit(value)
  }

  const submitOnEnterPress: React.KeyboardEventHandler<HTMLFormElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      validateSubmit()
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    validateSubmit()
  }

  return (
    <form
      className="flex items-end"
      onKeyDown={submitOnEnterPress}
      onSubmit={handleSubmit}
    >
      <div className="w-32">
        <Button
          label="Reset"
          variant={ButtonVariant.DANGER}
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
          disabled={isLoading || !value.length}
          isLoading={isLoading}
          type="submit"
        />
      </div>
    </form>
  )
}
