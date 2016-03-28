/**
 * Created by Administrator on 2016/03/28.
 */

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
        var btn = this.getAttribute('id');
        if( btn == 'leftIn'){
            if(document.getElementById('dataShow').firstChild){
                document.getElementById('dataShow').insertBefore(dataInput,document.getElementById('dataShow').firstChild);
            }
            else{
                document.getElementById('dataShow').appendChild(dataInput);
            }
        }
        else{
            document.getElementById('dataShow').appendChild(dataInput);
        }
    }
}

function clickButtonOut(){
    var btn = this.getAttribute('id');
    var dataShow = document.getElementById('dataShow')
    if(btn == 'leftOut'){
        var node = dataShow.firstChild;
        dataShow.removeChild(node);
    }
    else{
        var cds = dataShow.childNodes;
        var node = cds[cds.length-1];
        dataShow.removeChild(node);

    }
}

document.getElementById('leftIn').onclick = clickButtonIn;
document.getElementById('rightIn').onclick = clickButtonIn;
document.getElementById('leftOut').onclick = clickButtonOut;
document.getElementById('rightOut').onclick = clickButtonOut;