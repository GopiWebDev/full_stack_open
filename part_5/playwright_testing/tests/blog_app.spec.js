const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'root3',
        username: 'root3',
        password: 'root3',
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
      loginWith(page, 'root2', 'root2')
      await expect(page.getByText('logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'root', 'root2')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('logged-in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'root2', 'root2')
      await expect(page.getByText('logged-in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      createBlog(
        page,
        'testing using playwright2',
        'root2',
        'https://www.google.com'
      )

      await expect(
        page.getByText('testing using playwright2root2')
      ).toBeVisible()
    })
  })

  describe('when a blog already exists', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'root2', 'root2')
      await expect(page.getByText('logged-in')).toBeVisible()
      createBlog(
        page,
        'testing using playwright2',
        'root2',
        'https://www.google.com'
      )
      await expect(
        page.getByText('testing using playwright2root2')
      ).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await page.getByTestId('view').click()
      const likeDiv = page.getByTestId('likeDiv')
      const initialLikeCount = await likeDiv.innerText()

      const initialLikes = parseInt(initialLikeCount.replace('likes: ', ''))

      await page.getByTestId('like').click()

      await expect(page.getByTestId('likeDiv')).toHaveText(
        `likes: ${initialLikes + 1}`
      )
    })

    test('blog can be deleted', async ({ page }) => {
      await page.getByTestId('view').click()
      page.on('dialog', async (dialog) => {
        await dialog.accept()
      })

      await page.getByTestId('delete').click()
      await expect(
        page.getByText('testing using playwright2root2')
      ).not.toBeVisible()
    })

    test.only('only creator can delete', async ({ page }) => {
      await page.getByText('logout').click()

      loginWith(page, 'root3', 'root3')
      await expect(page.getByText('logged-in')).toBeVisible()

      await page.getByTestId('view').click()
      page.on('dialog', async (dialog) => {
        await dialog.accept()
      })

      const deleteBtn = page.getByTestId('delete')
      await expect(deleteBtn).not.toBeVisible()
    })
  })
})
