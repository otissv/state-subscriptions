export const updateOrderSetter = <Update>(update: Update) => {
  return (): Record<string, any> => ({
    order: {
      ...update,
    },
  })
}
