$(document).ready(function () {
    $.cookie('url', 'http://127.0.0.1:8095');
    //$.cookie('url', '');
    layui.use(['element', 'carousel', 'layer', 'form', 'upload', 'table', 'laydate'], function () {
        var element = layui.element;
        var carousel = layui.carousel;
        var layer = layui.layer;
        var form = layui.form;
        var upload = layui.upload;
        var table = layui.table;
        var laydate = layui.laydate;
        //首页轮播图
        carousel.render({
            elem: '#layui-carousel',
            width: '100%',
            height: '580px',
        });
        //初始化页面
        init();
        //没有登录则显示注册、登录按钮,隐藏个人中心
        if ($.cookie('userToken') === undefined || $.cookie('userToken') === null || $.cookie('userToken') === 'null' || $.cookie('userToken').length === 0) {
            show();
        } else {
            hide();
        }
        //注册点击
        var indexOpenRegister;
        $("#index-register").click(function () {
            indexOpenRegister = openRegister(layer);
        });
        //登录点击
        var indexOpenLogin;
        $("#index-login").click(function () {
            indexOpenLogin = openLogin(layer);
        });

        //退出登录
        $("#index-logout").click(function () {
            //删除cookie
            $.removeCookie('userToken');
            $.removeCookie('flagUser');
            $.removeCookie('date-day-last');
            $.removeCookie('date-day-next');
            localStorage.removeItem('userImg');
            show();
        });

        //充值界面
        var indexOpenRecharge
        $("#index-recharge").click(function () {
            indexOpenRecharge = openRecharge(layer);
        });

        //确认登录
        form.on('submit(layui-btn-submit-login)', function (data) {
            sureLogin(layer, data, indexOpenLogin);
            return false;
        });

        //确认注册
        var code;
        form.on('submit(layui-btn-submit-register)', function (data) {
            sureRegister(layer, data, code, indexOpenRegister);
            return false;
        });

        //头像上传
        upload.render({
            elem: '#index-register-head',
            url: '/api/upload/',
            auto: false,//选择文件后不自动上传,
            choose: function (obj) {
                obj.preview(function (index, file, result) {
                    code = result;
                    $("#index-register-head").attr("src", result);
                });
            }
        });

        //验证码图片点击
        $('#img-code').click(function () {
            loadCode(layer);
        });

        //首页点击
        $('#index-index').click(function () {
                toIndex();
            }
        );
        //成为会员点击
        $('#index-to-member').click(function () {
                toMemberClick();
            }
        );
        //预约点击
        $('#index-to-appointment').click(function () {
                toAppointmentClick();
            }
        );

        //续费1个月点击
        $('#renew1').click(function () {
                renewMember(1);
            }
        );
        //续费3个月点击
        $('#renew2').click(function () {
                renewMember(3);
            }
        );
        //续费6个月点击
        $('#renew3').click(function () {
                renewMember(6);
            }
        );
        //续费12个月点击
        $('#renew4').click(function () {
                renewMember(12);
            }
        );
        // 点击充值数字事件
        $(".a-num").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var RMB = $(this).attr("RMB");
            $(".num_rmb").val(RMB);
            $(".num_rmb").parent().children("e").text($(".num_rmb").val() * 10);
        });
        // 充值框输入值改变事件
        $('.num_rmb').on('input propertychange', function () {
            $(".a-num").removeClass("active");
            $(this).parent().children("e").text($(this).val() * 10)
        });
        //确认充值按钮
        $('#index-recharge-button').click(function () {
            sureRecharge(layer, indexOpenRecharge);
        });
        //充值记录点击事件
        let indexRechargeRecord;
        $('#index-recharge-record').click(function () {
            $("#recharge-record").addClass("index-record");
            //加载充值记录数据
            loadRechargeRecord(element, table);
            indexRechargeRecord = openRecord(layer);
        });
        //消费记录点击事件
        let indexConsumptionRecord;
        $('#index-consumption-record').click(function () {
            $("#consumption-record").addClass("index-record");
            //加载消费记录数据
            loadConsumptionRecord(element, table);
            indexConsumptionRecord = openRecord(layer);
        });
        //预约记录点击事件
        let indexAppointmentRecord;
        $('#index-appointment-record').click(function () {
            $("#appointment-record").addClass("index-record");
            indexAppointmentRecord = openRecord(layer);
            //加载预约数据
        });
        //弹出框内充值记录点击事件
        $('#recharge-record').click(function () {
            //加载数据
            loadRechargeRecord(element, table);
        });
        //弹出框内充值记录点击事件
        $('#consumption-record').click(function () {
            //加载数据
            loadConsumptionRecord(element, table);
        });
        //记录弹出框点击变色
        $(".layui-breadcrumb > a").click(function () {
            $(".layui-breadcrumb > a").removeClass("index-record");
            $(this).addClass("index-record");
        });
        //上一周
        $("#last-week").click(function () {
            lastWeek();
        });
        //下一周
        $("#next-week").click(function () {
            nextWeek();
        });
        //选择时间
        $(".choice-date").click(function () {
            choiceDate(this);
        });
        //确认预约点击
        $("#appointment-sure").click(function () {
            appointmentSure();
        });
    });
});

