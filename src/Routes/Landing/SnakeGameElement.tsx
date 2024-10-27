import { useEffect, useRef } from 'react'

type Tile = {
  x: number
  y: number
}

class SnakeGame {
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _body: Tile[]
  private _apple: Tile
  private _rows: number
  private _cols: number
  private _tileSize: number
  private _initialSnakeLength: number = 60
  private _maxSnakeLength: number = 120

  // for rendering
  private _gapBetweenCells
  private _tileRenderSize

  // pathFinding
  private _shortestPath: Tile[]
  private _traveledPathIndex: number

  constructor(canvas: HTMLCanvasElement, tileSize: number, reversed: boolean) {
    this._canvas = canvas
    this._ctx = this._canvas.getContext('2d')!
    if (!this._ctx) throw Error('HTML5 canvas not supported on this browser!')

    // canvas initialization
    this._tileSize = tileSize
    this._canvas.width = window.innerWidth - 20
    this._canvas.height = window.innerHeight - 2
    // this._canvas.style.background = '#404040'
    this._rows = Math.floor(this._canvas.height / this._tileSize)
    this._cols = Math.floor(this._canvas.width / this._tileSize)

    // game logic initialization
    this._body = reversed
      ? [...Array(this._initialSnakeLength)]
          .map((_, i) => ({ x: this._cols - i - 1, y: Math.floor(this._rows * 0.66) }))
          .reverse()
      : [...Array(this._initialSnakeLength)].map((_, i) => ({ x: i, y: Math.floor(this._rows * 0.33) })).reverse()
    this._apple = reversed
      ? { x: 0, y: Math.floor(this._rows * 0.33) }
      : { x: this._cols - 1, y: Math.floor(this._rows * 0.66) }
    this._traveledPathIndex = 0
    this._shortestPath = this._findShortestPath()

    // rendering props initialization
    this._gapBetweenCells = 0
    this._tileRenderSize = this._tileSize - this._gapBetweenCells

    // start game
    this._loop()
  }

  private randX = () => Math.floor(Math.random() * this._cols)
  private randY = () => Math.floor(Math.random() * this._rows)

  private _generateRandomAppleLocation = () => {
    const appleX = this.randX()
    const appleY = this.randY()
    const found = this._body.find(({ x, y }) => x === appleX && y === appleY)
    if (found) {
      this._generateRandomAppleLocation()
    } else {
      return { x: appleX, y: appleY }
    }
  }

  private _render = () => {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)

    // render shortest path
    // this._ctx.fillStyle = '#22F6FF10'
    // this._shortestPath.forEach(({ x, y }) => {
    //   this._ctx.beginPath()
    //   this._ctx.roundRect(x * this._tileSize, y * this._tileSize, this._tileRenderSize, this._tileRenderSize, 3)
    //   this._ctx.fill()w
    // })

    // render snake
    this._ctx.fillStyle = '#22F6FF22'
    this._ctx.lineWidth = 3
    this._body.forEach(({ x, y }) => {
      this._ctx.beginPath()
      this._ctx.roundRect(x * this._tileSize, y * this._tileSize, this._tileRenderSize, this._tileRenderSize, 3)
      this._ctx.fill()
    })

