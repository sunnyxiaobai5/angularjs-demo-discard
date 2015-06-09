//用于将对象转换为springMVC可识别的对象形式
var parseParamForSpringMVC = function(obj){
    //最终组合成功的对象
    var resultObj = {};
    //递归方法，用于深度转换每一个参数
    //key 对象时，是属性名
    //value 属性值
    //prefix（关键），和key进行组合相组合成想要的格式类型如name.age（对象）或name[0].age（数组）
    var deepParseParams = function(key,value,prefix){

        //先判断是否是数组
        if(value instanceof Array){
            for(var i in value){
                deepParseParams("",value[i],prefix+key+"["+i+"]");
            }
        }
        //再判断是否是对象
        else if(value instanceof Object){
            for(var i in value){
                deepParseParams("."+i,value[i],prefix+key);
            }
        }
        //如果不是数组或对象，到了此次递归的最后一次，将完成组合的这条最终数据放在最终组合对象中
        else{
            resultObj[prefix+key] = value;
        }

    };
    //因为传入的转换参数必须是对象,而且第一次传入和第二次开始组合“.”号是很特殊的地方，所有
    //第一次单独循环
    for(var i in obj){
        deepParseParams("",obj[i],i);
    }

    //返回转换成功的对象集合
    return resultObj;
};