//初始化页面
function init() {
    if ($.cookie('flagUser') === undefined) {
        $.cookie('flagUser', 'index');
        window.location.href = 'index.html';
    } else {
        if (($.cookie('userToken') === undefined || $.cookie('userToken').length === 0) && $.cookie('flagUser') !== 'index') {
            layer.msg('登陆失效，请重新登陆', {icon: 5});
            hide();
        }
        if ($.cookie('flagUser') === 'member') {
            $('#index-to-member').addClass('layui-this');
            $("#member-img").attr('src', localStorage.getItem('userImg'));
            $("#member-msg").html(localStorage.getItem('userName'));
        } else if ($.cookie('flagUser') === 'index') {
            $('#index-index').addClass('layui-this');
        } else if ($.cookie('flagUser') === 'appointment') {
            $.removeCookie('coachId');
            $.removeCookie('equipId');
            $.removeCookie('fieldId');
            $.removeCookie('coachName');
            $.removeCookie('equipName');
            $.removeCookie('fieldAddress');
            //初始化步骤
            $('#index-to-appointment').addClass('layui-this');
            //加载教练信息、器材信息、场地信息,用来供用户选择
            initCoach();
            initField();
            initEquip();
            $.removeCookie('date-day-next');
            $.removeCookie('choice-day-time');
            $.removeCookie('choice-day-time-show');
            $.cookie('date-day-next', "1");
            initTime(1);
        } else {
            $('#index-to-member').addClass('layui-this');
        }
    }
}

//显示注册登录框，隐藏个人信息框
function show() {
    $("#index-register").show();
    $("#index-login").show();
    $("#index-user").hide();
}

//显示个人信息框，隐藏注册登录框
function hide() {
    $("#index-register").hide();
    $("#index-login").hide();
    $("#index-user").show();
    $("#layui-nav-img").attr("src", localStorage.getItem('userImg'));
}

//弹出登录框
function openLogin(layer) {
    var indexOpenLogin = layer.open({
        type: 1,
        title: '用户登录',
        content: $('#index-login-eject'),
        area: ['auto', 'auto'],
        anim: 1,
        maxmin: true
    });
    //加载验证码
    loadCode(layer);
    return indexOpenLogin;
}

//弹出注册框
function openRegister(layer) {
    var indexOpenRegister = layer.open({
        type: 1,
        title: '用户注册',
        content: $('#index-register-eject'),
        area: ['auto', 'auto'],
        anim: 1,
        maxmin: true
    });
    return indexOpenRegister;
}

//弹出充值框
function openRecharge(layer) {
    var indexOpenRecharge = layer.open({
        type: 1,
        title: '充值余额',
        content: $('#index-recharge-eject'),
        area: ['auto', 'auto'],
        anim: 1,
        maxmin: true
    });
    return indexOpenRecharge;
}

