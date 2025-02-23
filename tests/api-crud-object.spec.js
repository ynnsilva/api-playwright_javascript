import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
const { DateTime } = require('luxon');
import { assertStatus, assertHeaders } from '../util/api-common-assertions.spec';

const productName = faker.commerce.productName();
const productYear = DateTime.now().toFormat('yyyy');
const productPrice = faker.commerce.price();
const productMaterial = faker.commerce.productMaterial();
const productDiskSize = faker.number.int({ min: 1, max: 50 }) + ' TB';

let objectId;
let objectName;
let objectYear;
let objectPrice;
let objectMaterial;
let objectDiskSize;

test.describe.serial('API CRUD Operations', () => {
    //Step 1 : Create an object using POST (Assessment Q2)
    test('API POST Request', async ({ request }) => {
        const postResponse = await request.post('objects', {
            data: {
                name: productName,
                data: {
                    year: productYear,
                    price: productPrice,
                    "CPU model": productMaterial,
                    "Hard disk size": productDiskSize
                }
            }
        });

        //Validate the status code
        expect(postResponse.ok()).toBeTruthy();
        assertStatus(postResponse, 200);

        // Validate response headers
        assertHeaders(postResponse);

        // Validate response body params structure
        const postData = await postResponse.json();
        objectId = postData.id;
        objectName = postData.name;
        objectYear = postData.data.year;
        objectPrice = postData.data.price;
        objectMaterial = postData.data["CPU model"];
        objectDiskSize = postData.data["Hard disk size"];
        expect(postData).toBeDefined();
        expect(postData).toHaveProperty('id');
        expect(postData).toHaveProperty('name');
        expect(postData).toHaveProperty('data');

        //  Validate submitted data properly saved
        expect(postData.name).toBe(productName);
        expect(postData.data.year).toBe(productYear);
        expect(postData.data.price).toBe(productPrice);
        expect(postData.data["CPU model"]).toBe(productMaterial);
        expect(postData.data["Hard disk size"]).toBe(productDiskSize);

        // Ensure the object ID is not null and Store for other tests
        expect(objectId).toBeDefined();
        console.log('Created Object ID: ' + objectId);
    });

    //Step 2 : Get the object using above added ID (Assessment Q3)
    test('API GET Request', async ({ request }) => {
        // Ensure objectId is set
        expect(objectId).toBeDefined();

        const getResponse = await request.get('objects/' + objectId);

        //Validate the status code
        expect(getResponse.ok()).toBeTruthy();
        assertStatus(getResponse, 200);

        // Validate response headers
        assertHeaders(getResponse);

        //  Validate submitted data properly saved
        const getData = await getResponse.json();
        expect(getData.name).toBe(objectName);
        expect(getData.data.year).toBe(objectYear);
        expect(getData.data.price).toBe(objectPrice);
        expect(getData.data["CPU model"]).toBe(objectMaterial);
        expect(getData.data["Hard disk size"]).toBe(objectDiskSize);
    });

    //Step 3 : Update the object using the above added ID (Assessment Q4)
    test('API PUT Request', async ({ request }) => {
        const putResponse = await request.put('objects/' + objectId, {
            data: {
                name: productName,
                data: {
                    year: productYear,
                    price: productPrice,
                    "CPU model": productMaterial,
                    "Hard disk size": productDiskSize
                }
            }
        });

        //Validate the status code
        expect(putResponse.ok()).toBeTruthy();
        assertStatus(putResponse, 200);

        // Validate response headers
        assertHeaders(putResponse);

        // Validate response body params structure
        const putData = await putResponse.json();
        objectId = putData.id;
        objectName = putData.name;
        objectYear = putData.data.year;
        objectPrice = putData.data.price;
        objectMaterial = putData.data["CPU model"];
        objectDiskSize = putData.data["Hard disk size"];
        expect(putData).toBeDefined();
        expect(putData).toHaveProperty('id');
        expect(putData).toHaveProperty('name');
        expect(putData).toHaveProperty('data');

        //  Validate updated data properly saved
        expect(putData.name).toBe(productName);
        expect(putData.data.year).toBe(productYear);
        expect(putData.data.price).toBe(productPrice);
        expect(putData.data["CPU model"]).toBe(productMaterial);
        expect(putData.data["Hard disk size"]).toBe(productDiskSize);

        // Ensure the object ID is not null and Store for other tests
        expect(objectId).toBeDefined();
        console.log('Created Object ID: ' + objectId);
    });

    //Step 4 : Delete the object using the above added ID (Assessment Q5)
    test('API DELETE Request', async ({ request }) => {
        const deleteResponse = await request.delete('objects/' + objectId);

        //Validate the status code
        expect(deleteResponse.ok()).toBeTruthy();
        assertStatus(deleteResponse, 200);

        // Validate response headers
        assertHeaders(deleteResponse);

        // Check if response contains expected message
        const getData = await deleteResponse.json();        
        expect(getData.message).toBe(`Object with id = ${objectId} has been deleted.`);
    });
});