    // render apple
    // this._ctx.fillStyle = '#22F6FF20'
    // this._ctx.beginPath()
    // this._ctx.roundRect(
    //   this._apple.x * this._tileSize,
    //   this._apple.y * this._tileSize,
    //   this._tileRenderSize,
    //   this._tileRenderSize,
    //   3
    // )
    // this._ctx.fill()
  }

  private _update = () => {
    this._updateSnakePosition()
    this._handleAppleCollision()
  }

  private _updateSnakePosition = () => {
    const newHeadPosition = {
      x: this._shortestPath[this._traveledPathIndex].x,
      y: this._shortestPath[this._traveledPathIndex++].y,
    }

    for (let i = this._body.length - 1; i > 0; i--) {
      this._body[i].x = this._body[i - 1].x
      this._body[i].y = this._body[i - 1].y
    }
    this._body[0] = newHeadPosition
  }

  private _handleAppleCollision = () => {
    if (this._body[0].x !== this._apple.x || this._body[0].y !== this._apple.y) return
    this._apple = this._generateRandomAppleLocation() || { x: 0, y: 0 }
    this._body.push({ ...this._body[this._body.length - 1] })
    this._shortestPath = this._findShortestPath()
    // reset snake if it gets too long
    if (this._body.length > this._maxSnakeLength) this._body.length = this._initialSnakeLength
  }

  private _loop = () => {
    setInterval(() => {
      this._update()
      this._render()
    }, 20)
  }

  private _findShortestPath = () => {
    const start = this._body[0] // Snake's head as the starting point
    const targetX = this._apple.x // Apple's X coordinate
    const targetY = this._apple.y // Apple's Y coordinate

    const queue: Tile[] = []
    const visited = new Set<string>() // Set to track visited tiles
    const parents = new Map<string, Tile>() // Map to store the parent of each tile

    // add artifical wall to prevent snake immediatelly turning to opposite direction
    const snakeDirection =
      this._body[0].x > this._body[1].x
        ? 'right'
        : this._body[0].x < this._body[1].x
        ? 'left'
        : this._body[0].y < this._body[1].y
        ? 'up'
        : 'down'

    // apple on left side
    if (snakeDirection === 'right' && this._apple.x < this._body[0].x) {
      visited.add(`${this._body[0].x - 1},${this._body[0].y}`)
      // apple on the right side
    } else if (snakeDirection === 'left' && this._apple.x > this._body[0].x) {
      visited.add(`${this._body[0].x + 1},${this._body[0].y}`)
      // apple below
    } else if (snakeDirection === 'up' && this._apple.y > this._body[0].x) {
      visited.add(`${this._body[0].x},${this._body[0].y + 1}`)
      // apple on top
    } else if (snakeDirection === 'down' && this._apple.y < this._body[0].x) {
      visited.add(`${this._body[0].x},${this._body[0].y - 1}`)
    }
    // Add the starting point to the queue and mark it as visited
    queue.push(start)
    visited.add(`${start.x},${start.y}`)

    while (queue.length) {
      const tile = queue.shift()!
      const { x, y } = tile

      // If we reached the target, backtrack to reconstruct the shortest path
      if (x === targetX && y === targetY) {
        return this._reconstructPath(parents, start, tile) // Backtrack to get the path
      }

      // Check neighboring cells (right, left, down, up)
      let diff = x + 1
      if (diff < this._cols && !visited.has(`${diff},${y}`)) {
        queue.push({ x: diff, y })
        parents.set(`${diff},${y}`, tile) // Record the parent
        visited.add(`${diff},${y}`) // Mark as visited when added to the queue
      }

      diff = x - 1
      if (diff >= 0 && !visited.has(`${diff},${y}`)) {
        queue.push({ x: diff, y })
        parents.set(`${diff},${y}`, tile) // Record the parent
        visited.add(`${diff},${y}`) // Mark as visited when added to the queue
      }

      diff = y + 1
      if (diff < this._rows && !visited.has(`${x},${diff}`)) {
        queue.push({ x, y: diff })
        parents.set(`${x},${diff}`, tile) // Record the parent
        visited.add(`${x},${diff}`) // Mark as visited when added to the queue
      }

      diff = y - 1
      if (diff >= 0 && !visited.has(`${x},${diff}`)) {
        queue.push({ x, y: diff })
        parents.set(`${x},${diff}`, tile) // Record the parent
        visited.add(`${x},${diff}`) // Mark as visited when added to the queue
      }
    }

    // No path found
    return []
  }

  // Helper function to reconstruct the path from the target to the start
  private _reconstructPath(parents: Map<string, Tile>, start: Tile, target: Tile): Tile[] {
    const path: Tile[] = []
    let current = target

    while (current.x !== start.x || current.y !== start.y) {
      path.push(current)
      const parent = parents.get(`${current.x},${current.y}`)
      if (!parent) break // Safety check in case of missing parent
      current = parent
    }

    path.push(start) // Add the start tile at the end
    path.reverse() // Reverse the path to get it from start to target
    this._traveledPathIndex = 0
    return path
  }
}

const SnakeGameElement = ({ tileSize, reversed }: { tileSize: number; reversed: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<SnakeGame | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    gameRef.current = new SnakeGame(canvasRef.current, tileSize, reversed)
  }, [])

  return (
    <canvas
      className='fixed border-red-500 -translate-y-[2px] -translate-x-[1px] pointer-events-none'
      ref={canvasRef}
    />
  )
}

export default SnakeGameElement
