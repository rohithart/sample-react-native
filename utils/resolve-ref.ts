/**
 * Safely extract _id from a MongoDB reference that may or may not be populated.
 * If the ref is an expanded object, returns obj._id.
 * If the ref is already a string ID, returns it as-is.
 * Returns undefined if ref is nullish.
 */
export function resolveId(ref: unknown): string | undefined {
  if (!ref) return undefined;
  if (typeof ref === 'string') return ref;
  if (typeof ref === 'object' && ref !== null && '_id' in ref) {
    return (ref as { _id: string })._id;
  }
  return undefined;
}

/**
 * Check if a MongoDB reference is a populated object (not a plain string ID).
 */
export function isPopulated<T extends { _id: string }>(ref: unknown): ref is T {
  return typeof ref === 'object' && ref !== null && '_id' in ref;
}
