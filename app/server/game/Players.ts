
class Players {

    private players: string[] = [];

    playerExists(deviceId: string): boolean {
        return typeof this.players.find(existingPlayer => existingPlayer === deviceId) !== 'undefined'; 
    }

    addPlayer(deviceId: string){
        if(!this.playerExists(deviceId)){
            this.players.push(deviceId)
        }
    }

    removePlayer(deviceId: string){
        if(this.playerExists(deviceId)){
            const existingPlayerIndex = this.players.indexOf(deviceId);
            this.players = [
                ...this.players.slice(0,existingPlayerIndex-1),
                ...this.players.slice(existingPlayerIndex+1,this.players.length)
            ];
        }
    }
    
}

export default Players;