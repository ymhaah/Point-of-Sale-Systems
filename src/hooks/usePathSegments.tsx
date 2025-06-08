import { usePathname } from "next/navigation";

/**
 * Hook to get the current URL path segments as an array.
 *
 * @param {string} [path] - Optional pathname to parse. Defaults to current pathname.
 * @returns {string[]} An array of path segments (e.g., ["services", "web-dev"])
 */
function usePathSegments(path?: string): string[] {
    const currentPath = usePathname();
    const pathName = path ?? currentPath;

    const formatSegment = (segment: string): string =>
        segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

    const segments = pathName
        .split("/")
        .filter((path) => path !== "")
        .map(formatSegment);

    if (!pathName) return [];
    return segments;
}

export default usePathSegments;
