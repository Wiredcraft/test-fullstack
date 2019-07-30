export const TOAST = 'TOAST'

export function onToast (params: any) {
  return {
    type: TOAST,
    params,
  }
}
