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
    for(var i = ta.childNodes.length-1 ; i >= 0 ; i--){
        console.log(ta.childNodes[i]);
        var c = ta.childNodes[i];
       ta.childNodes[i].parentNode.removeChild(c);
    }
//    ta.innerHTML = '';
    for(var i in aqiData)
    {
        var newnode = document.createElement('tr');
        var city,value;
        city = i;
        value = aqiData[i];
        newnode.innerHTML = '<td>'+city+'</td><td>'+value+'</td><td><button  class="del-btn">删除</button></td>';
        document.getElementById('aqi-table').appendChild(newnode);
    }
    var nodes = document.getElementsByClassName('del-btn');
    for(var i = 0 ;i < nodes.length ;i ++){
        nodes[i].onclick = delBtnHandle;
    }
    /*
    var newnode = document.createElement('tr');
    var city,value;
    for(var i in aqiData)
    {
        city = i;
        value = aqiData[i];
    }
    newnode.innerHTML = '<td>'+city+'</td><td>'+value+'</td><td><button  class="del-btn">删除</button></td>';
    document.getElementById('aqi-table').appendChild(newnode);*/
}

function addBtnHandle(){
    addAqiData();
    document.getElementById('aqi-city-input').value = '';
    document.getElementById('aqi-value-input').value='';
    renderAqiList();
}

function delBtnHandle(){
    console.log('hello delete');
    var pp = this.parentNode.parentNode;
    var city = pp.childNodes[0].innerHTML;
    delete aqiData[city];
//    pp.parentNode.removeChild(pp);
    renderAqiList();
}

function init(){
//    console.log(document.getElementById('aqi-table').children);
    var btn = document.getElementById('add-btn');
    btn.onclick = function(){
        addBtnHandle();
    };
//    setInterval(function(){
//        var nodes = document.getElementsByClassName('del-btn');
//        for(var i = 0 ;i < nodes.length ;i ++){
//            nodes[i].onclick = delBtnHandle;
//        }
//    },1000);
}
init();