//加载验证码
function loadCode(layer) {
    var url = $.cookie('url') + "/getCode";
    $.ajax({
        url: url,
        async: false,
        success: function (data) {
            if (data.code === '200') {
                //给验证码图片框赋值
                var code = "data:image/png;base64," + data.data;
                $('#img-code').attr('src', code);
            } else {
                layer.msg(data.message, {icon: 5});
            }
        }, error: function (data) {
            layer.msg(data.status, {icon: 5});
        }
    });
}

//成为会员点击事件
function toMemberClick() {
    //判断用户是否登陆
    checkLogin();
    $.cookie('flagUser', 'member');
    window.location.href = 'member.html';
}

//我要预约点击事件
function toAppointmentClick() {
    //判断用户是否登陆
    checkLogin();
    $.cookie('flagUser', 'appointment');
    window.location.href = 'appointment.html';
}

//首页点击事件
function toIndex() {
    $.cookie('flagUser', 'index');
    window.location.href = 'index.html';
}

//确认登录
function sureLogin(layer, data, indexOpenLogin) {
    var url = $.cookie('url') + "/userLogin";
    $.ajax({
            url: url,
            data: data.field,
            async: false,
            success: function (data) {
                if (data.code === '200') {
                    $.cookie('userToken', data.data.token);
                    layer.msg('登录成功', {icon: 1});
                    //修改头像
                    if (data.data.code != null && data.data.code.length > 0) {
                        $("#layui-nav-img").attr("src", data.data.code);
                        //缓存用户头像
                        localStorage.setItem('userImg', data.data.code);
                        localStorage.setItem('userName', data.data.name);
                        localStorage.setItem('userPhone', data.data.phone);
                    }
                    layer.close(indexOpenLogin);
                    hide();
                } else {
                    layer.msg(data.message, {icon: 5});
                }
            },
            error: function (data) {
                layer.msg(data.status, {icon: 5});
            }
        }
    );
}

//确认注册
function sureRegister(layer, data, code, indexOpenRegister) {
    var url = $.cookie('url') + "/addUser";
    data.field.code = code;
    $.ajax({
        url: url,
        data: data.field,
        async: false,
        success: function (data) {
            if (data.code === '200') {
                layer.msg('注册成功', {icon: 1});
                layer.close(indexOpenRegister);
                hide();
            } else {
                layer.msg(data.message, {icon: 5});
            }
        }, error: function (data) {
            layer.msg(data.status, {icon: 5});
        }
    });
}

//续费
function renewMember(month) {
    var unitPrice = 200;
    var money;
    if (month === 1) {
        money = unitPrice;
    } else if (month === 3) {
        money = unitPrice * month * 0.95;
    } else if (month === 6) {
        money = unitPrice * month * 0.9;
    } else if (month === 12) {
        money = unitPrice * month * 0.8;
    }
    var url = $.cookie('url') + "/renewMember";
    $.ajax({
        url: url,
        data: {
            token: $.cookie('userToken'),
            phone: localStorage.getItem('userPhone'),
            data: month,
            money: money
        },
        async: false,
        success: function (data) {
            if (data.code === '200') {
                layer.msg('续费成功', {icon: 1});
            } else if (data.code === '50012') {
                //余额不足，打开充值界面
                layer.msg('余额不足，请充值', {icon: 5});
                layer.confirm('余额不足，是否前往充值?', function (index) {
                    //打开充值界面
                    openRecharge(layer);
                    layer.close(index);
                });
            } else {
                layer.msg(data.message, {icon: 5});
            }
        },
        error: function (data) {
            layer.msg(data.status, {icon: 5});
        }
    });
}

