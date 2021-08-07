export function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = ['àáäâ', 'èéëê', 'ìíïî', 'òóöô', 'ùúüû', 'ñ', 'ç', '·/_,:;']
  const to = ['a', 'e', 'i', 'o', 'u', 'n', 'c', '-']
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(`[${from[i]}]`, 'g'), to[i])
  }

  return str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
}
