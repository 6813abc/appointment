//全局变量，区分在哪个页面
$(document).ready(function () {
    $.cookie('url', 'http://127.0.0.1:8095');

    layui.use(['element', 'table', 'upload', 'layer'], function () {
        var layer = layui.layer;
        var element = layui.element;
        var table = layui.table;
        var upload = layui.upload;

        //====================================用户管理================================================
        //客户查询点击事件
        $('#admin-customer-main').click(function () {
            customerClick();
        });
        //====================================教练管理================================================
        //教练查询点击事件
        $('#admin-coach-main').click(function () {
            coachClick();
        });
        //====================================器材管理================================================
        //器材种类查询
        $('#admin-equip-type').click(function () {
            equipTypeClick();
        });
        //得到选择上传器材图片
        var imgCode;
        upload.render({
            elem: '#upload-equip-type-button',
            auto: false,//选择文件后不自动上传,
            // bindAction: '#testListAction', //指向一个按钮触发上传,
            choose: function (obj) {
                obj.preview(function (index, file, result) {
                    //修改头像
                    $("#upload-equip-type-img").attr("src", result);
                    imgCode = result;
                });
            }
        });
        //新增器材种类点击事件
        $('#equip-type-submit').click(function () {
            addEquipType(layer, imgCode, 1, open);
        });
        //====================================公共部分================================================
        //初始化页面
        init(layer, element, table);
        //侧面菜单栏收缩展开流程
        $('#menu-bar').click(function () {
            fold(table);
        });

        //监听表格头部点击
        var open;
        table.on('toolbar(main-div-table)', function (obj) {
            open = clickHead(table, obj, layer);
        });

        //监听行工具事件
        table.on('tool(main-div-table)', function (obj) {
            clickTool(table, obj);
        });

        //个人信息点击
        var selfMessage;
        $("#pub-message").click(function () {
            selfMessage = openSelfMessage(layer);
        });

        //修改密码点击
        $("#update-password").click(function () {
            openUpdatePassword(layer);
        });

        //个人信息编辑按钮
        $('#self-edit').click(function () {
            selfEdit();
        });

        //头像编辑
        upload.render({
            elem: '#self-img',
            url: '/api/upload/',
            auto: false,//选择文件后不自动上传,
            // bindAction: '#testListAction', //指向一个按钮触发上传,
            choose: function (obj) {
                obj.preview(function (index, file, result) {
                    //修改头像
                    $("#main-self-img").attr("src", result);
                    $("#self-img").attr("src", result);
                    updateImg(layer, result);
                });
            }
        });

        //修改密码确认按钮点击事件
        $('#pub-sub-update-password').click(function () {
            sureUpdatePassword(layer);
        });

        //退出登陆
        $('#pub-logout').click(function () {
            logout();
        });
    });
});


//=====================================教练管理===============================================
//初始化教练页面
function initCoach(element, table) {
    $.cookie('flag', 'coach');
    if ($("#flag_a").length === 0) {
        var $a1 = $('<a href="" id="flag_a">教练管理</a>');
        var $a2 = $('<a href="">教练查询</a>');
        $('#coach-nav').append($a1).append($a2);
        element.init();
    }
    $('#admin-coach').addClass('layui-nav-itemed');
    //刷新数据
    table.render({
        elem: '#main-div-table',
        height: 430,
        url: $.cookie('url') + '/selectAllCoach',
        where: {
            token: $.cookie('token')
        },
        page: true,
        toolbar: 'default',
        title: "教练",
        limit: 10,
        id: 'id-coach',
        response:
            {
                statusCode: 200
            }
        ,
        parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": res.code, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.data.length, //解析数据长度
                "data": res.data.data //解析数据列表
            };
        }
        ,
        cols: [[ //表头
            {type: 'checkbox', width: '10%', fixed: 'left'},
            {field: 'id', title: 'ID', width: '10%', align: 'center', sort: true}
            , {field: 'name', title: '姓名', width: '10%', align: 'center'}
            , {field: 'sex', title: '性别', width: '10%', sort: true}
            , {field: 'age', title: '年龄', width: '10%', align: 'center', sort: true}
            , {field: 'role', title: '角色', width: '10%', align: 'center', sort: true}
            , {field: 'phone', title: '联系方式', align: 'center', width: '20%'}
            , {fixed: 'right', title: '操作', width: '20%', align: 'center', toolbar: '#bar-coach'}
        ]]
    });
}

