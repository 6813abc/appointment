$(function () {
    changebz()
    sjz()
    change_sjz()
    file()
    all_sel()
    dy_sel()
    table_sel()
    bgqfn()
})

// 切换步骤
function changebz() {
    // 判断开始按钮是否禁用
    function start_dis() {
        (i === $('#tab-content .content').length) ? $('#start').prop('disabled', false) : $('#start').prop('disabled', true)
    }

    // 判断有无报告期
    function flagbgq() {
        if ($('#bgq input[name="bgq"]:checked').val() === '是') {
            if ($('#datetime_hid').val() === '') {
                alert('请选择报告期')
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }

    let i = 1;
    const content_list = $('#tab-content .content').length
    // 下一步
    $('#next_btn').on('click', function () {
        if (flagbgq()) {
            i++;
            $('#before_btn').prop('disabled', false)
            if (i > content_list - 1) {
                $(this).prop('disabled', true)
            }
            $('#tab-content .content').eq(i - 1).addClass('active').siblings().removeClass('active')
            $('#nav li').eq(i - 1).addClass('active').siblings().removeClass('active')
            start_dis()
        }
    })

    // 上一步
    $('#before_btn').on('click', function () {
        i--;
        $('#next_btn').prop('disabled', false)
        if (i < 2) {
            $(this).prop('disabled', true)
        }
        $('#tab-content .content').eq(i - 1).addClass('active').siblings().removeClass('active')
        $('#nav li').eq(i - 1).addClass('active').siblings().removeClass('active')
        start_dis()
    })
}

// 时间轴
function sjz() {
    const month_html =
        '<ul class="month">\
                            <li><a href="#" data="12">12月</a></li>\
                            <li><a href="#" data="11">11月</a></li>\
                            <li><a href="#" data="10">10月</a></li>\
                            <li><a href="#" data="9">9月</a></li>\
                            <li><a href="#" data="8">8月</a></li>\
                            <li><a href="#" data="7">7月</a></li>\
                            <li><a href="#" data="6">6月</a></li>\
                            <li><a href="#" data="5">5月</a></li>\
                            <li><a href="#" data="4">4月</a></li>\
                            <li><a href="#" data="3">3月</a></li>\
                            <li><a href="#" data="2">2月</a></li>\
                            <li><a href="#" data="1">1月</a></li>\
                        </ul>'
    const year = new Date().getFullYear();
    let year_html_before = ''
    let year_html_after = ''
    for (let i = year + 1; i < year + 3; i++) {
        year_html_after += '<li><div class="year-button"> ' + i + ' </div>' + month_html + '</li>'
    }
    for (let j = year - 2; j < year; j++) {
        year_html_before += '<li><div class="year-button"> ' + j + ' </div>' + month_html + '</li>'
    }
    const li_html_now = '<li class="active" id="now">\
								<div class="year-button"> ' + year +
        ' </div>\
                                <ul class="month">\
                                    <li class="active"><a href="#" data="12">12月</a></li>\
                                    <li><a href="#" data="11">11月</a></li>\
                                    <li><a href="#" data="10">10月</a></li>\
                                    <li><a href="#" data="9">9月</a></li>\
                                    <li><a href="#" data="8">8月</a></li>\
                                    <li><a href="#" data="7">7月</a></li>\
                                    <li><a href="#" data="6">6月</a></li>\
                                    <li><a href="#" data="5">5月</a></li>\
                                    <li><a href="#" data="4">4月</a></li>\
                                    <li><a href="#" data="3">3月</a></li>\
                                    <li><a href="#" data="2">2月</a></li>\
                                    <li><a href="#" data="1">1月</a></li>\
                                </ul>\
                            </li>'
    $('#year').append(li_html_now)
    $('#now').before(year_html_before)
    $('#now').after(year_html_after)

    //隐藏所有子栏目（除第一个栏目外）
    $(".year:not(:first)").find(".month").hide();
    //点击大栏目
    $(".year").on('click', 'li', function () {
        $("li.active", $(this).parent()).removeClass("active");
        $(this).addClass("active");
        $("ul>li:first", this).addClass("active");
    });
    $(".month").on('click', 'li', function () {
        const month = $(this).find('a').attr('data').replace(/\s*/g, "")
        const month1 = $(this).find('a').html().replace(/\s*/g, "")
        const year = $(this).parent().prev('.year-button').html().replace(/\s*/g, "")
        $('#datetime').val(year + '年' + month1)
        $('#datetime_hid').val(year + month)

        const $ul = $(this).parent();
        $ul.find(".active").removeClass("active");
        $(this).addClass("active");
        return false;
    });
}

// 呼出时间轴
function change_sjz() {
    $('#datetime').on('focus', function (e) {
        $('#timeline').fadeIn()
    })
    $(document).on('click', function (e) {
        if (e.target.className === 'year-button' || e.target.id === 'datetime') {
        } else {
            $('#timeline').fadeOut()
        }
    })
}

//上传文本
function file() {
    $('#file_btn').on('click', function () {
        $('#file_o').click()
    })
    $('#file_o').on('change', function () {
        $('#file_text').val(this.files[0].name)
    })
}

//选择sheet
function all_sel() {
    $('#all_sel').on('click', function () {
        $('#sel .checkbox input').prop('checked', true)
    })
    $('#all_nosel').on('click', function () {
        $('#sel .checkbox input').prop('checked', false)
    })
}

// 导入字段下拉
function dy_sel() {
    $('#sheet_sel').on('change', function () {
        $('#sel_text').html($(this).val())
    })
}

// 表格字段全选全不选
function table_sel() {
    let flag = false
    $('#table_size thead input[type="checkbox"]').on('change', function () {
        flag = !flag
        $('#table_size tbody input[type="checkbox"]').prop('checked', flag)
    })
}

// 是否选中报告期
function bgqfn() {
    var btn = $('#bgq input:radio[name="bgq"]')
    btn.on('change', function () {
        if ($(this).val() === '是') {
            $('#bgq_content').fadeIn()
        } else if ($(this).val() === '否') {
            $('#bgq_content').fadeOut()
        }
    })
}
