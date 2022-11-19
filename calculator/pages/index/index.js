// pages/index/index.js
Page({
  data: {
    result: '0',
    back: 'back',
    C: 'C',
    add: '+',
    sub: '-',
    mut: '×',
    div: '÷',
    equ: '=',
    percent: '%',
    dot: '.',
    number0: '0',
    number1: '1',
    number2: '2',
    number3: '3',
    number4: '4',
    number5: '5',
    number6: '6',
    number7: '7',
    number8: '8',
    number9: '9'
  },
  
  clickButton: function (event) {
    if (this.data.result == '0') {
      this.setData({
        result: event.target.id
      });
      }else if (event.target.id == 'back') {
      this.setData({
        result: this.data.result.length == 1 ? '0' : this.data.result.substring(0, this.data.result.length - 1)
      });
    }
    else if (event.target.id == 'C') {
      this.setData({
        result: '0'
      });
    }
    else if (event.target.id == '=') {
      this.setData({
        result: this.calculate(this.data.result)
      });
    }else {
      this.setData({
        result: this.data.result + event.target.id
      });
    }
  },
  // 计算
  calculate: function (str) {
    // console.log(str);
    var addArray = str.split('+');//把字符串分割成不含+的数字 数组
    var sum = 0;
    for (var i = 0; i < addArray.length; i++) {
      if (addArray[i].indexOf('-') == -1) {   //没有减法的情况下 有乘除
        if (addArray[i].indexOf('×') != -1 || addArray[i].indexOf('÷') != -1){
          sum =sum + this.level2(addArray[i]);
        }else sum =sum + Number(addArray[i]);
      }
      else {  //有减法的情况下 有乘除
        var subArray = addArray[i].split('-');
        var subSum = 0;
        // if(addArray[i].indexOf('×') != -1 || addArray[i].indexOf('÷') != -1){
        //   subSum =subSum - this.level2(addArray[i]);
        // }else subSum=subSum-Number(subArray[i]);
        // console.log(subSum);
        if (subArray[0].indexOf('×') != -1 || subArray[0].indexOf('÷') != -1) {//有*/
          subSum = this.level2(subArray[0]);
          console.log(subSum);
          
        }else 
        subSum = Number(subArray[0]);
        console.log(subSum);
        for (var j = 1; j < subArray.length; j++) {
          if (subArray[i].indexOf('×') != -1 || subArray[i].indexOf('÷') != -1){//有*/
            subSum =subSum - this.level2(subArray[j]);
          }else subSum =subSum - Number(subArray[j]);
              console.log(subArray);
        }
        sum =sum + subSum;
      }
    }
    
    return sum.toString();
  },
  // 第二级的乘除运算
  level2: function (str) {
    var addArray = str.split('×');
    var sum = 1;
    for (var i = 0; i < addArray.length; i++) {
      if (addArray[i].indexOf('÷') == -1) {
        sum =sum * Number(addArray[i]);
      }
      else {
        var subArray = addArray[i].split('÷');
        var subSum = Number(subArray[0]);
        for (var j = 1; j < subArray.length; j++) {
          subSum =subSum / Number(subArray[j]);
        }
        sum =sum * subSum;
      }
    }
    return sum;
  },
  
})