//教练管理点击事件
function coachClick() {
    //页面跳转
    window.location.href = "coach.html";
    //页面标识
    $.cookie('flag', 'coach');
}

//====================================用户管理================================================

//初始化用户页面
function initCustomer(element, table) {
    $.cookie('flag', 'customer');
    if ($("#flag_a").length === 0) {
        var $a1 = $('<a href="" id="flag_a">客户管理</a>');
        var $a2 = $('<a href="">客户查询</a>');
        $('#coach-nav').append($a1).append($a2);
        element.init();
    }
    $('#admin-customer').addClass('layui-nav-itemed');
    //刷新数据
    table.render({
        elem: '#main-div-table',
        height: 430,
        url: $.cookie('url') + '/selectAllUser',
        page: true,
        toolbar: 'default',
        title: "客户",
        limit: 10,
        id: 'id-customer',
        where: {
            token: $.cookie('token')
        },
        response:
            {
                statusCode: 200
            }
        ,
        parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": res.code, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.data.length, //解析数据长度
                "data": res.data.data //解析数据列表
            };
        }
        ,
        cols: [[ //表头
            {type: 'checkbox', width: '10%', fixed: 'left'},
            {field: 'userId', title: 'ID', width: '10%', align: 'center', sort: true}
            , {field: 'name', title: '姓名', width: '10%', align: 'center'}
            , {field: 'sex', title: '性别', width: '10%', sort: true}
            , {field: 'memberId', title: '会员id', width: '10%', align: 'center', sort: true}
            , {field: 'balance', title: '余额', width: '10%', align: 'center', sort: true}
            , {field: 'address', title: '地址', width: '15%', align: 'center', sort: true}
            , {field: 'phone', title: '联系方式', align: 'center', width: '15%'}
            , {fixed: 'right', title: '操作', width: '10%', align: 'center', toolbar: '#bar-customer'}
        ]]
    });
}

//用户查询点击事件
function customerClick() {
    //页面跳转
    window.location.href = "customer.html";
    //页面标识
    $.cookie('flag', 'customer');
}

//=====================================器材管理===============================================
//初始化设备种类页面
function initEquipType(element, table) {
    $.cookie('flag', 'equipType');
    if ($("#flag_a").length === 0) {
        var $a1 = $('<a href="" id="flag_a">器材管理</a>');
        var $a2 = $('<a href="">器材种类</a>');
        $('#coach-nav').append($a1).append($a2);
        element.init();
    }
    $('#admin-equip').addClass('layui-nav-itemed');
    //刷新数据
    table.render({
        elem: '#main-div-table',
        height: 430,
        url: $.cookie('url') + '/selectAllEquipType',
        page: true,
        toolbar: '#toolbar-equip-type',
        title: "器材种类",
        limit: 10,
        id: 'id-equip-type',
        where: {
            token: $.cookie('token')
        },
        response:
            {
                statusCode: 200
            }
        ,
        parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": res.code, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.data.length, //解析数据长度
                "data": res.data.data //解析数据列表
            };
        }
        ,
        cols: [[ //表头
            {field: 'pictureCode', title: '图片', width: '10%', templet: '#showImg'}
            , {field: 'id', title: 'ID', width: '10%', align: 'center', sort: true}
            , {field: 'code', title: '器材编码', width: '10%', align: 'center'}
            , {field: 'name', title: '名称', width: '10%', align: 'center'}
            , {field: 'unitPrice', title: '单价', width: '10%', align: 'center', sort: true}
            , {field: 'createTime', title: '创建时间', width: '20%', align: 'center', sort: true}
            , {fixed: 'right', title: '操作', width: '30%', align: 'center', toolbar: '#bar-equip-type'}
        ]],
        done: function (res, curr, count) {
            hoverOpenEquipType();
        }
    });
}

//器材种类查询点击事件
function equipTypeClick() {
    //页面跳转
    window.location.href = "equipType.html";
    //页面标识
    $.cookie('flag', 'equipType');
}

