export const fortmatHelper = {
  onlyNumber: (value: string, maxLength?: number) => {
    const digits = value.replace(/\D/g, '')
    return maxLength ? digits.slice(0, maxLength) : digits
  },
  phoneNumber: (value: string) => fortmatHelper.onlyNumber(value, 10),
  cccdNumber: (value: string) => fortmatHelper.onlyNumber(value, 12)
}
