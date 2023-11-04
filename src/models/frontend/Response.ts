export interface NormalResponse<T> {
  meta: {
    id: string
    totalPages: number | null
    timestamp: string
  }
  data: Array<T>
  links: {
    self: string | null
    first: string | null
    prev: string | null
    next: string | null
    last: string | null
  }
}

export interface ErrorResponse {
  id: string
  code: number
  status: string
  source: {
    pointer: string | null
    parameter: string | null
  }
  title: string
  detail: string | null
  timestamp: string
}
