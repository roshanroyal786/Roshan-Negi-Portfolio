import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

async function convertDir(dir) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png'))
  console.log(`Converting ${files.length} images in ${dir} to WebP...`)
  let savedBytes = 0

  for (const file of files) {
    const pngPath = path.join(dir, file)
    const baseName = path.basename(file, '.png')
    const webpPath = path.join(dir, `${baseName}.webp`)

    const pngStat = fs.statSync(pngPath)
    await sharp(pngPath)
      .webp({ quality: 85, effort: 4 })
      .toFile(webpPath)

    const webpStat = fs.statSync(webpPath)
    savedBytes += pngStat.size - webpStat.size
  }

  console.log(`Done ${dir}: Saved ${(savedBytes / (1024 * 1024)).toFixed(2)} MB!`)
}

async function main() {
  await convertDir(path.resolve('public/roshan-character'))
  await convertDir(path.resolve('public/graphics'))
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