//确定充值
function sureRecharge(layer, indexOpenRecharge) {
    var url = $.cookie('url') + "/rechargeBalance";
    var money = $(".num_rmb").val();
    $.ajax({
        url: url,
        data: {
            token: $.cookie('userToken'),
            phone: localStorage.getItem('userPhone'),
            money: money
        },
        async: false,
        success: function (data) {
            if (data.code === '200') {
                $("#recharge-time").val(data.data.time);
                $("#recharge-flow").val(data.data.id);
                $("#recharge-money").val(data.data.money);
                layer.open({
                    type: 1,
                    title: '充值成功',
                    content: $('#index-recharge-success'),
                    area: ['400px', 'auto'],
                    anim: 1
                });
                /*layer.close(indexOpenRecharge);*/
            } else {
                layer.msg(data.message, {icon: 5});
            }
        },
        error: function (data) {
            layer.msg(data.status, {icon: 5});
        }
    });
}

//弹出记录框，加载充值记录
function openRecord(layer) {
    return layer.open({
        type: 1,
        title: '记录',
        content: $('#index-record'),
        area: ['1000px', 'auto'],
        anim: 3,
        maxmin: true
    });
}

//加载充值记录数据
function loadRechargeRecord(element, table) {
    //刷新数据
    table.render({
        elem: '#index-record-table',
        height: 300,
        url: $.cookie('url') + '/selectAllRecharge',
        where: {
            phone: localStorage.getItem('userPhone'),
            token: $.cookie('userToken')
        },
        page: true,
        title:
            "充值记录",
        limit:
            10,
        limits:
            [10, 20],
        id:
            'id-coach',
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
            {field: 'id', title: '订单编号', width: '40%', align: 'center'}
            , {field: 'money', title: '金额', width: '10%', align: 'center', sort: true}
            , {field: 'phone', title: '联系方式', align: 'center', width: '20%', sort: true}
            , {field: 'createTime', title: '创建时间', align: 'center', width: '30%', sort: true}
        ]]
    })
    ;
}

//加载充值记录数据
function loadConsumptionRecord(element, table) {
    //刷新数据
    table.render({
        elem: '#index-record-table',
        height: 300,
        url: $.cookie('url') + '/selectAllConsumption',
        where: {
            phone: localStorage.getItem('userPhone'),
            token: $.cookie('userToken')
        },
        page: true,
        title:
            "充值记录",
        limit:
            10,
        limits:
            [10, 20],
        id:
            'id-coach',
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
            {field: 'id', title: '订单编号', width: '30%', align: 'center'}
            , {field: 'money', title: '金额', width: '10%', align: 'center', sort: true}
            , {field: 'phone', title: '联系方式', align: 'center', width: '15%', sort: true}
            , {field: 'createTime', title: '创建时间', align: 'center', width: '25%', sort: true}
            , {field: 'type', title: '交易类型', align: 'center', width: '20%'}
        ]]
    })
    ;
}

//记录弹出框点击变色
function changeColor() {
}

//判断登录状态
function checkLogin() {
    //判断用户是否登陆
    if ($.cookie('userToken') === undefined || $.cookie('userToken').length === 0) {
        layer.msg('请先登录', {icon: 5});
        return;
    }
}