//弹出新增器材种类框
function openEquipTypeAdd(layer) {
    return layer.open({
        type: 1,
        title: '新增器材种类',
        content: $('#equip-type-add'),
        area: ['600px', 'auto'],
        anim: 1,
        maxmin: true
    });
}

//新增器材种类
function addEquipType(layer, result, choose, open) {
    var url = $.cookie('url') + "/addEquipTye";
    var token = $.cookie('token');
    var name = $('#equip-type-name').val();
    var code = $('#equip-type-code').val();
    var unitPrice = $('#equip-type-price').val();
    $.ajax({
        url: url,
        type: "post",
        data: {
            token: token,
            pictureCode: result,
            choose: choose,
            name: name,
            unitPrice: unitPrice,
            code: code
        },
        async: false,
        success: function (data) {
            if (data.code === '200') {
                localStorage.setItem('code', code);
                layer.msg('添加成功', {icon: 1});
                layer.close(open);
            } else {
                layer.msg(data.message, {icon: 5});
            }
        },
        error: function (data) {
            layer.msg(data.status, {icon: 5});
        }
    });
}

//=====================================公共部分===============================================
//初始化页面
function init(layer, element, table) {
    if ($.cookie('token') === undefined || $.cookie('token').length === 0) {
        layer.msg('登陆失效，请重新登陆', {icon: 5});
        var url = 'login.html';
        setTimeout("window.location.href = '" + url + "'", 1000)
    }
    if ($.cookie('flag') === 'coach') {
        initCoach(element, table);
    } else if ($.cookie('flag') === 'customer') {
        initCustomer(element, table);
    } else if ($.cookie('flag') === 'equipType') {
        initEquipType(element, table);
    }
    //设置头像
    $("#main-self-img").attr("src", localStorage.getItem("code"));
    //设置个人信息框不能点击且无边框
    $("#self-all input").attr("readonly", "readonly").css('border', '0px');
}

//侧面菜单栏收缩展开事件
function fold(table) {
    if ($.cookie('flag') === 'coach') {
        //重置教练表格
        table.reload('id-coach');
    } else if ($.cookie('flag') === 'customer') {
        //重置顾客表格
        table.reload('id-customer');
    } else if ($.cookie('flag') === 'equipType') {
        //重置器材种类表格
        table.reload('id-equip-type');
    }
    if ($("body").hasClass("mini-sidebar")) {
        $("body").removeClass("mini-sidebar");
        $(this).addClass("layui-icon-shrink-right");
        $(this).removeClass("layui-icon-spread-left");
        $('#layui-logo').css('width', '200px').text('管理系统');
        $("#admin-header-ul").css("left", "200px").css('width', 'calc(100% - 140px)');
        $("#menu-bar").attr("class", "layui-icon layui-icon-shrink-right");
    } else {
        $("body").addClass("mini-sidebar");
        $(this).removeClass("layui-icon-shrink-right");
        $(this).addClass("layui-icon-spread-left");
        $('#layui-logo').text('').css('width', '48px');
        $("#admin-header-ul").css("left", "48px").css('width', 'calc(100% + 12px)');
        $("#menu-bar").attr("class", "layui-icon layui-icon-spread-left");
    }
}

//表格头部点击事件
function clickHead(table, obj, layer) {

    var checkStatus = table.checkStatus(obj.config.id);
    var data = checkStatus.data;
    console.log(data);
    switch (obj.event) {
        case 'addEquipType':
            return openEquipTypeAdd(layer);
            break;
        case 'delete':
            if (data.length === 0) {
                layer.msg('请选择一行');
            } else {

            }
            break;
        case 'update':
            layer.msg('编辑');
            break;
    }
    ;
}

//鼠标悬浮显示头像大图
function hoverOpenEquipType() {
    var img_show = null;
    $('td img').hover(function () {
        var img = "<img class='img_msg' src='" + $(this).attr('src') + "' style='width:100%;' />";
        img_show = layer.tips(img, this, {
            tips: [2, 'rgba(41,41,41,.0)']
            , area: ['12%']
        });
    }, function () {
        layer.close(img_show);
    });
    $('td img').attr('style', 'max-width:70px');
}

