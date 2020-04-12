import '../css/main.css';
import '../css/iconfont.css';

class xuanRan{
    construtor(){

    }
    getMonthDay(y,e){//取得某个月有多少天
        let d;
        d = [31,30,28,29];
        if(e === 1|| e === 3|| e === 5||e === 7||e === 8||e === 10||e ===12){
            return d[0];
        } 
        if(e === 4 || e === 6 || e === 9 || e === 11){
            return d[1];
        }
        if(y % 400 === 0 && e === 2){
            return d[3];
        }
        if(y % 400 !== 0 && e === 2){
            return d[2];
        }
    }
    creatLi(m,d,j){//根据天数创建n个li元素
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
    addBContent(y,m){//改变日历中年月的value
        let yB,
            mB;
        yB = document.querySelector('.calendar .year b');
        mB = document.querySelector('.calendar .mouth b');
            yB.textContent = y;
            mB.textContent = m;

    }
}
class gongNeng extends xuanRan{
    constructor(){
        super();
    }
    getValue(){//取得日历中年月日对应的值，并返回数组
        let valueArray,
            yB,
            mB,
            dayBgc;
        valueArray = [];
        yB = Number(document.querySelector('.calendar .year b').textContent);
        mB = Number(document.querySelector('.calendar .mouth b').textContent);  
        dayBgc = Number(document.querySelector('.calendar .day .bkc').textContent);
        valueArray.push(yB,mB,dayBgc);
        return valueArray;
    }
    addClass(e,v){//添加类
        e.classList.add(v);
    }
    removeClass(e,v){//删除类
        e.classList.remove(v);
    }
    getTime(d){//将时间格式准备好，然后根据这个时间创建日期对象
        let year,
            day,
            month,
            week,
            monthDay,
            oneWeek;
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
    upDate(){//更新日历中的内容
        let kj;
        kj = this.getValue();
        date = new Date(`${kj[0]}/${kj[1]}/${kj[2]}`);
        gN.getTime(date);
    }
    modifyInputY(e){//根据输入的年份改变日历内容
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
        if(val > 99){
            let kk;
            kk = this.getValue();
            yearBText.textContent = val;
            yShuru.value = '';
            this.compare(kk,val,'year');
            this.removeClass(yShuru,'addInput');
            this.upDate();
        }
        if(val <= 99 && val !== ''){
            alert(`时间过去那么久了，就不要回味了。把时间往前拉点呗！！！`);
            yShuru.value = '';
            yShuru.focus();
        }
    }
    if(ss === false && val !== ''){
        alert(`你要输入正确的年份。例如：2000年或者2000`);
        yShuru.value = '';
        yShuru.focus();
    }
    
    }
    modifyInputM(e){//根据输入的月份改变日历的内容
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
        mShuru.focus();
    } 
    if(ss && val !== ''){
        let kk;
        kk = this.getValue();
        val = Number(excludeRegexp.exec(val)[0]); 
        mouthBText.textContent = val;
        mShuru.value = '';
        this.compare(kk,val,'mouth');
        this.removeClass(mShuru,'addInput');
        this.upDate();
    }
    }
    compare(a,v1,k){//补充因闰平年导致的月份天数不同。如果某个月没有那一天，就会跳到这个月的1号
        let day,
            dayM1,
            dayM2,
            firstLi,
            bkc;
        day = a[2];
        if(k === 'mouth'){
            dayM1 = this.getMonthDay(a[0],a[1]);
            dayM2 = this.getMonthDay(a[0],v1);
        }
        if(k === 'year'){
            dayM1 = this.getMonthDay(a[0],a[1]);
            dayM2 = this.getMonthDay(v1,a[1]);
        }
        dayM1 > dayM2 && day > dayM2?(
            firstLi = document.querySelector('.dayLi'),
            bkc = document.querySelector('.calendar .bkc'),
            gN.removeClass(bkc,'bkc'),gN.addClass(firstLi,'bkc')):'';
    }
}
var gN,
    date,
    dayUl,
    xR;
