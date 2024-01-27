import { Cookies } from '@/constants/enums'

/**
 * use these functions to
 * update browser cookies when neccessary
 *
 * eg. when a user logs in, you would want
 * to grab the refresh and access tokens and
 * store them as cookies so you can get these cookie
 * values on the backend (trpc or next api route) and
 * then use the values to validate the user's session
 */
export const setCookie = (
  key: Cookies,
  value?: string,
  age: number = Cookies.MAX_AGE,
) => {
  document.cookie = `${key}=${value}; path=/; max-age=${age}; SameSite=Lax; secure`
}

export const expireCookie = (key: Cookies) => {
  const expires = new Date(0).toUTCString()
  document.cookie = `${key}=; path=/; expires=${expires}; SameSite=Lax; secure`
}
