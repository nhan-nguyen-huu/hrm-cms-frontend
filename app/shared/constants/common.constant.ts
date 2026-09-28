export const COMMON_CONSTANT = {
  LOCALES: {
    VI: 'vi',
    EN: 'en',
    KO: 'ko'
  },
  THEMES: {
    SYSTEM: 'system',
    LIGHT: 'light',
    DARK: 'dark'
  },
  // Select value meaning "no filter" in filter panels
  FILTER_ALL: 'ALL',
  // Days a request may wait for approval before it counts as overdue (design: "quá hạn SLA 2 ngày")
  // TODO(assumption): confirm whether BE makes this configurable
  REQUEST_SLA_DAYS: 2
}
