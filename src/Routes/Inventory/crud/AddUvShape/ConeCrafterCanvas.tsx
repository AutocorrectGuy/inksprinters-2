import React, { useEffect, useRef } from 'react'
import { round } from '../../../Tools/Cone Crafter/calculateConeProperties'
import { StateType } from './AddUvShape'
import { UvShapeType } from '../../../../libs/dexie/models/uv/UvShape'

type ConeCrafterCanvasProps = {
  shapeType: UvShapeType
  baseDiameter: number
  coneHeight: number
  rotation: number
  minorDiameter: number
  productHeight: number
  setState: React.Dispatch<React.SetStateAction<StateType>>
  xPosition: number
  yPosition: number
  lensSize: number
}

const canvasSize = 400
const center = canvasSize / 2
const dotsPerRow = 14
const dotsWithinMarkingArea = 8
const dotDistance = canvasSize / dotsPerRow

const ConeCrafterCanvas = ({
  shapeType,
  baseDiameter,
  minorDiameter,
  coneHeight,
  rotation,
  productHeight,
  setState,
  xPosition,
  yPosition,
  lensSize,
}: ConeCrafterCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const realLifeSpaceBetweenDots = lensSize / dotsWithinMarkingArea
  const scaling = dotDistance / realLifeSpaceBetweenDots
  console.log(realLifeSpaceBetweenDots, lensSize)

  const renderTriangle = (ctx: CanvasRenderingContext2D, zeroPoint: { x: number; y: number }) => {
    // Yellow triangle geometry
    const scaledBaseDiameter = baseDiameter * scaling
    const scaledHalfDiameter = scaledBaseDiameter / 2
    const scaledConeHeight = coneHeight * scaling
    const scaledProductHeight = productHeight * scaling
    const scaledBaseRadius = (baseDiameter * scaling) / 2
    const scaledMinorRadius = (minorDiameter * scaling) / 2
    const offset = { x: xPosition * scaling - scaledHalfDiameter, y: yPosition * scaling }
    const point1 = { x: zeroPoint.x + offset.x, y: zeroPoint.y - offset.y }
    const point2 = { x: zeroPoint.x + offset.x + scaledBaseDiameter, y: zeroPoint.y - offset.y }
    const point3 = { x: zeroPoint.x + offset.x + scaledHalfDiameter, y: zeroPoint.y - scaledConeHeight - offset.y }
    const baseCenterX = zeroPoint.x + offset.x + scaledHalfDiameter
    const baseCenterY = zeroPoint.y - offset.y

    // Green Printarea geometry
    const diff = Math.abs(scaledBaseRadius - scaledMinorRadius)
    const apexAngleInRadians = Math.atan(diff / scaledProductHeight)
    const printAreaOffsetX = scaledProductHeight * Math.sin(apexAngleInRadians)

    // Calculations for updating form state
    const scaledalculatedConeHeight =
      (Math.sqrt(scaledProductHeight ** 2 + diff ** 2) *
        (scaledBaseRadius > scaledMinorRadius ? scaledBaseRadius : scaledMinorRadius)) /
      diff

    ctx.save()

    // Render red dot
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(baseCenterX - 5, baseCenterY - 5, 10, 10)

    // Rotation
    ctx.translate(baseCenterX, baseCenterY)
    ctx.rotate(-((rotation - 90) * Math.PI) / 180)
    ctx.translate(-baseCenterX, -baseCenterY)

    // Render Yellow Triangle
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 1
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(point1.x, point1.y)
    ctx.lineTo(point2.x, point2.y)
    ctx.lineTo(point3.x, point3.y)
    ctx.closePath()
    ctx.stroke()

    // Render Inner Green Rectangle
    ctx.strokeStyle = '#00FF00'
    ctx.fillStyle = '#00FF0050'
    ctx.beginPath()
    ctx.moveTo(point1.x, point1.y)
    ctx.lineTo(point1.x + printAreaOffsetX, point1.y - scaledProductHeight)
    ctx.lineTo(point2.x - printAreaOffsetX, point2.y - scaledProductHeight)
    ctx.lineTo(point2.x, point2.y)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()

    ctx.restore()

    // Update form state for Cone Height and rotation by y values
    setState((prev) => ({
      ...prev,
      cone_height: scaledalculatedConeHeight ? round(scaledalculatedConeHeight / scaling).toString() : '',
      rotation_by_y: apexAngleInRadians ? round(-(apexAngleInRadians * 180) / Math.PI).toString() : '',
    }))
  }

  const renderRectangle = (ctx: CanvasRenderingContext2D, zeroPoint: { x: number; y: number }) => {
    const scaledHalfDiameter = baseDiameter * scaling
    const scaledHalfBaseDiameter = scaledHalfDiameter / 2
    const cylinderLength = dotDistance * dotsWithinMarkingArea

    const offset = { x: xPosition * scaling - scaledHalfBaseDiameter, y: yPosition * scaling }

    const baseCenterX = zeroPoint.x + offset.x + scaledHalfBaseDiameter
    const baseCenterY = zeroPoint.y - offset.y

    ctx.lineWidth = 1
    ctx.lineCap = 'round'

    ctx.save()
    ctx.translate(baseCenterX, baseCenterY)
    ctx.rotate(((rotation - 270) * Math.PI) / 180)
    ctx.translate(-baseCenterX, -baseCenterY)
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(baseCenterX - 5, baseCenterY - 5, 10, 10)

    ctx.fillStyle = '#00FF0050'
    ctx.strokeStyle = '#00FF00'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.rect(zeroPoint.x + offset.x, zeroPoint.y - offset.y, scaledHalfDiameter, cylinderLength) // Replace with your actual rectangle dimensions
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }

  const renderRectAndCircle = (ctx: CanvasRenderingContext2D, rectSize: number, rectOffset: number) => {
    const w = rectSize // width of the rectangle
    const h = rectSize // height of the rectangle
    const x = rectOffset // x coordinate of the top-left corner
    const y = rectOffset // y coordinate of the top-left corner

    // Circle geometry
    const cx = x + w / 2
    const cy = y + h / 2
    const r = Math.sqrt((w / 2) ** 2 + (h / 2) ** 2)

    // Render rectangle
    ctx.lineWidth = 1
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#FFFF00FF'
    ctx.strokeRect(x, y, w, h)

    // Render cross
    ctx.beginPath()
    ctx.moveTo(x, center)
    ctx.lineTo(x + rectSize, center)
    ctx.moveTo(center, y)
    ctx.lineTo(center, y + rectSize)
    ctx.closePath()
    ctx.stroke()

    // Render circle
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, 2 * Math.PI)
    ctx.stroke()

    // Render red text
    ctx.fillStyle = '#FFFFFF' 
    ctx.font = '18px Arial' 
    ctx.textAlign = 'center' 
    ctx.fillText(`${lensSize} mm`, x + w/2, y - 6)
  }

  const renderBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'black'
    ctx.clearRect(0, 0, canvasSize, canvasSize)
    ctx.fillRect(0, 0, canvasSize, canvasSize)
    // render background dots
    ctx.fillStyle = 'white'
    for (let i = 1; i < dotsPerRow; i++) {
      for (let j = 1; j < dotsPerRow; j++) {
        ctx.fillRect(i * dotDistance, j * dotDistance, 1, 1)
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    // Shared Triangle and rectangle geometry
    const rectSize = dotDistance * 8
    const rectOffset = (canvasSize - rectSize) / 2
    const zeroPoint = { x: rectOffset, y: rectSize + rectOffset }

    // Main rendering
    renderBackground(ctx)
    renderRectAndCircle(ctx, rectSize, rectOffset)
    shapeType === 'cone' ? renderTriangle(ctx, zeroPoint) : renderRectangle(ctx, zeroPoint)
  }, [baseDiameter, coneHeight, rotation, minorDiameter, productHeight, xPosition, yPosition, shapeType, lensSize])

  return <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className='border border-cyan-900' />
}

export default ConeCrafterCanvas
