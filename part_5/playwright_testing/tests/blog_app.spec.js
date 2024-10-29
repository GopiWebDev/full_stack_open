const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'root2',
        username: 'root2',
        password: 'root2',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('login to the application')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByTestId('username').fill('root2')
      await page.getByTestId('password').fill('root2')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(
        page.getByText('Matti Luukkainen logged in')
      ).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByTestId('username').fill('root2')
      await page.getByTestId('password').fill('root2')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('logged-in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByLabel('title').fill('testing using playwright')
      await page.getByLabel('author').fill('root2')
      await page.getByLabel('url').fill('https://www.google.com')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(
        page.getByText('testing using playwrightroot2')
      ).toBeVisible()
    })
  })
})
