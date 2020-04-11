import '../css/main.css';
import '../css/iconfont.css';

var data;
    data = new Date();
console.log(data.toJSON());
class xuanRan{
    construtor(){

    }
    getMonthDay(y,e){
        let d;
        d = [31,30,28,29];
        if(e === 1||3||5||7||8||10||12){
            return d[0];
        } 
        if(e === 4 || 6 || 9 || 11){
            return d[1];
        }
        if(y % 400 === 0 && e === 2){
            return d[3];
        }
        if(y % 400 !== 0 && e === 2){
            return d[2];
        }
    }
    creatLi(m,d,j){
        let newLi,
            length;
        length = Number(m + d);
        dayUl.innerHTML = '';
        for(let i = 0,y = 1;i<length;i++){
            if(i >= d){
                newLi = document.createElement('li');
                newLi.textContent = y;
                newLi.className = 'dayLi';
                if(j === y){
                    newLi.classList.add('bkc');
                }
                dayUl.appendChild(newLi);
                y++;
            }
            else{
                newLi = document.createElement('li');
                dayUl.appendChild(newLi);
            }
        }
    }
    addBContent(y,m){
        let yB,
            mB;
        yB = document.querySelector('.calendar .year b');
        mB = document.querySelector('.calendar .mouth b');
        if(y !== null){
            yB.textContent = y;
        }
        if(m !== null){
            mB.textContent = m;
        }
    }
}
class gongNeng extends xuanRan{
    constructor(){
        super();
    }
    getValue(){
        let valueArray,
            yB,
            mB,
            dayBgc;
        valueArray = [];
        yB = document.querySelector('.calendar .year b').textContent;
        mB = document.querySelector('.calendar .mouth b').textContent;  
        dayBgc = document.querySelector('.calendar .day .bkc').textContent;
        valueArray.push(yB,mB,dayBgc);
        return valueArray;
    }
    addClass(e,v){
        e.classList.add(v);
    }
    removeClass(e,v){
        e.classList.remove(v);
    }
    getTime(d){
        let year,
            day,
            month,
            week,
            monthDay,
            oneWeek;
    // date = new Date();
    year = d.getFullYear();
    week = d.getDay();
    month = d.getMonth() + 1;
    day = d.getDate();
    d = new Date(`${year}.${month}.1`)
    oneWeek = d.getDay();
    monthDay = this.getMonthDay(year,month);
    this.creatLi(monthDay,oneWeek,day);
    this.addBContent(year,month);
    }
    upDate(){
        let valY,
            valM,
            valD;
        valY = Number(yearBText.textContent);
        valM = Number(mouthBText.textContent);
        valD = Number(document.getElementsByClassName('bkc')[0].textContent);
        date = new Date(`${valY}.${valM}.${valD}`);
        gN.getTime(date);
    }
    modifyInputY(e){
        let val,
        judgeRegexp,
        excludeRegexp;
    judgeRegexp = /^[\d]+年*$/;
    excludeRegexp = /^[\d]+/g;
    var ss;
    val = e.target.value;
    ss = judgeRegexp.test(val);
    if(ss){
        val = excludeRegexp.exec(val)[0]; 
        console.log(val,yearBText.textContent);
        yearBText.textContent = val;
        yShuru.value = '';
    }
    if(ss === false && val !== ''){
        alert(`你要输入正确的年份。例如：2000年或者2000`);
        yShuru.value = '';
    }
    this.removeClass(yShuru,'addInput');
    this.upDate();
    }
    modifyInputM(e){
        let val,
        judgeRegexp,
        excludeRegexp;
    judgeRegexp = /^(?:(?:0?[1-9])||(1{1}[0-2]{1}))月*$/;
    excludeRegexp = /^[\d]+/;
    var ss;
    val = e.target.value;
    ss = judgeRegexp.test(val);
    if(ss === false && val !== ''){
        alert(`你要输入正确的月份。例如：4月或者4`);
        mShuru.value = '';
    } 
    if(ss && val !== ''){
        val = excludeRegexp.exec(val)[0]; 
        // console.log(val);
        mouthBText.textContent = val;
        mShuru.value = '';
    }
    this.removeClass(mShuru,'addInput');
    this.upDate();
    }
}
var gN,
    date,
    dayUl,
    xR;
// xR = new xuanRan();

gN = new gongNeng();
date = new Date();
dayUl = document.querySelector('.calendar .day');
gN.getTime(date);
var sRiText,
    vlu,
    calendar,
    yearBText,
    mouthBText,
    dayText,
    yBWidth,
    yBHeight,
    mBWidth,
    mBHeight,
    yShuru,
    mShuru;
calendar = document.querySelector('.calendar');
sRiText = document.querySelector("input[type = 'text']") ;
yearBText = document.querySelector('.calendar .year b');
mouthBText = document.querySelector('.calendar .mouth b');
dayText = document.querySelector('.calendar .day .bkc');
yShuru = document.querySelector('.calendar .year .shuru');
mShuru = document.querySelector('.calendar .mouth .shuru');
yBWidth = yearBText.offsetWidth;
yBHeight = yearBText.offsetHeight;
mBWidth = Number(mouthBText.offsetWidth);
mBHeight = mouthBText.offsetHeight;
console.log(yBHeight,yBWidth,mBHeight,mBWidth);
yShuru.style.width = yBWidth + 'px';
yShuru.style.height = yBHeight + 'px';
mShuru.style.width = (mBWidth + 12 ) + 'px';
mShuru.style.height = mBHeight + 'px';
yBHeight = null;yBWidth = null;mBWidth = null;mBHeight = null;
calendar.addEventListener('click',function(e){
    var p;
    p = e.target.classList[0];
    if(p === 'yes'){
        vlu = gN.getValue();
        sRiText.value = `${vlu[0]}.${vlu[1]}.${vlu[2]}`;    }
    if(p === 'no'){
        gN.removeClass(calendar,'addCalendar');
    }
    if(p === 'yearPre'){
        let valY;
        valY = Number(yearBText.textContent);
        yearBText.textContent = valY - 1;
        gN.upDate();
    }
    if(p === 'yearNext'){
        let valY;
        valY = Number(yearBText.textContent);
        yearBText.textContent = valY + 1;
        gN.upDate();
    }
    if(p === 'mouthPre'){
        let valM;
        valM = Number(mouthBText.textContent);
        valM === 1?valM = 13:'';
        mouthBText.textContent = valM - 1;
        gN.upDate();
    }
    if(p === 'mouthNext'){
        let valM;
        valM = Number(mouthBText.textContent);
        valM === 12?valM = 0:'';
        mouthBText.textContent = valM + 1;
        gN.upDate();
    }
    if(p === 'yearI' || p === 'yearB'){
        gN.addClass(yShuru,'addInput');
        yShuru.focus();
    }
    if(p === 'mouthI' || p === 'mouthB'){
        gN.addClass(mShuru,'addInput');
        mShuru.focus();
    }
    if(p === 'dayLi'){
        let kl;
        kl = document.getElementsByClassName('bkc');
        gN.removeClass(kl[0],'bkc');
        gN.addClass(e.target,'bkc');
    }
},false);
yShuru.addEventListener('blur',function(e){
    gN.modifyInputY(e);
},false);
yShuru.addEventListener('keydown',function(e){
    let l;
    l = e.keyCode;
    l === 13?gN.modifyInputY(e):'';
},false)
mShuru.addEventListener('blur',function(e){
    gN.modifyInputM(e);
},false);
mShuru.addEventListener('keydown',function(e){
    let l;
    l = e.keyCode;
    l === 13?gN.modifyInputM(e):'';
},false)


