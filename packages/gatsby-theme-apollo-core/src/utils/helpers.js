export function isSubsection(path) {
  if (!path) {
    return false
  }

  const count = path.match(/\//g).length
  return count > 3
}