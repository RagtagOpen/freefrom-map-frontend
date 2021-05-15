import slugify from 'slugify'

/**
 * Convert input string to URL-friendly slug.
 */
export function toSlug(str) {
    return slugify(str, { lower: true })
}
