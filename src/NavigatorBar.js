/**
 * NavigatorBar公共组件
 * Create by zhoujinlong on 2017/1/5
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';

/**
 * _backgroundColor   //背景颜色
 * title1             //标题1【必须】
 * title2             //标题2【必须】
 * titleTextSize      //标题字体大小
 * firstTitleFunc     //标题1按钮回调方法
 * secondTitleFunc    //标题2按钮回调方法
 * titleColor         //标题文字颜色
 * leftIcon           //左边图标
 * leftIconColor       //左边图标颜色
 * leftText           //左边文字，如果图像和图标一起传，则默认使用图标
 * leftTextColor      //左边文字颜色
 * leftTextSize       //左边字体大小
 * leftFunc           //左边栏的方法
 * rightIcon          //右边图标 传具体的图标
 * rightIconColor     //右边图标颜色
 * rightText          //右边文字
 * rightTextColor     //右边文字颜色
 * rightTextSize      //右边字体大小
 * rightFunc          //右边栏方法
 *
 * 示例:
 * 导航栏左边文字返回：<NavigatorBar title="工作" leftText="返回"  leftFunc={()=>{alert(2);}} />
 * 导航栏左边图片：<NavigatorBar title="工作" leftIcon={"&#xe7c0;"}  leftFunc={()=>{alert(2);}} />
 *
 */

