/**
 * Created by Administrator on 2016/03/23.
 */
var aqiData = {};

function addAqiData(){
    var reg1=/^[a-zA-Z\u4e00-\u9fa5]+$/;
    var reg2 = /^[0-9]+$/;
    var city = document.getElementById('aqi-city-input').value.replace(/(^\s*)|(\s*$)/g, "");
    var value = document.getElementById('aqi-value-input').value.replace(/(^\s*)|(\s*$)/g, "");
    if( ! reg1.test(city)){
        alert('城市名称输入格式不正确');
        document.getElementById('aqi-city-input').value = '';
        document.getElementById('aqi-city-input').focus();
        return;
    }
    else if( ! reg2.test(value)){
        alert('数值输入格式不正确');
        document.getElementById('aqi-value-input').value = '';
        document.getElementById('aqi-value-input').focus();
        return;
    }
    aqiData[city] = value;
}

function renderAqiList(){
    var ta = document.getElementById('aqi-table');
    var cdNodes = ta.childNodes;
    var l = cdNodes.length;
    console.log(cdNodes.length);
    for(var i = 0 ; i< l ; i ++){
        console.log('i='+i);
        ta.removeChild(cdNodes[0]);
    }

    for(var i in aqiData)
    {
        var newnode = document.createElement('tr');
        var city,value;
        city = i;
        value = aqiData[i];
        newnode.innerHTML = '<td>'+city+'</td><td>'+value+'</td><td><button data-city="'+city+'" class="del-btn">删除</button></td>';
        document.getElementById('aqi-table').appendChild(newnode);
    }
}

function addBtnHandle(){
    addAqiData();
    document.getElementById('aqi-city-input').value = '';
    document.getElementById('aqi-value-input').value='';
    renderAqiList();
}

function delBtnHandle(city){
    delete aqiData[city];
    renderAqiList();
}

function init(){
    var btn = document.getElementById('add-btn');
    btn.onclick = function(){
        addBtnHandle();
    };
    document.getElementById('aqi-table').onclick = function(event){
        if(event.target.nodeName.toLowerCase() === 'button')
            delBtnHandle.call(null,event.target.dataset.city);
    }
}
init();