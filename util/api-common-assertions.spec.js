import { expect } from '@playwright/test';

/**
 * Validate HTTP response status.
 * @param {Response} response - API response object
 * @param {number} expectedStatus - Expected status code
 */
export function assertStatus(response, expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
}

/**
 * Validate response headers.
 * @param {Response} response - API response object
 */
export function assertHeaders(response) {
    expect(response.headers()['content-type']).toContain('application/json');
}
