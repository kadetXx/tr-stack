import { Cookies } from '@/constants/enums'
import { cookies } from 'next/headers'

/**
 * reads the cookies from request headers
 * and then you can validate the user's session
 * however you wish depending on the auth service you make
 * use of.
 */
export async function getServerSession() {
  const cookiestore = cookies()

  const refresh_token = cookiestore.get(Cookies.REFRESH_TOKEN_KEY)
  const access_token = cookiestore.get(Cookies.ACCESS_TOKEN_KEY)

  if (!access_token || !refresh_token) {
    return null
  }

  /**
   * get and validate user's session
   * from auth service here
   * eg: supabase.auth.getSession({
   *        refresh_token: refreshToken.value,
   *        access_token: accessToken.value,
   *     })
   */

  return {
    access_token: access_token.value,
    refresh_token: refresh_token.value,
  }
}
