/**
 * Created by Administrator on 2016/03/17.
 */
//用工厂模式创建对象，返回带有属性和方法的person对象
function createPerson(name,age,job){
    var  o = new Object();
    o.name = name;
    o.age = 31;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}

createPerson('kevin',31,'se').sayName();
