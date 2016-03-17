/**
 * Created by Administrator on 2016/03/17.
 */
//用原型模式创建对象

function Person(){

}
Person.prototype = {
    constructor:Person,
    name:'kevin',
    age:31,
    job:'se',
    friends:['jams','martin'],
    sayFriends:function(){
        alert(this.friends);
    }
};

var person1 = new Person();
person1.friends.push('joes');
person1.sayFriends();

var person2 = new Person();
person2.sayFriends();