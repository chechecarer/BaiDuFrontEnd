/**
 * Created by Administrator on 2016/03/26.
 */

function getDateStr(dat){
    var y = dat.getFullYear();
    var m = dat.getMonth();
    m = m < 10 ?'0'+m:m;
    var d = dat.getDate();
    d = d < 10? '0'+d:d;
    return y+'-'+m+'-'+d;
}

function randomBuildData(seed){
    var returnData = {};
    var dat = new Date('2016-02-01');
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

function renderChart(){
    var city = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    var timeStr = time =='day'?'天':(time == 'week'?'周':'月');
    var title = {
        text:'这是'+city+'每'+timeStr+'空气质量指数'
    }
    var x = new Array();
    var s = new Array();
    for(var i in chartData){
        x.push(i);
        var da = new Array();
        da.push(chartData[i]);
        var sery = {
            name:i,
            data:da
        }
        s.push(sery);
    }

    $('#aqi-chart-wrap').highcharts({
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

function graTimeChange(){////////////////////////////////////////////////////////////添加radio选择事件
    document.getElementById('form-gra-time').onclick = function(){
        console.log(document.getElementById('form-gra-time').tabIndex);
    }
}

function citySelectChange(){
    var index = document.getElementById('city-select').selectedIndex;
    var city = document.getElementById('city-select').options[index].innerHTML;
    pageState.nowSelectCity = city;
    renderChart();
}

function initGraTimeForm(){
    var graTime = document.getElementsByName('gra-time');
    for(var i = 0 ; i < graTime.length ; i++){
        if(graTime[i].getAttribute('value') == 'month'){
            graTime[i].checked = true;
        }
    }
    pageState.nowGraTime = 'month';
}

function initCitySelector(){
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

function initAqiChartData(){
    console.log('gratime='+pageState.nowGraTime+';city='+pageState.nowSelectCity)
    cityData = aqiSourceData[pageState.nowSelectCity];

    if(pageState.nowGraTime == 'day'){
        chartData = cityData;
    }
    else if(pageState.nowGraTime == 'week'){
        var data = 0;
        var cot = 0
        var dayNum = 0;
        for(var i in cityData){
            var d = new Date(i);
            if(d.getDay() != 6){
                dayNum ++;
                data += cityData[i];
            }
            else{
                var dataName = '第'+(cot+1)+'周'
                chartData[dataName] = data/dayNum;
                dayNum = 0;
                data = 0;
                cot++;
            }
            console.log(chartData[dataName]);
        }
        if(d.getDay() != 6){
            var dataName = '第'+(cot+1)+'周'
            chartData[dataName] = data/dayNum;
        }
    }
    else{
        var data = 0;
        var dayNum = 0;//一个月中天数
        var cot2 = 0;//记录数
        var mon = 0;
        for(var i in cityData){
            var d = new Date(i);
            console.log(d.getMonth()+','+ d.getDate()+','+i);
            if(cot2 == 0){
                mon = d.getMonth();
            }
            else{
                if(d.getMonth() == mon){
                    data += cityData[i];
                    dayNum ++;
                }
                else{
                    var dataName = mon+1+'月份';
                    chartData[dataName] = data/dayNum;
                    mon = d.getMonth();
                    data = cityData[i];
                    dayNum = 1;
                }
            }
            cot2 ++;
        }
            var dataName = (mon+1)+'月份'
            chartData[dataName] = data/dayNum;

    }
}

function init(){

    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    document.getElementById('city-select').onchange = citySelectChange;
    renderChart();
}

init();
console.log(aqiSourceData);