export default class NavigatorBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedTitleStyle : [],
      uncheckedTitleStyle : [],
      firstTitleStyle:[],
      secondTitleStyle:[],
      params : props,
    }
    //选中的标题按钮样式处理
    this.state.checkedTitleStyle.push(styles.checkedTitleStyle);
    props.titleColor ? this.state.checkedTitleStyle.push({color: props.titleColor}) : this.state.checkedTitleStyle.push({color: '#000000'});
    props.titleTextSize ? this.state.checkedTitleStyle.push({fontSize:props.titleTextSize}):this.state.checkedTitleStyle.push({fontSize:18});
    //未选中的标题按钮样式处理
    this.state.uncheckedTitleStyle.push(styles.uncheckedTitleStyle);
    props.titleColor ? this.state.uncheckedTitleStyle.push({color: props.titleColor}) : this.state.uncheckedTitleStyle.push({color: '#000000'});
    props.titleTextSize ? this.state.uncheckedTitleStyle.push({fontSize: props.titleTextSize}) : this.state.uncheckedTitleStyle.push({fontSize:18});

    //初始化标题按钮的样式
    this.state.firstTitleStyle = this.state.checkedTitleStyle;
    this.state.secondTitleStyle = this.state.uncheckedTitleStyle;

  }
  //标题1按钮事件
  firstTitlePress(){
    if(this.state.params.secondTitleFunc===undefined){
      alert("标题按钮1没有回调函数！");
    }else{
      this.state.params.firstTitleFunc();
    }
    this.setState({
      firstTitleStyle:this.state.checkedTitleStyle,
      secondTitleStyle:this.state.uncheckedTitleStyle,
    });
  }
  //标题2按钮事件2
  secondTitlePress(){
    if(this.state.params.secondTitleFunc===undefined){
      alert("标题按钮2没有回调函数！");
    }else{
      this.state.params.secondTitleFunc();
    }
    this.setState({
      firstTitleStyle:this.state.uncheckedTitleStyle,
      secondTitleStyle:this.state.checkedTitleStyle,
    });
  }
  render() {
    let {_backgroundColor,title1,title2,titleTextSize, titleColor, leftIcon, leftIconColor, leftText, leftTextSize, leftTextColor, leftFunc, rightIcon, rightIconColor, rightText, rightTextSize, rightTextColor, rightFunc} = this.state.params;
    let titleFalg = title1 || title2;
    let _titleFalg = title1 && title2;
    let backgroundStyle = [];
    //背景处理
    backgroundStyle.push(styles.container);
    _backgroundColor?backgroundStyle.push({backgroundColor:_backgroundColor}):backgroundStyle.push({backgroundColor:"#CC1B23"});

    //左边栏处理
    let leftFalg = leftIcon || leftText;
    if (leftFalg) {
      if (!leftFunc) {
        throw new Error("请传左边栏的回调方法");
      }
    }
    let leftTextStyleArray = [];
    leftTextStyleArray.push(styles.leftTextStyle);
    leftTextColor ? leftTextStyleArray.push({color: leftTextColor}) : leftTextStyleArray.push({color: "#FFFFFF"});
    leftTextSize ? leftTextStyleArray.push({fontSize: leftTextSize}) : leftTextStyleArray.push({fontSize:14});

    //左边图标处理
    let leftIconStyleArray = [];
    leftIconStyleArray.push(styles.leftIconStyle);
    leftIconColor ? leftIconStyleArray.push({color:leftIconColor}):leftIconStyleArray.push({color:"#FFFFFF"});
    //右边栏处理
    let rightFalg = rightIcon || rightText;
    if (rightFalg) {
      if (!rightFunc) {
        throw new Error("请传右边栏的回调方法");
      }
    }
    let rightTextStyleArray = [];
    rightTextStyleArray.push(styles.rightTextStyle);
    rightTextColor ? rightTextStyleArray.push({color: rightTextColor}) : rightTextStyleArray.push({color: "#FFFFFF"});
    rightTextSize ? rightTextStyleArray.push({fontSize: rightTextSize}) : rightTextStyleArray.push({fontSize: 14});
    //右边图标处理
    let rightIconStyleArray = [];
    rightIconStyleArray.push(styles.rightIconStyle);
    rightIconColor ? rightIconStyleArray.push({color:rightIconColor}):rightIconStyleArray.push({color:"#FFFFFF"});

    return (
      <View style={backgroundStyle}>
      {//中间标题
        titleFalg?
        _titleFalg?
        <View style={styles.titleStyle}>
          <TouchableOpacity activeOpacity={1} onPress={this.firstTitlePress.bind(this)}>
            <Text style={this.state.firstTitleStyle}>&nbsp;&nbsp;&nbsp;{title1}&nbsp;&nbsp;&nbsp;</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={this.secondTitlePress.bind(this)}>
            <Text style={this.state.secondTitleStyle}>&nbsp;&nbsp;&nbsp;{title2}&nbsp;&nbsp;&nbsp;</Text>
          </TouchableOpacity>
        </View>
        :
        <View >
        {
          title1?
          <TouchableOpacity activeOpacity={1} onPress={this.firstTitlePress.bind(this)}>
            <Text style={[this.state.firstTitleStyle,{backgroundColor:_backgroundColor}]}>{title1}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity activeOpacity={1} onPress={this.firstTitlePress.bind(this)}>
            <Text style={this.state.secondTitleStyle}>{title2}</Text>
          </TouchableOpacity>
        }
        </View>
        :null
      }

      {
        //左边栏
        leftFalg ?
        <TouchableOpacity onPress={leftFunc} style={[styles.leftStyle]}>
        {
          leftText?
          leftIcon?
          <View style={styles.leftTouchStyle}>
            <Text style={leftIconStyleArray}>{leftIcon}</Text>
            <Text style={leftTextStyleArray}>{leftText}</Text>
          </View>
          :
          <View style={styles.leftTouchStyle}>
            <Text style={leftTextStyleArray}>{leftText}</Text>
          </View>
          :
          <View style={styles.leftTouchStyle}>
            <Text style={{fontFamily:'iconfont',color:"white",marginLeft:0, }}>{leftIcon}</Text>
          </View>
        }
        </TouchableOpacity>
        :
        null
     }
      {//右边栏
        rightFalg ?
        <TouchableOpacity onPress={rightFunc} style={styles.rightStyle}>
        {
          rightText?
          rightIcon?
          <View style={styles.rightTouchStyle}>
            <Text style={rightIconStyleArray}>{rightIcon}</Text>
            <Text style={rightTextStyleArray}>{rightText}</Text>
          </View>
          :
          <View style={styles.rightTouchStyle}>
            <Text style={rightTextStyleArray}>{rightText}</Text>
          </View>
          :
          <View style={styles.rightTouchStyle}>
            <Text style={{fontFamily:'iconfont',color:"white" }}>{rightIcon}</Text>
          </View>
        }
        </TouchableOpacity>
        :null
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: Platform.OS === 'ios' ? 64 : 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  titleStyle:{
    flexDirection:'row',
    borderWidth:1,
    borderColor:"#FFFFFF",
    borderRadius:3,
  },
  checkedTitleStyle:{
    color:"blue",
    backgroundColor:"white",
  },
  uncheckedTitleStyle:{
    color:"blue",
    backgroundColor:"#CC1B23",
    borderRadius:3,
  },

  leftStyle: {
    height: 44,
    position: 'absolute',//绝对布局
    top: Platform.OS === 'ios' ? 20 : 0,
    left: 10,
    alignItems: 'center',
  },
  leftTextStyle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 0,
  },
  leftIconStyle: {
    fontFamily:'iconfont',
  },
  leftTouchStyle: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
  },
  rightStyle: {
    height: 44,
    position: 'absolute',//绝对布局
    top: Platform.OS === 'ios' ? 20 : 0,
    right:10,
    alignItems: 'center',
  },
  rightTextStyle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight:0,
  },
  rightTouchStyle:{
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
  },
  rightIconStyle: {
    fontFamily:'iconfont',
  },
});
