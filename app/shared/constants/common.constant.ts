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
  // Rows shown in the side lists of the overview; "Xem tất cả" opens the full list
  OVERVIEW_LIST_SIZE: 4,
  // TODO(assumption): a contract ending within this many days is shown in red (design: 8 days red, 16 / 23 amber)
  CONTRACT_URGENT_DAYS: 10,
  // Days a request may wait for approval before it counts as overdue (design: "quá hạn SLA 2 ngày")
  // TODO(assumption): confirm whether BE makes this configurable
  REQUEST_SLA_DAYS: 2
}

// Chart colours (ApexCharts needs literal colours, not CSS variables) — primary = --primary of app.css
export const CHART_COLORS = {
  PRIMARY: '#1F5BAD',
  SECONDARY: '#C9751E',
  GRID: '#EEF1F5',
  LABEL: '#6E7F96',
  TEXT: '#101C2E'
}
