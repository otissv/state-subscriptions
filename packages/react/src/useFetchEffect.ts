import React from 'react'

/*
will remove
*/
export function useFetchEffect(
  {
    url,
    ...options
  }: {
    readonly url: string
    readonly [key: string]: any
  },
  cb: Function
): void {
  React.useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => cb(() => Promise.resolve(data)))
      .catch((error) => Promise.reject(error))
  }, [])
}
