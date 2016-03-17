/**
 * Created by Administrator on 2016/03/17.
 */
//动态原型模式，在构造函数中完成了对原型的创建
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['jams','martin'];
    if(typeof this.sayName != 'function'){
        Person.prototype.sayName = function(){
            alert(this.name);
        }
        Person.prototype.sayFriends = function(){
            alert(this.friends);
        };
    }
}

var person = new Person('kevin',31,'se');
person.sayName();
person.sayFriends();