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

}

function graTimeChange(){

}

function citySelectChange(){

}

function initGraTimeForm(){
    var graTime = document.getElementsByName('gra-time');
    for(var i = 0 ; i < graTime.length ; i++){
        if(graTime[i].getAttribute('value') == 'day'){
            graTime[i].checked = true;
        }
    }
}

function initCitySelector(){
    var opt = '';
    for(var city in aqiSourceData){
        opt += '<option value="'+city+'">'+city+'</option>'
    }
    document.getElementById('city-select').innerHTML = opt;
    var citySelect = document.getElementById('city-select').options;
    for(var i = 0 ; i < citySelect.length ; i ++){
        if(i == 0)
            citySelect[i].selected = true;
    }
}

function initAqiChartData(){

}

function init(){
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();
console.log(aqiSourceData);