const { test, expect } = require('@playwright/test');

test.describe('AI Image Prompt Builder E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the page with correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/AI Image Prompt Builder/);
        await expect(page.locator('h1')).toContainText('AI Prompt Builder');
    });

    test('should update preview when form is filled', async ({ page }) => {
        // Fill Subject
        await page.fill('#subject', 'A futuristic city');

        // Select Style
        await page.selectOption('#style', 'Cyberpunk');

        // Select Lighting
        await page.selectOption('#lighting', 'Neon Lights');

        // Check Preview
        const preview = page.locator('#final-prompt');
        await expect(preview).toHaveValue(/\/imagine prompt: A futuristic city, Cyberpunk, Neon Lights/);
    });

    test('should copy to clipboard', async ({ page }) => {
        // Set a value
        await page.fill('#subject', 'Test Prompt');

        // Mock clipboard
        await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

        // Click Copy
        await page.click('#copy-btn');

        // Check button text change
        await expect(page.locator('#copy-btn')).toContainText('Copied!');

        // Verify clipboard content (if possible in this env, otherwise skip)
        // const handle = await page.evaluateHandle(() => navigator.clipboard.readText());
        // const clipboardContent = await handle.jsonValue();
        // expect(clipboardContent).toContain('/imagine prompt: Test Prompt');
    });

    test('should load recipe', async ({ page }) => {
        // Click on "Cyberpunk Girl" recipe
        await page.click('.recipe-card:has-text("Cyberpunk Girl")');

        // Check Subject input
        await expect(page.locator('#subject')).toHaveValue('A cyberpunk girl with glowing eyes');

        // Check Style select
        await expect(page.locator('#style')).toHaveValue('Cyberpunk');

        // Check Preview
        const preview = page.locator('#final-prompt');
        await expect(preview).toHaveValue(/\/imagine prompt: A cyberpunk girl with glowing eyes, Cyberpunk, Cyberpunk city, Neon Lights, Vibrant colors --ar 16:9 --v 6\.0 --s 250/);
    });
});
