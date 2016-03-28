/**
 * Created by Administrator on 2016/03/26.
 */

function getDateStr(dat){
    var y = dat.getFullYear();
    var m = dat.getMonth()+1;//getMonth返回0~11
    m = m < 10 ?'0'+m:m;
    var d = dat.getDate();
    d = d < 10? '0'+d:d;
    return y+'-'+m+'-'+d;
}

function randomBuildData(seed){
    var returnData = {};
    var dat = new Date('2016-01-01');
    var datStr = '';
    for(var i = 0 ; i < 92 ; i++){

        datStr = getDateStr(dat);

        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate()+1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

var chartData = {};

var pageState = {
    nowSelectCity:-1,
    nowGraTime:'day'
};
/*
根据当前chartData，重新渲染图表
 */
function renderChart(){
    var city = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    var timeStr = time =='day'?'天':(time == 'week'?'周':'月');
    var title = {
        text:'这是'+city+'每'+timeStr+'空气质量指数'
    }
    var x = new Array();//横坐标
    var s = new Array();//数据series
    for(var i in chartData){
        x.push(i);
        var da = new Array();//存放数据的数组
        da.push(chartData[i]);
        var sery = {
            name:i,
            data:da
        };
        s.push(sery);
    }

    $('#aqi-chart-wrap').highcharts({//绘制图表
        chart:{
            type:'column'
        } ,
        title:title,
        xAxis:{
            categories:x
        },
        series:s
    });
}

/*
时间单位发生变化时，更新chartData
 */
function graTimeChange(){
    pageState.nowGraTime = this.dataset.value;

    //根据当前的时间单位和城市，更新chartData
    var city = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    var cityData = aqiSourceData[city];
    chartData = {};
    if(time == 'day'){//以天为单位，值可以直接用
        chartData = cityData;
    }
    else if(time == 'week'){//以周为单位
        var data = 0;//本周数据累计
        var cot = 0;//记录数
        var dayNum = 0;//本周参与计算的天数
        for(var i in cityData){
            var d = new Date(i);
            if(d.getDay() != 6){//如果不是周六，继续累加数据
                dayNum ++;
                data += cityData[i];
            }
            else{//周六时，计算本周平均值
                var dataName = '第'+(cot+1)+'周'
                chartData[dataName] = Math.ceil(data/dayNum);
                dayNum = 0;
                data = 0;
                cot++;
            }
        }
        if(d.getDay() != 6){
            var dataName = '第'+(cot+1)+'周'
            chartData[dataName] = Math.ceil(data/dayNum);
        }
    }
    else{//以月份为单位
        var data = 0;//当月数据总和累计
        var dayNum = 0;//当月参与计算的天数
        var cot = 0;//记录数
        var mon = 0;//当前月份
        for(var i in cityData){
            var d = new Date(i);//把时间数据转换成Date类型，便于应用Date的函数库
            if(cot == 0){//一第一天所属的月份开始
                mon = d.getMonth();
            }
            else{
                if(d.getMonth() == mon){//如果当前日期还是当月，即月份没有变
                    data += cityData[i];
                    dayNum ++;
                }
                else{//月份变化了，要计算上个月的平均值
                    var dataName = mon+1+'月份';
                    chartData[dataName] = Math.ceil(data/dayNum);
                    mon = d.getMonth();
                    data = cityData[i];
                    dayNum = 1;
                }
            }
            cot ++;
        }
        var dataName = (mon+1)+'月份'
        chartData[dataName] = Math.ceil(data/dayNum);
    }

    //渲染图表
    renderChart();
}


/*
根据当前chartData，重新渲染图表
 */
function citySelectChange(){
    var index = document.getElementById('city-select').selectedIndex;
    var city = document.getElementById('city-select').options[index].innerHTML;
    pageState.nowSelectCity = city;

    //根据当前的时间单位和城市，更新chartData
    var time = pageState.nowGraTime;
    var cityData = aqiSourceData[city];
    chartData = {};
    if(time == 'day'){//以天为单位，值可以直接用
        chartData = cityData;
    }
    else if(time == 'week'){//以周为单位
        var data = 0;//本周数据累计
        var cot = 0;//记录数
        var dayNum = 0;//本周参与计算的天数
        for(var i in cityData){
            var d = new Date(i);
            if(d.getDay() != 6){//如果不是周六，继续累加数据
                dayNum ++;
                data += cityData[i];
            }
            else{//周六时，计算本周平均值
                var dataName = '第'+(cot+1)+'周'
                chartData[dataName] = Math.ceil(data/dayNum);
                dayNum = 0;
                data = 0;
                cot++;
            }
        }
        if(d.getDay() != 6){
            var dataName = '第'+(cot+1)+'周'
            chartData[dataName] = Math.ceil(data/dayNum);
        }
    }
    else{//以月份为单位
        var data = 0;//当月数据总和累计
        var dayNum = 0;//当月参与计算的天数
        var cot = 0;//记录数
        var mon = 0;//当前月份
        for(var i in cityData){
            var d = new Date(i);//把时间数据转换成Date类型，便于应用Date的函数库
            if(cot == 0){//一第一天所属的月份开始
                mon = d.getMonth();
            }
            else{
                if(d.getMonth() == mon){//如果当前日期还是当月，即月份没有变
                    data += cityData[i];
                    dayNum ++;
                }
                else{//月份变化了，要计算上个月的平均值
                    var dataName = mon+1+'月份';
                    chartData[dataName] = Math.ceil(data/dayNum);
                    mon = d.getMonth();
                    data = cityData[i];
                    dayNum = 1;
                }
            }
            cot ++;
        }
        var dataName = (mon+1)+'月份'
        chartData[dataName] = Math.ceil(data/dayNum);
    }

    //渲染图表
    renderChart();
}

/*
对时间单位进行初始化，初始为天,day，将pageState.nowGraTime设置为day
 */
function initGraTimeForm(){
    var graTime = document.getElementsByName('gra-time');
    var attrGraTime = new Array();
    for(var i = 0 ; i < graTime.length ; i++){
        attrGraTime.push(graTime[i]);
        attrGraTime[i].onclick = graTimeChange;
        if(graTime[i].getAttribute('value') == 'day'){
            graTime[i].checked = true;
            pageState.nowGraTime = 'day';
        }
    }
}

/*
对所选城市进行初始化，初始化为aqiSourceData中的第一个城市，并设置pageState.nowSelectChange
 */
function initCitySelector(){
    document.getElementById('city-select').onchange = citySelectChange;
    var opt = '';
    for(var city in aqiSourceData){
        opt += '<option value="'+city+'">'+city+'</option>'
    }
    document.getElementById('city-select').innerHTML = opt;
    var citySelect = document.getElementById('city-select').options;
    for(var i = 0 ; i < citySelect.length ; i ++){
        if(i == 0){
            citySelect[i].selected = true;
            pageState.nowSelectCity = citySelect[i].innerHTML;
        }

    }
}

/*
根据初始化的时间单位和城市，对chartData进行初始化
 */
function initAqiChartData(){;

    var city = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    var cityData = aqiSourceData[city];
    chartData = {};
    if(time == 'day'){//以天为单位，值可以直接用
        chartData = cityData;
    }
    else if(time == 'week'){//以周为单位
        var data = 0;//本周数据累计
        var cot = 0;//记录数
        var dayNum = 0;//本周参与计算的天数
        for(var i in cityData){
            var d = new Date(i);
            if(d.getDay() != 6){//如果不是周六，继续累加数据
                dayNum ++;
                data += cityData[i];
            }
            else{//周六时，计算本周平均值
                var dataName = '第'+(cot+1)+'周'
                chartData[dataName] = Math.ceil(data/dayNum);
                dayNum = 0;
                data = 0;
                cot++;
            }
        }
        if(d.getDay() != 6){
            var dataName = '第'+(cot+1)+'周'
            chartData[dataName] = Math.ceil(data/dayNum);
        }
    }
    else{//以月份为单位
        var data = 0;//当月数据总和累计
        var dayNum = 0;//当月参与计算的天数
        var cot = 0;//记录数
        var mon = 0;//当前月份
        for(var i in cityData){
            var d = new Date(i);//把时间数据转换成Date类型，便于应用Date的函数库
            if(cot == 0){//一第一天所属的月份开始
                mon = d.getMonth();
            }
            else{
                if(d.getMonth() == mon){//如果当前日期还是当月，即月份没有变
                    data += cityData[i];
                    dayNum ++;
                }
                else{//月份变化了，要计算上个月的平均值
                    var dataName = mon+1+'月份';
                    chartData[dataName] = Math.ceil(data/dayNum);
                    mon = d.getMonth();
                    data = cityData[i];
                    dayNum = 1;
                }
            }
            cot ++;
        }
        var dataName = (mon+1)+'月份'
        chartData[dataName] = Math.ceil(data/dayNum);
    }

    renderChart();
}


/*
程序初始化函数
 */
function init(){

    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}
init();
