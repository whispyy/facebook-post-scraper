import { test } from '@playwright/test'
import { Webhook } from 'discord-webhook-node'
import dotenv from 'dotenv'
import { parseBasePost, Post } from '../utils/post'
import { lastPost } from '../utils/post'
import { isInTimeAgo } from '../utils/timeago'

dotenv.config()

const hook = new Webhook(process.env.WEBHOOK_URL ?? '')
hook.setUsername('Facebook Post')
hook.setAvatar(process.env.WEBHOOK_IMG ?? '')

let post: Post = {
  fullText: [],
  message: '',
}

test.describe('Facebook Post Scraper', () => {
  test('Finding last post', async ({ page }) => {
    await page.goto(process.env.FB_PAGE_URL ?? '')
    
    const basePost = await lastPost({ page })

    post = parseBasePost(basePost.fullText, basePost.message)

    // await hook.send(`${post.author} - ${post.date} ${post.message}`)
  })
})


test.afterAll(async () => {
  if (!process.env.WEBHOOK_URL) {
    return
  }
  if (isInTimeAgo(post.date ?? '', process.env.FB_TIMEFRAME ?? '')) {
    await hook.info('**Information**', `${post.author} - ${post.date}`, `${post.message}`);
  }
})