//初始化教练状态
function initCoach() {
    var url = $.cookie('url') + "/selectAllCoach2";
    $.ajax({
        url: url,
        data: {
            token: $.cookie('userToken'),
            phone: localStorage.getItem('userPhone'),
            page: 1,
            limit: 100
        },
        async: false,
        success: function (data) {
            //定义每行的长度
            var len = 5;
            if (data.code === '200') {
                var list = data.data;
                for (var i = 0; i < list.length; i++) {
                    $('.dy-coach-list').append("  <li data- class=\"dy-video-item dy-video-meta-right\"  onclick='initCoachClick(\"" + list[i].id + "\" ,\"" + list[i].name + "\")'>\n" +
                        "                            <div class=\"dy-video-meta\">\n" +
                        "                                <div class=\"dy-video-meta-bg\"> </div>\n" +
                        "                                <div class=\"dy-video-meta-dy\">\n" +
                        "                                    <h4 class=\"dy-video-title\"> <a>" + list[i].name + "</a> </h4>\n" +
                        "                                    <span class=\"dy-video-rating\">7.3</span>\n" +
                        "                                    <ul class=\"dy-video-meta-list\">\n" +
                        "                                        <li class=\"dy-video-actors\"> <span class=\"dy-video-tip\"> 年龄: </span> <a>" + list[i].age + "</a>  </li>\n" +
                        "                                        <li class=\"dy-video-types\"> <span class=\"dy-video-tip\">性别:</span> <span class=\"dy-video-meta-filter\">" + list[i].sex + "</span> </li>\n" +
                        "                                        <li class=\"dy-video-areas\"> <span class=\"dy-split\">|</span> <span class=\"dy-video-tip\">电话:</span> <span class=\"dy-video-meta-filter\">" + list[i].phone + "</span> </li>\n" +
                        "                                        <li class=\"dy-video-starts\"> <span class=\"dy-split\">|</span> <span class=\"dy-video-tip\">年代:</span> <span class=\"dy-video-meta-filter\">2018</span> </li>\n" +
                        "                                    </ul>\n" +
                        "                                    <p class=\"dy-video-intro\"> 从事健身行业十余年，好教练</p>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"dy-video-meta-bg\"> </div>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"dy-video-poster\"> <a class=\"dy-video-link\"> <img class=\"dy-video-img\" src=\"" + list[i].code + "\" alt=\"" + list[i].name + "\"> <span class=\"dy-video-nocomplete\"></span> <span class=\"dy-video-date\"> 2018 年 </span> <span class=\"dy-video-bg\"></span> <span class=\"s-pay\"></span> </a> </div>\n" +
                        "                            <div class=\"dy-video-primary\">\n" +
                        "                                <h4 class=\"dy-video-title\"><a> " + list[i].name + " </a> </h4>\n" +
                        "                                <span class=\"dy-video-rating\"> 7.3 </span> </div>\n" +
                        "                        </li>"
                    )
                    ;
                }
            } else {
                layer.msg(data.message, {icon: 5});
            }
        },
        error: function (data) {
            layer.msg(data.status, {icon: 5});
        }
    });
}

//初始化场地状态
function initField() {
    var url = $.cookie('url') + "/selectAllField";
    $.ajax({
        url: url,
        data: {
            token: $.cookie('userToken'),
            phone: localStorage.getItem('userPhone'),
            page: 1,
            limit: 100
        },
        async: false,
        success: function (data) {
            //定义每行的长度
            var len = 5;
            if (data.code === '200') {
                var list = data.data.data;
                for (var i = 0; i < list.length; i++) {
                    $('.dy-field-list').append("  <li data- class=\"dy-video-item dy-video-meta-right\" onclick='initFieldClick(\"" + list[i].id + "\" ,\"" + list[i].address + "\")'>\n" +
                        "                            <div class=\"dy-video-meta\">\n" +
                        "                                <div class=\"dy-video-meta-bg\"> </div>\n" +
                        "                                <div class=\"dy-video-meta-dy\">\n" +
                        "                                    <h4 class=\"dy-video-title\"> <a>" + list[i].address + "</a> </h4>\n" +
                        "                                    <span class=\"dy-video-rating\">7.3</span>\n" +
                        "                                    <ul class=\"dy-video-meta-list\">\n" +
                        "                                        <li class=\"dy-video-actors\"> <span class=\"dy-video-tip\"> 编号: </span> <a>" + list[i].roomNumber + "</a>  </li>\n" +
                        "                                        <li class=\"dy-video-actors\"> <span class=\"dy-video-tip\"> 地址: </span> <a>" + list[i].address + "</a>  </li>\n" +
                        "                                        <li class=\"dy-video-types\"> <span class=\"dy-video-tip\">容量:</span> <span class=\"dy-video-meta-filter\">" + list[i].capacity + "</span> </li>\n" +
                        "                                        <li class=\"dy-video-starts\"> <span class=\"dy-split\">|</span> <span class=\"dy-video-tip\">年代:</span> <span class=\"dy-video-meta-filter\">2018</span> </li>\n" +
                        "                                    </ul>\n" +
                        "                                    <p class=\"dy-video-intro\">xxx</p>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"dy-video-meta-bg\"> </div>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"dy-video-poster\"> <a class=\"dy-video-link\"> <img class=\"dy-video-img\" src=\"" + list[i].code + "\" alt=\"" + list[i].address + "\"> <span class=\"dy-video-nocomplete\"></span> <span class=\"dy-video-date\"> 2018 年 </span> <span class=\"dy-video-bg\"></span> <span class=\"s-pay\"></span> </a> </div>\n" +
                        "                            <div class=\"dy-video-primary\">\n" +
                        "                                <h4 class=\"dy-video-title\"><a> " + list[i].address + " </a> </h4>\n" +
                        "                                <span class=\"dy-video-rating\"> 7.3 </span> </div>\n" +
                        "                        </li>");
                }
            } else {
                layer.msg(data.message, {icon: 5});
            }
        },
        error: function (data) {
            layer.msg(data.status, {icon: 5});
        }
    });
}

