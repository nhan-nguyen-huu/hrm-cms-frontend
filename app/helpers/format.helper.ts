export const fortmatHelper = {
  onlyNumber: (value: string, maxLength?: number) => {
    const digits = value.replace(/\D/g, '')
    return maxLength ? digits.slice(0, maxLength) : digits
  },
  phoneNumber: (value: string) => fortmatHelper.onlyNumber(value, 10),
  cccdNumber: (value: string) => fortmatHelper.onlyNumber(value, 12),
  formatPhoneNumber: (value?: string) => {
    const raw = value?.replace(/\D/g, '').slice(0, 11)
    const part1 = raw?.slice(0, 3)
    const part2 = raw?.slice(3, 7)
    const part3 = raw?.slice(7, 11)
    let formatted = part1
    if (part2) formatted += '-' + part2
    if (part3) formatted += '-' + part3
    return { raw, formatted }
  },
  formatIdentityNumber: (value?: string) => {
    const data = value?.replace(/\D/g, '') || ''
    return {
      raw: data,
      formatted: data.replace(/^(\d{0,6})(\d{0,7}).*$/, (_, first, second) => (second ? `${first}-${second}` : first))
    }
  },
  formatNumber: (value?: string) => {
    return value?.replace(/\D/g, '') || ''
  },
  formatOtp: (value?: string) => {
    const raw = value?.replace(/\D/g, '').slice(0, 6) ?? ''
    const formatted = raw
    return { raw, formatted }
  },
  formatFileSize: (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`
    }
    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    }
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
  }
}
