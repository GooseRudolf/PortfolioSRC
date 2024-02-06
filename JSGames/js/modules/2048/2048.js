import { Grid } from './grid.js'
import { Tile } from './tile.js'

let xDown = null
let yDown = null
const activeTab = document.getElementById('Tab1')
const gameboard = document.getElementById('game-board')
const grid = new Grid(gameboard)
restart()

function setupInputOnce() {
    window.addEventListener("keydown", handleInput, { once: true })
    document.addEventListener('touchstart', handleTouchStart, false)
    document.addEventListener('touchmove', handleInputMobile, false)
}

async function handleInput(event) {
    if (!activeTab.classList.contains('activeTab')) {
        setupInputOnce()
        return
    }
    switch (event.key) {
        case 'ArrowUp':
            if (!cantMove('UP')) {
                setupInputOnce()
                return
            }
            await slideTiles(grid.cellsGroupedByColumn)
            break
        case 'ArrowDown':
            if (!cantMove('DOWN')) {
                setupInputOnce()
                return
            }
            await slideTiles(grid.cellsGroupedByReversedColumn)
            break
        case 'ArrowLeft':
            if (!cantMove('LEFT')) {
                setupInputOnce()
                return
            }
            await slideTiles(grid.cellsGroupedByRow)
            break
        case 'ArrowRight':
            if (!cantMove('RIGHT')) {
                setupInputOnce()
                return
            }
            await slideTiles(grid.cellsGroupedByReversedRow)
            break
        default:
            setupInputOnce()
            return
    }
    const newTile = new Tile(gameboard)
    grid.getRandomEmptyCell().linkTile(newTile)

    if (!cantMove('UP') && !cantMove('DOWN') && !cantMove('LEFT') && !cantMove('RIGHT')) {
        await newTile.waitForAnimationEnd()
        showPopup()
        return
    }

    setupInputOnce()
}
function handleTouchStart(event) {
    xDown = event.touches[0].clientX
    yDown = event.touches[0].clientY
}
async function handleInputMobile(event) {
    if (!activeTab.classList.contains('activeTab')) {
        setupInputOnce()
        return
    }

    if (!xDown || !yDown)
        return
    let xDiff = xDown - event.touches[0].clientX
    let yDiff = yDown - event.touches[0].clientY

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            if (!cantMove('LEFT')) {
                setupInputOnce()
                return
            }
            await slideTiles(grid.cellsGroupedByRow)
        } else {
            if (!cantMove('RIGHT')) {
                setupInputOnce()
                return
            }
            await slideTiles(grid.cellsGroupedByReversedRow)
        }
    } else {
        if (yDiff > 0) {
            if (!cantMove('UP')) {
                setupInputOnce()
                return
            }
            await slideTiles(grid.cellsGroupedByColumn)
        } else {
            if (!cantMove('DOWN')) {
                setupInputOnce()
                return
            }
            await slideTiles(grid.cellsGroupedByReversedColumn)
        }
    }
    xDown = null
    yDown = null

    const newTile = new Tile(gameboard)
    grid.getRandomEmptyCell().linkTile(newTile)

    if (!cantMove('UP') && !cantMove('DOWN') && !cantMove('LEFT') && !cantMove('RIGHT')) {
        await newTile.waitForAnimationEnd()
        showPopup()
        return
    }

    setupInputOnce()
}

async function slideTiles(groupedCells) {
    const promises = []
    groupedCells.forEach(group => slideTilesInGroup(group, promises))

    await Promise.all(promises)

    grid.cells.forEach(cell => {
        cell.hasTileForMerge() && cell.mergeTiles()
    })
}
function slideTilesInGroup(group, promises) {
    for (let i = 1; i < group.length; i++) {
        if (group[i].isEmpty()) {
            continue
        }
        const cellWithTile = group[i]
        let targetCell
        let j = i - 1
        while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {//mb
            targetCell = group[j]
            j--
        }
        if (!targetCell) {
            continue
        }

        promises.push(cellWithTile.linkedTile.waitForTransitionEnd())

        if (targetCell.isEmpty()) {
            targetCell.linkTile(cellWithTile.linkedTile)
        } else {
            targetCell.linkTileForMerge(cellWithTile.linkedTile)
        }
        cellWithTile.unlinkTile()
    }
}
function cantMove(str) {
    switch (str) {
        case "UP":
            return grid.cellsGroupedByColumn.some(group => canMoveInGroup(group))
        case "DOWN":
            return grid.cellsGroupedByReversedColumn.some(group => canMoveInGroup(group))
        case "LEFT":
            return grid.cellsGroupedByRow.some(group => canMoveInGroup(group))
        case "RIGHT":
            return grid.cellsGroupedByReversedRow.some(group => canMoveInGroup(group))
        default:
            break
    }
}
function canMoveInGroup(group) {
    return group.some((cell, index) => {
        if (index === 0) {
            return false
        }
        if (cell.isEmpty()) {
            return false
        }
        const targetCell = group[index - 1]
        return targetCell.canAccept(cell.linkedTile)
    })
}

function restart() {
    grid.cellsGroupedByColumn.forEach(group => {
        for (let i = 0; i < group.length; i++) {
            if (!group[i].isEmpty()) {
                group[i].linkedTile.removeFromDOM()
                group[i].unlinkTile()
            }
        }
    })
    grid.getRandomEmptyCell().linkTile(new Tile(gameboard))
    grid.getRandomEmptyCell().linkTile(new Tile(gameboard))
    setupInputOnce()
}

function showPopup() {
    document.querySelector('.looseScreen').classList.add('activePopup')
    document.querySelector('.looseScreenBody').classList.add('activePopup')
}
document.querySelector('.btnLoose').addEventListener('click', () => restart())
document.querySelector('.looseScreen').addEventListener('click', () => restart())