//初始化器材状态
function initEquip() {
    var url = $.cookie('url') + "/selectAllEquipType";
    $.ajax({
        url: url,
        data: {
            token: $.cookie('userToken'),
            phone: localStorage.getItem('userPhone'),
            page: 1,
            limit: 100
        },
        async: false,
        success: function (data) {
            //定义每行的长度
            var len = 5;
            if (data.code === '200') {
                var list = data.data.data;
                for (var i = 0; i < list.length; i++) {
                    $('.dy-equip-list').append("  <li data- class=\"dy-video-item dy-video-meta-right\" onclick='initEquipClick(\"" + list[i].id + "\" ,\"" + list[i].name + "\")' >\n" +
                        "                            <div class=\"dy-video-meta\">\n" +
                        "                                <div class=\"dy-video-meta-bg\"> </div>\n" +
                        "                                <div class=\"dy-video-meta-dy\">\n" +
                        "                                    <h4 class=\"dy-video-title\"> <a>" + list[i].name + "</a> </h4>\n" +
                        "                                    <span class=\"dy-video-rating\">7.3</span>\n" +
                        "                                    <ul class=\"dy-video-meta-list\">\n" +
                        "                                        <li class=\"dy-video-actors\"> <span class=\"dy-video-tip\"> 名称: </span> <a>" + list[i].name + "</a>  </li>\n" +
                        "                                        <li class=\"dy-video-actors\"> <span class=\"dy-video-tip\"> 创建时间: </span> <a>" + list[i].createTime + "</a>  </li>\n" +
                        "                                        <li class=\"dy-video-types\"> <span class=\"dy-video-tip\">数量:</span> <span class=\"dy-video-meta-filter\">" + list[i].count + "</span> </li>\n" +
                        "                                        <li class=\"dy-video-starts\"> <span class=\"dy-split\">|</span> <span class=\"dy-video-tip\">年代:</span> <span class=\"dy-video-meta-filter\">2018</span> </li>\n" +
                        "                                    </ul>\n" +
                        "                                    <p class=\"dy-video-intro\">xxx</p>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"dy-video-meta-bg\"> </div>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"dy-video-poster\"> <a class=\"dy-video-link\"> <img class=\"dy-video-img\" src=\"" + list[i].pictureCode + "\" alt=\"" + list[i].address + "\"> <span class=\"dy-video-nocomplete\"></span> <span class=\"dy-video-date\"> 2018 年 </span> <span class=\"dy-video-bg\"></span> <span class=\"s-pay\"></span> </a> </div>\n" +
                        "                            <div class=\"dy-video-primary\">\n" +
                        "                                <h4 class=\"dy-video-title\"><a> " + list[i].name + " </a> </h4>\n" +
                        "                                <span class=\"dy-video-rating\"> 7.3 </span> </div>\n" +
                        "                        </li>");
                }
            } else {
                layer.msg(data.message, {icon: 5});
            }
        },
        error: function (data) {
            layer.msg(data.status, {icon: 5});
        }
    });
}

