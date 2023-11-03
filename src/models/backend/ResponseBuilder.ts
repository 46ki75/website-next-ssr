import { v4 } from 'uuid'

export class NormalResponseBuilder<T> {
  private _meta: {
    id: string
    totalPages: number | null
    timestamp: string
  }
  private _data: Array<T>
  private _links: {
    self: string | null
    first: string | null
    prev: string | null
    next: string | null
    last: string | null
  }

  constructor() {
    this._meta = {
      id: v4(),
      totalPages: null,
      timestamp: new Date().toISOString()
    }
    this._data = []
    this._links = {
      self: null,
      first: null,
      prev: null,
      next: null,
      last: null
    }
  }

  data(data: Array<T>) {
    this._data = data
    return this
  }

  pushData(data: T) {
    this._data.push(data)
    return this
  }

  self(selfLink: string) {
    this._links.self = selfLink
    return this
  }

  first(firstLink: string) {
    this._links.first = firstLink
    return this
  }

  prev(prevLink: string) {
    this._links.prev = prevLink
    return this
  }

  next(nextLink: string) {
    this._links.next = nextLink
    return this
  }

  last(lastLink: string) {
    this._links.last = lastLink
    return this
  }

  build() {
    return {
      meta: this._meta,
      data: this._data,
      links: this._links
    }
  }
}

export class ErrorResponseBuilder {
  private _id: string
  private _code: number
  private _status: string
  private _source: {
    pointer: string | null
    parameter: string | null
  }
  private _title: string
  private _detail: string | null
  private _timestamp: string

  constructor(code: number) {
    this._id = v4()
    this._code = code
    this._status = this.getStatusMessage(code).toUpperCase().replace(' ', '_')
    this._source = {
      pointer: null,
      parameter: null
    }
    this._title = this.getStatusMessage(code)
    this._detail = null
    this._timestamp = new Date().toISOString()
  }

  private getStatusMessage(code: number): string {
    const statusMessages: { [code: number]: string } = {
      400: 'Bad Request',
      401: 'Unauthorized',
      402: 'Payment Required',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      406: 'Not Acceptable',
      407: 'Proxy Authentication Required',
      408: 'Request Timeout',
      409: 'Conflict',
      410: 'Gone',
      411: 'Length Required',
      412: 'Precondition Failed',
      413: 'Payload Too Large',
      414: 'URI Too Long',
      415: 'Unsupported Media Type',
      416: 'Range Not Satisfiable',
      417: 'Expectation Failed',
      418: "I'm a teapot",
      421: 'Misdirected Request',
      422: 'Unprocessable Entity',
      423: 'Locked',
      424: 'Failed Dependency',
      425: 'Too Early',
      426: 'Upgrade Required',
      428: 'Precondition Required',
      429: 'Too Many Requests',
      431: 'Request Header Fields Too Large',
      451: 'Unavailable For Legal Reasons',
      500: 'Internal Server Error',
      501: 'Not Implemented',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
      504: 'Gateway Timeout',
      505: 'HTTP Version Not Supported',
      506: 'Variant Also Negotiates',
      507: 'Insufficient Storage',
      508: 'Loop Detected',
      510: 'Not Extended',
      511: 'Network Authentication Required'
    }

    return statusMessages[code] || 'Unknown Error'
  }

  title(title: string) {
    this._title = title
    return this
  }

  detail(detail: string) {
    this._detail = detail
    return this
  }

  pointer(pointer: string) {
    this._source.pointer = pointer
    return this
  }

  parameter(parameter: string) {
    this._source.parameter = parameter
    return this
  }

  build() {
    return {
      id: this._id,
      code: this._code,
      status: this._status,
      source: {
        pointer: this._source.pointer,
        parameter: this._source.parameter
      },
      title: this._title,
      detail: this._detail,
      timestamp: this._timestamp
    }
  }
}
