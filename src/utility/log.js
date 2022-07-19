import CONSTANTS from 'constants'

/**
 * Runs only in dev environment.
 *
 * @param {any} data to be inspected.
 * @param {string} title is best to be the function name for easy tracking.
 * @param {boolean} clearConsole used for clarity. Has no effect in terminal console.
 * @param {string} type takes table, log, error, warn, or info. Has no effect in terminal console
 * @returns Formatted message
 */
export function log(data, title, clearConsole, type) {
  if (CONSTANTS.ENV === 'dev') {
    const formattedHeader = `\n[---${type}---] ${title}: \n`

    if (clearConsole) console.clear()

    switch (type) {
      case 'log':
        console.log(formattedHeader, data)
        break
      case 'table':
        console.table(data)
        break
      case 'error':
        console.error(formattedHeader, data)
        break
      case 'warn':
        console.warn(formattedHeader, data)
        break
      case 'info':
        console.warn(formattedHeader, data)
        break
      default:
        console.log(formattedHeader, data)
    }
  }
}

/**
 * Find out how long a function takes to execute.
 *
 * @param {function} operation
 * @param {string} title is best to be the function name for easy tracking
 * @param {boolean} clearConsole used for clarity. has no effect in terminal console.
 * @returns execution time from start to end.
 */
export async function calculateExecutionTime(operation, title, clearConsole) {
  if (CONSTANTS.ENV === 'dev') {
    if (clearConsole) console.clear()

    console.time(title)
    await operation()
    console.timeEnd(title)
  }
}
