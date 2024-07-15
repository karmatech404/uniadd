function SampleOrder(name, status, description){
    this.name = name;
    this.status = status;
    this.description = description;
}


let sample_order1 = new SampleOrder("DEPED1","pending1","GRADUATION1");
let sample_order2 = new SampleOrder("DEPED2","pending2","GRADUATION2");
let sample_order3 = new SampleOrder("DEPED3","pending3","GRADUATION3");
let sample_order4 = new SampleOrder("DEPED4","pending4","GRADUATION4");
let sample_order5 = new SampleOrder("DEPED5","pending5","GRADUATION5");
let sample_order6 = new SampleOrder("DEPED6","pending6","GRADUATION6");


let sample_order_array = [sample_order1,sample_order2,sample_order3,sample_order4,sample_order5,sample_order6];


export {sample_order_array};