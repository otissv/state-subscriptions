import React from 'react'

export function useToggleState(): [boolean, () => void] {
  const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false)
  const setState = () => setToggleUpdate(!toggleUpdate)

  return [toggleUpdate, setState]
}