xR = new xuanRan();
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
    yShuru,
    mShuru;
calendar = document.querySelector('.calendar');
sRiText = document.querySelector("input[type = 'text']") ;
yearBText = document.querySelector('.calendar .year b');
mouthBText = document.querySelector('.calendar .mouth b');
dayText = document.querySelector('.calendar .day .bkc');
yShuru = document.querySelector('.calendar .year .shuru');
mShuru = document.querySelector('.calendar .mouth .shuru');
calendar.addEventListener('click',function(e){//日历的监听事件
    var p;
    p = e.target.classList[0];
    if(p === 'yes'){//确认的点击
        vlu = gN.getValue();
        sRiText.value = `${vlu[0]}年${vlu[1]}月${vlu[2]}号`;  
        gN.removeClass(calendar,'addCalendar');  
    }
    if(p === 'no'){//取消的点击
        gN.removeClass(calendar,'addCalendar');
    }
    if(p === 'yearPre'){//上一年的点击
        let valY;
        valY = Number(yearBText.textContent);
        yearBText.textContent = valY - 1;
        gN.upDate();
    }
    if(p === 'yearNext'){//下一年的点击
        let valY;
        valY = Number(yearBText.textContent);
        yearBText.textContent = valY + 1;
        gN.upDate();
    }
    if(p === 'mouthPre'){//上个月的点击
        let a,
            b;
        a = gN.getValue();
        b= a[1] - 1;
        b === 0?b = 12:'';
        a[1] === 1?yearBText.textContent = a[0] - 1:'';
        gN.compare(a,b,'mouth');
        mouthBText.textContent = b;
        gN.upDate();
    }
    if(p === 'mouthNext'){//下个月的点击
        let a,
            b;
        a = gN.getValue();
        b= a[1] + 1;
        b === 13?b = 1:'';
        a[1] === 12?yearBText.textContent = a[0] + 1:'';
        gN.compare(a,b,'mouth');
        mouthBText.textContent = b;
        gN.upDate();
    }
    if(p === 'yearI' || p === 'yearB'){//年份的点击
        gN.addClass(yShuru,'addInput');
        yShuru.focus();
    }
    if(p === 'mouthI' || p === 'mouthB'){//月份的点击
        gN.addClass(mShuru,'addInput');
        mShuru.focus();
    }
    if(p === 'dayLi'){//天数的点击
        let kl;
        kl = document.getElementsByClassName('bkc');
        gN.removeClass(kl[0],'bkc');
        gN.addClass(e.target,'bkc');
    }
},false);
yShuru.addEventListener('blur',function(e){//年份输入的失去焦点事件
    gN.modifyInputY(e);
},false);
yShuru.addEventListener('keydown',function(e){//年份输入的键盘按下事件
    let l;
    l = e.keyCode;
    l === 13?gN.modifyInputY(e):'';
},false)
mShuru.addEventListener('blur',function(e){//月份输入的失去焦点事件
    gN.modifyInputM(e);
},false);
mShuru.addEventListener('keydown',function(e){//月份输入的键盘按下事件
    let l;
    l = e.keyCode;
    l === 13?gN.modifyInputM(e):'';
},false)

var inputText;
inputText = document.querySelector('.text');
inputText.addEventListener('focus',function(){//生日的获得焦点事件
    let yBWidth,
        yBHeight,
        mBWidth,
        mBHeight;
    gN.addClass(calendar,'addCalendar');
    this.select();
    yBWidth = yearBText.offsetWidth;
    yBHeight = yearBText.offsetHeight;
    mBWidth = Number(mouthBText.offsetWidth);
    mBHeight = mouthBText.offsetHeight;
    yShuru.style.width = yBWidth + 'px';
    yShuru.style.height = yBHeight + 'px';
    mShuru.style.width = (mBWidth + 12 ) + 'px';
    mShuru.style.height = mBHeight + 'px';

},false)


