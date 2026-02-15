/**
 * Utility to build base-path-aware static asset URLs.
 * This ensures assets load correctly when the app is hosted under a subpath.
 */

const BASE_URL = import.meta.env.BASE_URL || '/';

/**
 * Converts a relative asset path to a base-path-aware URL.
 * @param path - Relative path to the asset (e.g., 'assets/logo.png')
 * @returns Full path with base URL prefix
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Ensure BASE_URL ends with /
  const baseUrl = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  
  // Combine base URL with clean path
  return `${baseUrl}${cleanPath}`;
}
