import fs from 'fs'
import path from 'path'
import { PNG } from 'pngjs'

function processPng(filePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(new PNG({ filterType: 4 }))
      .on('parsed', function () {
        const w = this.width
        const h = this.height
        const data = this.data

        const visited = new Uint8Array(w * h)
        const queue = new Int32Array(w * h)
        let head = 0
        let tail = 0

        // Seed outer boundaries: top, left, right edges
        for (let x = 0; x < w; x++) {
          visited[x] = 1
          queue[tail++] = x
        }
        for (let y = 1; y < h; y++) {
          const lIdx = y * w
          const rIdx = y * w + (w - 1)
          visited[lIdx] = 1
          queue[tail++] = lIdx
          visited[rIdx] = 1
          queue[tail++] = rIdx
        }

        while (head < tail) {
          const idx = queue[head++]
          const p = idx * 4
          const r = data[p]
          const g = data[p + 1]
          const b = data[p + 2]

          const maxVal = Math.max(r, g, b)
          const minVal = Math.min(r, g, b)
          const diff = maxVal - minVal
          const brightness = (r + g + b) / 3

          if (diff <= 22 && brightness >= 210) {
            data[p + 3] = 0
            const x = idx % w
            const y = (idx / w) | 0

            if (x > 0 && !visited[idx - 1]) {
              visited[idx - 1] = 1
              queue[tail++] = idx - 1
            }
            if (x < w - 1 && !visited[idx + 1]) {
              visited[idx + 1] = 1
              queue[tail++] = idx + 1
            }
            if (y > 0 && !visited[idx - w]) {
              visited[idx - w] = 1
              queue[tail++] = idx - w
            }
            if (y < h - 1 && !visited[idx + w]) {
              visited[idx + w] = 1
              queue[tail++] = idx + w
            }
          } else if (diff <= 30 && brightness >= 185) {
            data[p + 3] = Math.min(data[p + 3], Math.round(((255 - brightness) / 70) * 255))
          }
        }

        // Clear any residual near-white pixels at bottom edge
        for (let y = Math.floor(h * 0.92); y < h; y++) {
          for (let x = 0; x < w; x++) {
            const p = (y * w + x) * 4
            const r = data[p], g = data[p + 1], b = data[p + 2]
            if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && (r + g + b) / 3 > 220) {
              data[p + 3] = 0
            }
          }
        }

        const outStream = fs.createWriteStream(filePath)
        this.pack().pipe(outStream).on('finish', () => resolve(true)).on('error', reject)
      })
      .on('error', reject)
  })
}

async function main() {
  const dir = path.resolve('public/roshan-character')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'))
  console.log(`Processing ${files.length} images in ${dir}...`)

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const p = path.join(dir, file)
    await processPng(p)
    if ((i + 1) % 10 === 0 || i === files.length - 1) {
      console.log(`Progress: ${i + 1}/${files.length} processed`)
    }
  }
  console.log('All character images processed with transparent backgrounds!')
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
