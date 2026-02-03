/**
 * A fetch wrapper that does the following
 * - Add typed responses
 * - Extends error handling to handle non 200 responses.
 * - Adds a timeout to the fetch request
 */
export async function simpleFetch<T, U>(
  url: string,
  options: RequestInit = {},
  timeout: number = 5000
) {
  const controller = new AbortController();

  const { signal } = controller;

  const fetchPromise = fetch(url, { ...options, signal });

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetchPromise;

    clearTimeout(timeoutId);

    // Initialize responseBody as null
    let responseBody: T | U | null = null;

    // If the response status is not 204 (No Content), parse the response body as JSON
    if (response.status !== 204) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return {
        success: true as const,
        status: response.status,
        headers: response.headers,
        data: responseBody as T,
        error: null,
      };
    } else {
      return {
        success: false as const,
        status: response.status,
        headers: null,
        data: null,
        error: {
          name: 'FetchError',
          body: responseBody as U,
        },
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false as const,
        status: 400,
        data: null,
        headers: null,
        error: {
          name: error.name,
          body: null,
        },
      };
    } else {
      return {
        success: false as const,
        status: 400,
        data: null,
        headers: null,
        error: {
          name: 'Unnown error',
          body: null,
        },
      };
    }
  }
}
