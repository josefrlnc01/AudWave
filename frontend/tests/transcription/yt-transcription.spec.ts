import { test, expect } from '@playwright/test'

test('usuario accede a dashboard y ejecuta transcripcion de archivo de youtube', async ({ page }) => {
    await page.goto('/auth/login')
    await page.locator('#email').fill('josefrlnc01@gmail.com')
    await page.locator('#password').fill('contrase\u00f1a123')
    await page.locator('input[type="submit"]').click()

    await expect(page).toHaveURL('/dashboard', { timeout: 10000 })
    await expect(page.locator('#yt-input')).toBeVisible({ timeout: 20000 })

    await page.locator('#yt-input').fill('https://youtube.com/shorts/sFlepuaRc38?si=wKdLQv6tlpcX9XSH')

    const ytResponsePromise = page.waitForResponse(
        response => response.url().includes('/yt-video') && response.request().method() === 'POST',
        { timeout: 50000 }
    )

    await page.locator('#transcribe-button').click()

    const ytResponse = await ytResponsePromise
    expect(ytResponse.ok(), `La llamada a /yt-video ha fallado con estado ${ytResponse.status()}`).toBeTruthy()

    const result = page.locator('#yt-result')
    await expect(result).toBeVisible({ timeout: 50000 })
    await expect(result).toContainText(/Un gol/i, { timeout: 50000 })
})
