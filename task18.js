/**
 * Created by Administrator on 2016/03/28.
 */


var chartData=new Array();//用于存放数据

function renderBlock(){//更新数据显示
    document.getElementById('dataShow').innerHTML = '';
    for(var i = 0 ; i < chartData.length ; i ++){
        var dataInput = document.createElement('div');
        dataInput.setAttribute('class','dataBlock');
        dataInput.innerHTML = chartData[i];
        dataInput.onclick = function(){
            this.parentNode.removeChild(this);
        }
        document.getElementById('dataShow').appendChild(dataInput);
    }
}

function clickButtonIn(){
    var input = document.getElementById('data').value.replace(/(^\s*)|(\s*$)/g, "");
    var reg = /^[0-9]+$/;
    if( !reg.test(input)){
        alert('请输入正确的数字!')
        document.getElementById('data').value = '';
        document.getElementById('data').focus();
    }
    else{
        var dataInput = document.createElement('div');
        dataInput.setAttribute('class','dataBlock');
        dataInput.innerHTML = input;
        dataInput.onclick = function(){
            this.parentNode.removeChild(this);
        }
        var btn = this.getAttribute('id');
        if( btn == 'leftIn'){
            chartData.unshift(input);//update chartData
            renderBlock();
        }
        else{
            chartData.push(input);//update chartData
            renderBlock();
        }
    }
}

function clickButtonOut(){
    var btn = this.getAttribute('id');
    var dataShow = document.getElementById('dataShow')
    if(btn == 'leftOut'){
        if(confirm('确定删除'+chartData[0])){
            chartData.shift();//update chartData
            renderBlock();
        }
    }
    else{
        if(confirm('确定删除'+chartData[chartData.length-1])){
            chartData.pop();//update chartData
            renderBlock();
        }

    }
}


document.getElementById('leftIn').onclick = clickButtonIn;
document.getElementById('rightIn').onclick = clickButtonIn;
document.getElementById('leftOut').onclick = clickButtonOut;
document.getElementById('rightOut').onclick = clickButtonOut;
