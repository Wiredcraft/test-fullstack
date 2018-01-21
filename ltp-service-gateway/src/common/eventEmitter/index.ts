import { EventEmitter } from 'events'

let emitter: EventEmitter
export default function getEmitter () {
  if (!emitter) {
    emitter = new EventEmitter()
  }
  return emitter
}