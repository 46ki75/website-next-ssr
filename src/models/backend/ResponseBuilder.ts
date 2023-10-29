import { v4 } from 'uuid'

export class NormalResponseBuilder {
  private _id: string
  private _data: Array<any>
  private _meta: { timestamp: string }
  private _links: {
    self?: string
    first?: string
    prev?: string
    next?: string
    last?: string
  }

  constructor() {
    this._id = v4()
    this._data = []
    this._meta = { timestamp: new Date().toISOString() }
    this._links = {}
  }

  data(data: Array<any>) {
    this._data = data
    return this
  }

  pushData(data: any) {
    this._data.push(data)
    return this
  }

  self(self: string) {
    this._links.self = self
    return this
  }

  first(first: string) {
    this._links.first = first
    return this
  }

  prev(prev: string) {
    this._links.prev = prev
    return this
  }

  next(next: string) {
    this._links.next = next
    return this
  }

  last(last: string) {
    this._links.last = last
    return this
  }

  build() {
    return {
      id: this._id,
      data: this._data,
      meta: this._meta,
      links: this._links
    }
  }
}

export class ErrorResponseBuilder {
  private _id: string
  private _status: string
  private _title: string
  private _detail: string
  private _source: { pointer?: string }

  constructor() {
    this._id = v4()
    this._status = ''
    this._title = ''
    this._detail = ''
    this._source = {}
  }

  status(status: string | number) {
    switch (typeof status) {
      case 'string':
        this._status = status
        return this
      case 'number':
        this._status = String(status)
        return this
    }
  }

  title(title: string) {
    this._title = title
    return this
  }

  detail(detail: string) {
    this._detail = detail
    return detail
  }

  pointer(pointer: string) {
    this._source.pointer = pointer
    return this
  }

  build() {
    return {
      id: this._id,
      status: this._status,
      title: this._title,
      detail: this._detail,
      source: this._source
    }
  }
}
