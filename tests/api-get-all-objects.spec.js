import { test, expect } from '@playwright/test';
import { assertStatus, assertHeaders } from '../util/api-common-assertions.spec';

//Get list of all objects using GET (Assessment Q1)
test('API GET All Objects Request', async ({ request }) => {
    const getAllResponse = await request.get('objects');
    const jsonResponse = await getAllResponse.json();
    const savedProductName = 'Apple iPhone 12 Pro Max';

    //Validate the status code
    expect(getAllResponse.ok()).toBeTruthy();
    assertStatus(getAllResponse,200);

    // Validate response headers
    assertHeaders(getAllResponse);

    // Validate response is not empty,contains objects
    expect(Array.isArray(jsonResponse)).toBeTruthy();
    expect(jsonResponse.length).toBeGreaterThan(0);

    //Validate response Body Params Structure
    jsonResponse.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('data');
    });

    // Validate specific object exists
    const itemNames = jsonResponse.map(item => item.name);
    expect(itemNames).toContain(savedProductName);
})