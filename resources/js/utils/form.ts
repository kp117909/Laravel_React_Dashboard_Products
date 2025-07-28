export function buildFormData(payload: Record<string, any>): FormData {
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) return

    if (typeof value === 'boolean') {
      formData.append(key, value ? '1' : '0')
    } else if (value instanceof File) {
      formData.append(key, value)
    } else {
      formData.append(key, String(value))
    }
  })

  return formData
}