//表格行点击事件
function clickTool(table, obj) {
    var data = obj.data, layEvent = obj.event;
    console.log("当前行数据ID:" + data.id);
    if (layEvent === 'detail') {
        layer.msg('查看操作');
    } else if (layEvent === 'del') {
        layer.confirm('真的删除行么', function (index) {
            obj.del(); //删除对应行（tr）的DOM结构
            layer.close(index);
            //向服务端发送删除指令

        });
    } else if (layEvent === 'editEquip') {
        layer.msg('编辑器材种类');
    }
}

//弹出个人信息
function openSelfMessage(layer) {
    //加载信息
    var phone = $.cookie('phone');
    getByPhone(phone);
    return layer.open({
        type: 1,
        title: '个人信息',
        content: $('#pub-self-message'),
        area: ['500px', 'auto'],
        anim: 1,
        maxmin: true
    });
}

//弹出修改密码界面
function openUpdatePassword(layer) {
    return layer.open({
        type: 1,
        title: '修改密码',
        content: $('#pub-update-message'),
        area: ['500px', 'auto'],
        anim: 1,
        maxmin: true
    });
}

//确认修改密码点击事件
function sureUpdatePassword(layer) {
    var url = $.cookie('url') + "/updatePassword";
    var phone = $.cookie('phone');
    var token = $.cookie('token');
    var oldPassword = $('#pub-old-password').val();
    var newPassword = $('#pub-new-password').val();
    var subPassword = $('#pub-sub-password').val();
    if (newPassword !== subPassword) {
        layer.msg('两次密码不一致', {icon: 5});
        return;
    }
    if (oldPassword === newPassword) {
        layer.msg('新旧密码不能一样', {icon: 5});
        return;
    }
    $.ajax({
        url: url,
        data: {
            token: token,
            phone: phone,
            oldPassword: oldPassword,
            newPassword: newPassword
        },
        async: false,
        success: function (data) {
            if (data.code === '200') {
                layer.msg('修改成功,请重新登陆', {icon: 1});
                url = 'login.html';
                setTimeout("window.location.href = '" + url + "'", 1000)
            } else {
                layer.msg(data.message, {icon: 5});
            }
        },
        error: function (data) {
            layer.msg(data.status, {icon: 5});
        }
    });
}

//获取详细信息
function getByPhone(phone) {
    var url = $.cookie('url') + "/selectByPhone";
    var token = $.cookie('token');
    $.ajax({
        url: url,
        data: {
            token: token,
            phone: phone
        },
        async: false,
        success: function (data) {
            if (data.code === '200') {
                //修改头像
                if (data.data.code != null && data.data.code.length > 0) {
                    $("#self-img").attr("src", data.data.code);
                }
                //给input框赋值
                $('#self-age').val(data.data.age);
                $('#self-sex').val(data.data.sex);
                $('#self-role').val(data.data.role);
                $('#self-phone').val(data.data.phone);
                //给span赋值
                $('#self-name').html(data.data.name);
            } else {
                layer.msg(data.message, {icon: 5});
            }
        },
        error: function (data) {
            layer.msg(data.status, {icon: 5});
        }
    });
}

//个人信息编辑事件
function selfEdit() {
    //设置个人信息框能点击
    $("#self-all input").removeAttr("readonly").css('border', '1px solid #3F3F3F');
}

//修改头像
function updateImg(layer, code) {
    var url = $.cookie('url') + "/updateImg";
    var token = $.cookie('token');
    var phone = $.cookie('phone');
    $.ajax({
        url: url,
        type: "post",
        data: {
            token: token,
            phone: phone,
            newCode: code
        },
        async: false,
        success: function (data) {
            if (data.code === '200') {
                localStorage.setItem('code', code);
                layer.msg('修改成功', {icon: 1});
            } else {
                layer.msg(data.message, {icon: 5});
            }
        },
        error: function (data) {
            layer.msg(data.status, {icon: 5});
        }
    });
}

//退出登陆
function logout() {
    //清楚cookie和缓存数据
    localStorage.removeItem('token');
    localStorage.removeItem('code');
    $.removeCookie('token');
    $.removeCookie('role');
    $.removeCookie('flag')
    window.location.href = 'login.html';
}

