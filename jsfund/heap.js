function Heap(){
    this.heap = [undefined];
}

Heap.prototype.addToHeap = function (num){
    // check for zero case
    if (this.heap.length == 0) {
        this.heap.push("undefined");
        this.heap.push(val);
        return this.heap;
    } else {
        // push the new val to our this.heap
        this.heap.push(num);
        // get the child and parent index
        c = this.heap.length - 1;
        p = Math.trunc(c / 2);
    
        // loop the this.heap until all parent value less than their child's values
        // and loop until we at index 1
        while (p >= 1 && this.heap[p] > this.heap[c]) {
            // child and parent values
            let temp = this.heap[c];
            this.heap[c] = this.heap[p];
            this.heap[p] = temp;
        
            // get the parent new index
            c = p;
            p = Math.trunc(c / 2);
        }
    }
    return this.heap;
}
    
Heap.prototype.removeMin = function (){
    var popped;
    if (this.heap.length == 1 ){
        console.log(`No more element`)
    }
    else if (this.heap.length == 2 ){
        popped = this.heap.pop();
        return popped;
    }
    else{
        let temp = this.heap[this.heap.length-1];
        this.heap[this.heap.length-1] = this.heap[1];
        this.heap[1] = temp;
        popped = this.heap.pop();
        console.log(popped)
        var p = 1;
        var c1 = 2;
        var c2 = 3;
        
        while(this.heap[c1]!=undefined && ((this.heap[c2]!=undefined && (this.heap[p]>this.heap[c1] || 
            this.heap[p] > this.heap[c2])) || (this.heap[c2] == undefined && (this.heap[p]>this.heap[c1])))){
            if (this.heap[c2]== undefined){
                let temp = this.heap[c1];
                this.heap[c1] = this.heap[p];
                this.heap[p]= temp;
            }
            else if (this.heap[c1] < this.heap[c2]){
                let temp = this.heap[c1];
                this.heap[c1] = this.heap[p];
                this.heap[p]= temp;
                p = c1
            }
            else if (this.heap[c1] > this.heap[c2]){
                let temp = this.heap[c2];
                this.heap[c2] = this.heap[p];
                this.heap[p]= temp;
                p = c2
            }
            c1 = p*2;
            c2 = p*2+1;

        }
    return popped;
    }
}

const h1 = new Heap();
console.log("heap: ", h1)

h1.addToHeap(26);
h1.addToHeap(2);
h1.addToHeap(3);
h1.addToHeap(4);
h1.addToHeap(5);
h1.addToHeap(1);
h1.addToHeap(10);
h1.addToHeap(8);
console.log(h1)
console.log(h1.removeMin());
console.log(h1)