#!/usr/bin/env node --experimental-strip-types

import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import prompts from 'prompts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

function validateProjectName(name: string): boolean | string {
  if (!name?.trim()) return 'プロジェクト名を入力してください'
  if (!/^[a-z0-9-]+$/.test(name))
    return '小文字、数字、ハイフンのみ使用可能です'
  if (name.length > 214) return '214文字以内で入力してください'
  return true
}

function validateAccountId(id: string): boolean | string {
  if (!id?.trim()) return true // 空でもOK（オプション）
  if (!/^[a-f0-9]{32}$/.test(id))
    return 'アカウントIDは32文字の16進数です'
  return true
}

async function updatePackageJson(name: string): Promise<void> {
  const path = join(rootDir, 'package.json')
  const json = JSON.parse(await readFile(path, 'utf-8'))
  json.name = name
  await writeFile(path, JSON.stringify(json, null, 2) + '\n')
}

async function runNpmCi(): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['ci'], {
      cwd: rootDir,
      stdio: 'inherit',
    })
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`npm ci exited with code ${code}`))
      }
    })
    child.on('error', reject)
  })
}

async function updateWranglerConfig(
  name: string,
  accountId?: string
): Promise<void> {
  const path = join(rootDir, 'wrangler.jsonc')
  let content = await readFile(path, 'utf-8')

  // name を更新
  content = content.replace(/"name":\s*"[^"]*"/, `"name": "${name}"`)

  // account_id を更新または追加
  if (accountId) {
    if (/"account_id":\s*"[^"]*"/.test(content)) {
      content = content.replace(
        /"account_id":\s*"[^"]*"/,
        `"account_id": "${accountId}"`
      )
    } else {
      // name の後に追加
      content = content.replace(
        /("name":\s*"[^"]*")/,
        `$1,\n  "account_id": "${accountId}"`
      )
    }
  }

  await writeFile(path, content)
}

async function main(): Promise<void> {
  console.log('\n  プロジェクト初期化\n')

  const onCancel = () => {
    console.log('\n  キャンセルしました\n')
    process.exit(0)
  }

  const { name } = await prompts(
    {
      type: 'text',
      name: 'name',
      message: 'プロジェクト名',
      initial: 'my-project',
      validate: validateProjectName,
    },
    { onCancel }
  )

  if (!name) {
    process.exit(0)
  }

  const { accountId } = await prompts(
    {
      type: 'text',
      name: 'accountId',
      message: 'Cloudflare アカウントID (空欄でスキップ)',
      validate: validateAccountId,
    },
    { onCancel }
  )

  console.log('\n  設定ファイルを更新中...\n')

  await updatePackageJson(name)
  console.log('  ✓ package.json')

  await updateWranglerConfig(name, accountId)
  console.log('  ✓ wrangler.jsonc')

  console.log('\n  依存関係をインストール中...\n')
  await runNpmCi()

  console.log(`\n  完了: ${name}\n`)
  console.log('  次のステップ:')
  console.log('    npm run dev      # 開発サーバー起動')
  console.log('    npm run build    # ビルド')
  console.log('    npm run deploy   # デプロイ\n')
}

main().catch(console.error)
