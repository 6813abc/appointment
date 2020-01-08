$(document).ready(function () {
    $.cookie('url', 'http://127.0.0.1:8095');
    layui.use(['element', 'carousel', 'layer', 'form', 'upload'], function () {
        var element = layui.element;
        var carousel = layui.carousel;
        var layer = layui.layer;
        var form = layui.form;
        var upload = layui.upload;
        //首页轮播图
        carousel.render({
            elem: '#layui-carousel',
            width: '100%',
            height: '580px',
        });

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
            //加载验证码
            loadCode(layer);
            indexOpenLogin = openLogin(layer);
        });

        //退出登录
        $("#index-logout").click(function () {
            //删除cookie
            $.removeCookie('userToken');
            $.removeCookie('flagUser');
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
            console.log(data.elem);
            console.log(data.form);
            console.log(data.field);
            sureRegister(layer, data, code, indexOpenRegister);
            return false;
        });

        //头像上传
        upload.render({
            elem: '#index-register-head',
            url: '/api/upload/',
            auto: false,//选择文件后不自动上传,
            // bindAction: '#testListAction', //指向一个按钮触发上传,
            choose: function (obj) {
                obj.preview(function (index, file, result) {
                    //得到文件base64编码，比如图片
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
        $('#index-recharge-button').click(function () {
            sureRecharge(layer, indexOpenRecharge);
        });
        //初始化页面
        init();
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
    if ($.cookie('userToken') === undefined || $.cookie('userToken').length === 0) {
        layer.msg('请先登录', {icon: 5});
        return;
    }
    $.cookie('flagUser', 'member');
    window.location.href = 'member.html';
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

