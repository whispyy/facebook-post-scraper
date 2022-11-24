import type { Page } from "@playwright/test"

interface BaseOptions {
  page: Page
}

interface BasePost {
  fullText: string[]
  message: string
}

export interface Post extends BasePost {
  author?: string
  date?: string
}

export const parseBasePost = (fullText: string[], message): Post => {
  const [author, date] = fullText[0].split('·')
  return { fullText, message, author: author.trim(), date: date.trim() }
}

export const lastPost = async ({ page }: BaseOptions): Promise<BasePost> => {
  const postLocator = await page.locator('div[role=article]').first()
  const message = await postLocator.locator('div[data-ad-preview=message]').innerText()

  return {
    fullText: await postLocator.allTextContents(),
    message,
  }
}