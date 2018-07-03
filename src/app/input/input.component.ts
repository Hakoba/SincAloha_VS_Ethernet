import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {transformMenu} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  animations: [
    trigger('multi', [
      state('start', style({
        display: 'none',
        width: '0px',
        height: '0px',
        opacity: 0
      })),
      state('end', style({
        minWidth: '37%',
        display: 'block',
        height: '110%',
        opacity: 1,
      })),
      transition('start <-> end', animate(900))
    ])
  ]

})
export class InputComponent implements OnInit {
  panelOpenState: boolean = false;
  multiState = 'start';
form: FormGroup;
  answers = [{
    type: 'EN',
    text: 'Ethernet'
  }, {
      type: 'TR',
      text: 'Token Ring'

    }
  ];
lol: any;
vars = new Map();
  constructor(){}
ngOnInit() {
  this.form = new FormGroup({
    length  : new FormControl('20', [Validators.required]),
   // answers : new FormControl('', [Validators.required]),
    frames  : new FormControl('999', [Validators.required]),
    users   : new FormControl('5', [Validators.required]),
    time    : new FormControl('12', [Validators.required]),
    norm    : new FormControl('23', [Validators.required, Validators.maxLength(2)]),
    bit     : new FormControl('64', [Validators.required])
  }
  )
  this.lol= [];

}
getRandomInt(min, max) {return Math.floor(Math.random() * (max - min)) + min }
rand(){let a;
    return a = this.getRandomInt(1, 100);
  }
  initVars(){
    const T = 5;
    let tau, p,v,time;
    time = 0;
    let frames =  this.form.value.frames;
    let L = this.form.value.length;
    let N: number  = this.form.value.users;
    let m: number  = this.form.value.bit;
    p =  (Math.pow(1-1/N, N-1)*100); //вероятность коллизии
    tau = (L*2)*T; //время, в течение которого 1 кадр идет от станции А к станции В//длина сообщения(мкс)
   // console.log('tau = ', tau);
   // console.log('p = ', p, ' % ');
    this.vars.set('Users',N);         this.vars.set('Length',L);    this.vars.set('Chance', p);  this.vars.set('Message', m);
    this.vars.set('Frames', frames);  this.vars.set('Time', time);  this.vars.set('Tau', tau);
    return this.vars;

  }
  Ethernet() {
  // --------------------------Переменные, функции --------------------------------
this.initVars()
  let col= 0, v = 0;
    let p      = this.vars.get('Chance');
    let m      = this.vars.get('Message');
    let frames = this.vars.get('Frames');
    let time   = this.vars.get('Time');
    let tau    = this.vars.get('Tau');
    m = parseInt(m);
    m= m*10;
    console.log(m + "TAU");
  for(let i = 1; i<=frames; i++){
    v = this.rand();
    if(v<=p){
      col+=1;
      while(v<p){
        time+=2*tau;
        v = this.rand();
      }
      time = time + m + tau;
    }
    time = time + m + tau;
  }

  let quantityFr: number = +col + +frames; //всего кадров
  //  console.log(quantityFr+" Всего кадров");
  let oF = time/frames; let oneFrame = oF.toFixed(3); // Среднее время посылки 1 кадра
  let timeT = (time/1000000); // Затраченное время (всего)(1 сек == 1лям мкс && 1^-6 сек == 1 мкс)
  let capab = (quantityFr)/timeT;  let capability = capab.toFixed(3);
  let nCap = +frames/(quantityFr); let normalCapacity = nCap.toFixed(3);
return this.lol = [timeT, oneFrame, capability, normalCapacity]

}

sincAloha(){
  this.initVars()
  let time = this.form.value.time;
  let r      = this.vars.get('Message');

  r = parseInt(r);
  console.log(r)
  let n      = this.vars.get('Users');
  let packages = this.vars.get('Frames');
let g = this.form.value.norm/ 100;
let p = Math.exp(-g);
let rp = this.rand() / 100; // a = rp
//console.log(rp , "rp")
let successPack = 0;
let falsePack = 0;
for( let i = 0; i<packages; i++){
  while(rp>=p){
    rp = this.rand() / 100;

    console.log(p, " =p" , rp, " = rp");
      falsePack++;
    //console.log("falsePack++")
  }
  successPack++
  //console.log("successPack++ in false")
}
console.log(successPack + falsePack , 'Отправленные пакеты')
  packages= parseInt(packages);
let rg = ((successPack + falsePack)*5*(1/r))/packages;
  console.log(successPack,  "= sp; ", falsePack, "= fp; ", packages, "= pack;", rg, "= rg;")
let s  = (rg*Math.exp(-rg)).toFixed(3);
  time = time*10;
  console.log(s , 'Опытное значение производительности')
let timeTA = ((successPack + falsePack) / time).toFixed(3);
console.log(timeTA, " timeTA");
time= time/1000000;
let oneFrameA = ((successPack + falsePack) / (time*packages)).toFixed(3);
 // console.log(oneFrameA, " OneFrame")
  let normC = (g*Math.exp(-g)).toFixed(3);
this.lol.push(s, timeTA, oneFrameA, normC);

}

onSubmit() {
 // console.log('Submited', this.form);
 // console.log( this.form.value.users);
this.Ethernet();
this.sincAloha();
  console.log(this.lol);
this.multiState = 'end';
//this.multiState = this.multiState === 'start'? 'end': 'start';
}
}
