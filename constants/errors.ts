import { TRPCError } from '@trpc/server'

export function generalError(error: TRPCError) {
  return error
}

export function notFoundError(message: string) {
  return new TRPCError({
    code: 'NOT_FOUND',
    message,
  })
}

export function unauthorisedError(message: string) {
  return new TRPCError({
    code: 'UNAUTHORIZED',
    message,
  })
}

export function serverError(error?: TRPCError | Error, message?: string) {
  return new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: message || 'An unexpected error occurred, please try again later.',
    cause: error?.cause,
  })
}

export function badRequestError(message: string) {
  return new TRPCError({
    code: 'BAD_REQUEST',
    message,
  })
}

export function unprocessableContentRequestError(message: string) {
  return new TRPCError({
    code: 'UNPROCESSABLE_CONTENT',
    message,
  })
}
