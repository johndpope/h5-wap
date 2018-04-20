let timeOpen
let timeEnd

export const downTimer = {
  data () {
    return {
      endTime: 0, // 封盘时间
      opentime: 0, // 开奖时间
    }
  },
  methods: {
    // 开奖倒计时
    countdowmOpen () {
      clearInterval(timeOpen)
      if (this.opentime > 0) {
        timeOpen = setInterval(() => {
          this.opentime = this.opentime - 1
        }, 1000)
      }
    },
    // 封盘倒计时
    countdownFP () {
      clearInterval(timeEnd)
      if (this.endTime > 0) {
        timeEnd = setInterval(() => {
          this.endTime = this.endTime - 1
        }, 1000)
      } else {
        clearInterval(timeEnd)
        // 封盘时间到，则禁止输入框写入，快捷下注选择
        document.getElementById('fastInput').setAttribute('placeholder', '已封盘')
        document.getElementById('fastInput').disabled = true
        document.getElementById('fastInput').value = ''
      }
    }
  }
}

export const myfilter = {
  filters: {
    // 判断大小
    filterDx (n, s) {
      if(n>s) return '大'
      else return '小'
    },
    // 判断广西十分彩大小跟和值
    filterGxsfcDxHz (n,s) {
      if (n != 21) {
        if(n>s) return '大'
        else return '小'
      } else {
        return '和'
      }
    },
    // 判断广东11选5和值
    filterGdDxHz (n,s) {
      if (n != 11) {
        if(n>s) return '大'
        else return '小'
      } else {
        return '和'
      }
    },
    // 判断单双
    filterDs(n){
      if(n%2==0) return '双'
      else return '单'
    },
    // 判断彩票大小字体颜色
    filterDxColor(n,s){
      if(n>s) return 'big-color'
      else return 'small-color'
    },
    // 判断彩票单双字体颜色
    filterDsColor(n){
      if(n%2==0) return 'double-color' // 双颜色
      else return 'single-color' // 单颜色
    },
    // 判断六合彩号码的波色跟单双
    filterSixDsBs (n) {
      let ballType = ''
      switch (n-0){
        case 1:
        case 7:
        case 13:
        case 19:
        case 23:
        case 29:
        case 35:
        case 45:
            ballType = '红单'
            break
        case 2:
        case 8:
        case 12:
        case 18:
        case 24:
        case 30:
        case 34:
        case 40:
        case 46:
          ballType = '红双'
          break;
        case 3:
        case 9:
        case 15:
        case 25:
        case 31:
        case 37:
        case 41:
        case 47:
          ballType = '蓝单'
          break
        case 4:
        case 10:
        case 14:
        case 20:
        case 26:
        case 36:
        case 42:
        case 48:
          ballType = '蓝双'
          break
        case 5:
        case 11:
        case 17:
        case 21:
        case 27:
        case 33:
        case 39:
        case 43:
        case 49:
          ballType = '绿单'
          break
        case 6:
        case 16:
        case 22:
        case 28:
        case 32:
        case 38:
        case 44:
          ballType = '绿双'
          break
        default :
            break;
      }
      return ballType;
    },
    // 六合彩开奖结果波色
    filterSixBsColor(n){
      let ballColor=''
      switch (n-0){
          case 1:
          case 2:
          case 7:
          case 8:
          case 12:
          case 13:
          case 18:
          case 19:
          case 23:
          case 24:
          case 29:
          case 30:
          case 34:
          case 35:
          case 40:
          case 45:
          case 46:
              ballColor = "rColor"
              break
          case 5:
          case 6:
          case 11:
          case 16:
          case 17:
          case 21:
          case 22:
          case 27:
          case 28:
          case 32:
          case 33:
          case 38:
          case 39:
          case 43:
          case 44:
          case 49:
              ballColor = "gColor"
              break
          case 3:
          case 4:
          case 9:
          case 10:
          case 14:
          case 15:
          case 20:
          case 25:
          case 26:
          case 31:
          case 36:
          case 37:
          case 41:
          case 42:
          case 47:
          case 48:
              ballColor = "bColor"
              break
          default :
              break
      }
      return ballColor
    },
    // 六合彩号码波色
    filterSixBsBgColor(n){
      let ballColor=''
      switch (n-0){
          case 1:
          case 2:
          case 7:
          case 8:
          case 12:
          case 13:
          case 18:
          case 19:
          case 23:
          case 24:
          case 29:
          case 30:
          case 34:
          case 35:
          case 40:
          case 45:
          case 46:
              ballColor = "rbgColor"
              break
          case 5:
          case 6:
          case 11:
          case 16:
          case 17:
          case 21:
          case 22:
          case 27:
          case 28:
          case 32:
          case 33:
          case 38:
          case 39:
          case 43:
          case 44:
          case 49:
              ballColor = "gbgColor"
              break
          case 3:
          case 4:
          case 9:
          case 10:
          case 14:
          case 15:
          case 20:
          case 25:
          case 26:
          case 31:
          case 36:
          case 37:
          case 41:
          case 42:
          case 47:
          case 48:
              ballColor = "bbgColor"
              break
          default :
              break
      }
      return ballColor
    },
    fllterSixSx(n){
      let a = '';
      switch(n-0){
          case 1:
          case 13:
          case 25:
          case 37:
          case 49:
              a = '狗';
              break;
          case 2:
          case 14:
          case 26:
          case 38:
              a = '鸡';
              break;
          case 3:
          case 15:
          case 27:
          case 39:
              a='猴';
              break;
          case 4:
          case 16:
          case 28:
          case 40:
              a='羊';
              break;
          case 5:
          case 17:
          case 29:
          case 41:
              a='马';
              break;
          case 6:
          case 18:
          case 30:
          case 42:
              a='蛇';
              break;
          case 7:
          case 19:
          case 31:
          case 43:
              a='龙';
              break;
          case 8:
          case 20:
          case 32:
          case 44:
              a='兔';
              break;
          case 9:
          case 21:
          case 33:
          case 45:
              a='虎';
              break;
          case 10:
          case 22:
          case 34:
          case 46:
              a='牛';
              break;
          case 11:
          case 23:
          case 35:
          case 47:
              a='鼠';
              break;
          case 12:
          case 24:
          case 36:
          case 48:
              a='猪';
              break;
          default :
              break;
      }
      return a;
    },
  }
}