//初始化时间状态
function initTime(firstDay) {
    $(".choice-date").removeClass("day-selection");
    let date;
    for (let i = Number(firstDay); i < Number(firstDay) + 7; i++) {
        let idNum = Number(i) % 7 === 0 ? 7 : Number(i) % 7;
        let id = "time-" + idNum;
        date = addDay(Number(i) - 1);
        let value = formatDate(date);
        $("#" + id).html(value);
    }
    $("#time-f").html(date.getFullYear() + "年");
    let choiceTime = $.cookie("choice-day-time");
    if (choiceTime != null) {
        let choiceTimeArrys = choiceTime.split("@@");
        $.each(choiceTimeArrys, function (i, val) {
            let values = val.split("$$");
            let year = values[2];
            let nowYear = $("#time-f").html();
            let dateDayNext = values[3];
            let trSeq = Number(values[4]) - 1;
            let tdSeq = Number(values[5]) - 1;
            if (year === nowYear && dateDayNext === $.cookie('date-day-next')) {
                if (trSeq === 0) {
                    $("#time-day tbody tr:eq(" + trSeq + ") td:eq(" + tdSeq + ")").addClass("day-selection");
                } else {
                    $("#time-day tbody tr:eq(" + trSeq + ") td:eq(" + tdSeq + ")").addClass("day-selection");
                }
            }
        });
    }
}

//选择教练点击
function initCoachClick(id, name) {
    var coachId = $.cookie('coachId');
    var coachName = $.cookie('coachName');
    if (coachName === undefined || coachName == null || coachName.length === 0) {
        coachId = id;
        coachName = name;
    } else {
        if (coachName === name) {
            coachId = "";
            coachName = "";
        } else {
            coachId = id;
            coachName = name;
        }
    }
    $.cookie('coachId', coachId);
    $.cookie('coachName', coachName);
    $("#choice-coach-span").text("你选择的教练为：" + coachName);
    $("#appointment-coach").html(coachName);
}

//选择场地点击
function initFieldClick(id, address) {
    var fieldId = $.cookie('fieldId');
    var fieldAddress = $.cookie('fieldAddress');
    if (fieldAddress === undefined || fieldAddress == null || fieldAddress.length === 0) {
        fieldId = id;
        fieldAddress = address;
    } else {
        if (address === fieldAddress) {
            fieldId = "";
            fieldAddress = "";
        } else {
            fieldId = id;
            fieldAddress = address;
        }
    }
    $.cookie('fieldId', fieldId);
    $.cookie('fieldAddress', fieldAddress);
    $("#choice-field-span").text("你选择的场地地址为：" + fieldAddress);
    $("#appointment-field").html(fieldAddress);
}

//选择器材点击
function initEquipClick(id, name) {
    var equipName = $.cookie('equipName');
    var equipId = $.cookie('equipId');
    if (equipName === undefined || equipName == null || equipName.length === 0) {
        equipName = name;
        equipId = id;
    } else {
        if (equipName.indexOf(name) === -1) {
            equipName = equipName + "," + name
            equipId = equipId + "," + id
        } else {
            equipName.replace("," + name, "");
            equipId.replace("," + id, "");
        }
    }
    $.cookie('equipId', equipId);
    $.cookie('equipName', equipName);
    $("#choice-equip-span").text("你选择的器材为：" + equipName);
    $("#appointment-equip").html(equipName);
}

