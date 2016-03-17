/**
 * Created by Administrator on 2016/03/17.
 */
//组合使用原型模式和构造函数创建对象

function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['jams','martin'];
}

Person.prototype.sayFriends = function(){
    alert(this.friends);
}

var person1 = new Person('kevin',31,'se');
var person2 = new Person('tom',30,'se');
person1.friends.push('joe');
person1.sayFriends();
person2.sayFriends();