export class Block {

    public txn          : string;
    public issuer       : string;
    public owner        : string; 
    public price        : string;
    public face_value   : string;
    public current_state: string;
    public previousHash : string;
    public hash         : string;

    constructor( txn: string ) { 
        
      this.txn          = txn;
      this.issuer       = issuer;
      this.price        = price;
      this.owner        = owner;
      this.face_value   = face_value;
      this.current_state= current_state;
      this.previousHash = previousHash;
      this.hash         = hash
      
    }

}
