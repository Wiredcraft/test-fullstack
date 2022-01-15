/**
 * Extended `Error` interface with `status` and `details` properties.
 * `status` is the error code from `express`,
 * `details` are the details of a validation error from `joi`.
 */
interface ExtendedError extends Error {
    status?: number,
    details?: Array<any>
}

export default ExtendedError;

