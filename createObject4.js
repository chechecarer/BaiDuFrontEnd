/**
 * Created by Administrator on 2016/03/17.
 */
//使用自定义的构造函数模式创建对象，构造函数首字母必须大写
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
}
var person = new Person('kevin',31,'se');
person.sayName();