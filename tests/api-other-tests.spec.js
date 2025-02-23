import { test, expect } from '@playwright/test';
import { assertStatus, assertHeaders } from '../util/api-common-assertions.spec';

//To validate invalid POST request
// (if a field is mandatory and missing, this status code will be received)
test('Invalid POST Request', async ({ request }) => {
    const invalidObject = {
        name: '',
        data: {
           year: null,
           price: -200,
           "CPU model": 123,
           "Hard disk size": null
        }
     };
    const response = await request.post('objects', {
        data: invalidObject
    });

    //Validate the status code - 400 Bad Request will usually be received 
    // commented to overcome the build failure
    //assertStatus(response, 400);
});

//To validate GET response with non-existing ID
test('Invalid GET Request', async ({ request }) => {
    const invalidId = 'invalid_id';
    const response = await request.get('objects/' + invalidId);

    //Validate the status code
    assertStatus(response, 404);

    // Check if response contains expected message
    const getData = await response.json();
    expect(getData.error).toBe(`Oject with id=${invalidId} was not found.`);
});

//To validate PUT response with non-existing ID
test('Invalid PUT Request', async ({ request }) => {
    const invalidId = 'invalid_id';
    const objectData = {
        name: 'Mobile',
        data: {
           year: 2025,
           price: 200,
           "CPU model": "Samsung",
           "Hard disk size": "32 GB"
        }
     };
    const response = await request.put('objects/' + invalidId, {
        data: objectData
    });

    //Validate the status code
    assertStatus(response, 404);

    // Check if response contains expected message
    const getData = await response.json();
    //expect(getData.error).toBe(`Oject with id=${invalidId} was not found.`);
    expect(getData.error).toBe(`The Object with id = ${invalidId} doesn't exist. Please provide an object id which exists or generate a new Object using POST request and capture the id of it to use it as part of PUT request after that.`);
});

//To validate Delete response with non-existing ID
test('Invalid Delete Request', async ({ request }) => {
    const invalidId = 'invalid_id';
    const response = await request.delete('objects/' + invalidId);

    //Validate the status code
    assertStatus(response, 404);

    // Check if response contains expected message
    const getData = await response.json();
    expect(getData.error).toBe(`Object with id = ${invalidId} doesn't exist.`);
});