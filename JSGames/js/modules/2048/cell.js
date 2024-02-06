export class Cell{
    constructor(gridElem, x, y){
        const cell = document.createElement("div");
        cell.classList.add('cell');
        gridElem.append(cell);
        this.x = x;
        this.y = y;
    }

    linkTile(tile) {
        tile.setXY(this.x, this.y);
        this.linkedTile = tile;
    }

    unlinkTile(){
        this.linkedTile = null;
    }

    isEmpty(){
        return !this.linkedTile;
    }

    linkTileForMerge(tile){
        tile.setXY(this.x, this.y);
        this.linkedTileForMerge = tile;
    }

    unlinkTileFotMerage(){
        this.linkedTileForMerge = null;
    }

    hasTileForMerge(){
        return !!this.linkedTileForMerge;
    }

    canAccept(newTile){
        return this.isEmpty() || (!this.hasTileForMerge() && this.linkedTile.value === newTile.value);
    }
    mergeTiles(){
        this.linkedTile.setValue(this.linkedTile.value + this.linkedTileForMerge.value);
        this.linkedTileForMerge.removeFromDOM();
        this.unlinkTileFotMerage();
    }
}