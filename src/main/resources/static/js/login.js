$(document).ready(function () {
    //$.cookie('url', 'http://127.0.0.1:8095');
    $.cookie('url', '');
    layui.use(['element', 'carousel', 'layer', 'form', 'upload'], function () {
        var element = layui.element;
        var carousel = layui.carousel;
        var layer = layui.layer;
        var form = layui.form;
        var upload = layui.upload;

        //确认登录
        form.on('submit(layui-btn-submit-login-admin)', function (data) {
            sureLogin(layer, data);
            return false;
        });

    });
});

//确认登录
function sureLogin(layer, data) {
    var url = $.cookie('url') + "/adminLogin";
    $.cookie('phone', data.field.phone)
    $.ajax({
            url: url,
            data: data.field,
            async: false,
            success: function (data) {
                if (data.code === '200') {
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('code', data.data.code);
                    $.cookie('token', data.data.token);
                    $.cookie('role', data.data.role);
                    layer.msg('登录成功', {icon: 1});
                    //登录成功后跳转主页面
                    url = 'main.html';
                    setTimeout("window.location.href = '" + url + "'", 1000)
                } else {
                    layer.msg(data.message, {icon: 5});
                }
            },
            error: function (data) {
                layer.msg(data.status, {icon: 5});
            }
        }
    )
    ;
}