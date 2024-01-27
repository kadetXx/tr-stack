import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * clsx but with merged classnames
 * for tailwind classes.
 *
 * simply delete this file and uninstall
 * tailwind, clsx and tailwind-merge if you
 * don't intend to use tailwind css
 *
 * also delete other tailwind associated files like
 * tailwind.config.ts
 */
export const clsxm = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs))
}