//选择时间点击
function choiceDate(th) {
    let day;
    let time;
    let tdSeq = $(th).parent().find("td").index($(th)[0]) + 1;
    let trSeq = $(th).parent().parent().find("tr").index($(th).parent()[0]) + 1;
    //console.log("第" + (trSeq + 1) + "行，第" + (tdSeq + 1) + "列");
    if ((trSeq) === 1) {
        time = $(th).parent().find("td").eq(1).html();
        day = $(th).parent().parent().parent().find("thead").eq(0).find("tr").eq(0).find("th").eq(tdSeq - 1).html();
    } else {
        time = $(th).parent().find("td").eq(0).html();
        day = $(th).parent().parent().parent().find("thead").eq(0).find("tr").eq(0).find("th").eq(tdSeq).html();
    }
    $(th).addClass("day-selection");
    $(th).html("选中");
    let year = $("#time-f").html();
    let value = day + "$$" + time + "$$" + year + "$$" + $.cookie('date-day-next') + "$$" + trSeq + "$$" + tdSeq;
    if ($.cookie("choice-day-time") === undefined || $.cookie("choice-day-time") == null) {
        $.cookie("choice-day-time", value);
    } else {
        if ($.cookie("choice-day-time").indexOf(value) === -1) {
            $.cookie("choice-day-time", $.cookie("choice-day-time") + "@@" + value);
        } else {
            $.cookie("choice-day-time", $.cookie("choice-day-time").replace("@@" + value, ""));
            $.cookie("choice-day-time", $.cookie("choice-day-time").replace(value, ""));
            let trSeq1 = Number(trSeq) - 1;
            let tdSeq1 = Number(tdSeq) - 1;
            $("#time-day tbody tr:eq(" + trSeq1 + ") td:eq(" + tdSeq1 + ")").removeClass("day-selection");
        }
    }
    let value1 = year + "/" + day + "/" + time;
    if ($.cookie("choice-day-time-show") === undefined || $.cookie("choice-day-time-show") == null) {
        $.cookie("choice-day-time-show", value1);
    } else {
        if ($.cookie("choice-day-time-show").indexOf(value1) === -1) {
            $.cookie("choice-day-time-show", $.cookie("choice-day-time-show") + "、" + value1);
        } else {
            $.cookie("choice-day-time-show", $.cookie("choice-day-time-show").replace("、" + value1, ""));
            $.cookie("choice-day-time-show", $.cookie("choice-day-time-show").replace(value1, ""));
        }
    }
    if ($.cookie("choice-day-time-show").substring(0, 1) === '、') {
        $.cookie("choice-day-time-show", $.cookie("choice-day-time-show").substring(1,
            $.cookie("choice-day-time-show").length));
    }
    if ($.cookie("choice-day-time-show") === undefined || $.cookie("choice-day-time-show") == null
        || $.cookie("choice-day-time-show") === "") {
        $("#choice-time-span").text("你还未选择时间，请选择");
    } else {
        $("#choice-time-span").text("你选择的时间为:" + $.cookie("choice-day-time-show"));
    }
    $("#appointment-time").html($.cookie("choice-day-time-show"));
}

//在date时间添加dayNumber天
function addDay(dayNumber, date) {
    date = date ? date : new Date();
    let ms = dayNumber * (1000 * 60 * 60 * 24)
    return new Date(date.getTime() + ms);
}

//构造时间
function formatDate(date) {
    let month = (date.getMonth() + 1);
    let day = date.getDate();
    let week = '(' + ['周天', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()] + ')';
    return month + "/" + day + week;
}

//时间上一页点击
function lastWeek() {
    if ($.cookie('date-day-next') != null && Number($.cookie('date-day-next')) > 1) {
        $.cookie('date-day-next', Number($.cookie('date-day-next')) - 7);
        initTime($.cookie('date-day-next'));
    } else {
        layer.msg("不能选择过去的时间");
    }
}

//时间下一页点击
function nextWeek() {
    $.cookie('date-day-next', Number($.cookie('date-day-next')) + 7);
    initTime($.cookie('date-day-next'));
}

//预约确认
function appointmentSure() {
    let coachId = $.cookie('coachId');
    let fieldId = $.cookie('fieldId');
    let equipId = $.cookie('equipId');
    let time = $.cookie("choice-day-time-show")
    if (coachId === undefined || coachId == null || coachId === "") {
        layer.msg("教练未选择");
        return;
    }
    if (fieldId === undefined || fieldId == null || fieldId === "") {
        layer.msg("场地未选择");
        return;
    }
    if (equipId === undefined || equipId == null || equipId === "") {
        layer.msg("器材未选择");
        return;
    }
    if (time === undefined || time == null || time === "") {
        layer.msg("时间未选择");
        return;
    }
    console.log(coachId);
    console.log(fieldId);
    console.log(equipId);
    console.log(time);
}