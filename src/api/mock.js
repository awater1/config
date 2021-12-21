// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
// const Random = Mock.Random
// mock一组数据
// let Mock = require('mockjs');//引入mockjs模块
let Random = Mock.Random;
const userList = [];

for (let i = 0; i < 25; i++) {
    userList.push(Mock.mock({
        id: '@id',
        name: '@cname',
        'mobile|1': /^1[0-9]{10}$/,
        email: '@email',
        title: Random.cword(8,20),//随机长度为在8到20内的汉字字符串
        tag: Random.cword(2,6),//随机长度为2 到 6 的汉字
        views: Random.integer(100,5000),//100到5000的随机整数
        time:Random.date()
    }))
}

//获取用户列表
function getUsers(options) {
    const { pagesize, pagenum } = JSON.parse(options.body);
    if (!localStorage.getItem('userlist')) {
        localStorage.setItem('userlist', JSON.stringify(userList))
    }
    const array = JSON.parse(localStorage.getItem('userlist'));
    let userResult = {};
    userResult.total = array.length;
    userResult.list = pagination(pagenum, pagesize, array);
    return userResult;
}

function pagination(pageNo, pageSize, array) {
    var offset = (pageNo - 1) * pageSize;
    return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
}

//搜索
function searchUser(options) {

    const { name } = JSON.parse(options.body);
    let userList = JSON.parse(localStorage.getItem('userlist'));

    let searchList = [];
    userList.forEach(u => {
        if (u.name.indexOf(name) != -1) {
            searchList.push(u);
        }
    });
    return searchList;
}

//添加用户
function addUser(options) {
    const user = JSON.parse(options.body);
    let userList = JSON.parse(localStorage.getItem('userlist'));
    userList.unshift(user);
    localStorage.setItem('userlist', JSON.stringify(userList))
}

//删除用户
function deleteUser(options) {
    const { id } = JSON.parse(options.body);
    let userList = JSON.parse(localStorage.getItem('userlist'));
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == id) {
            userList.splice(i, 1);
            localStorage.setItem('userlist', JSON.stringify(userList))
            return;
        }

    }
}

//编辑用户
function editUser(options) {
    const user = JSON.parse(options.body);
    let userList = JSON.parse(localStorage.getItem('userlist'));
    for (let index in userList) {

        if (userList[index].id === user.id) {
            userList[index] = user
            localStorage.setItem('userlist', JSON.stringify(userList))
            return;
        }
    }

}


// 拦截ajax请求，配置mock的数据
Mock.mock('/api/getUsers', 'post', getUsers)

Mock.mock('/api/searchUser', 'post', searchUser)

Mock.mock('/api/addUser', 'post', addUser)

Mock.mock('/api/delete', 'post', deleteUser)

Mock.mock('/api/edit', 'post', editUser)
