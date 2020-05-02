    var sdEditorEmoj = {
        emojiconfig: {
            qq: {
                name: "QQ表情",
                path: "emoji/",
                imgName: ["1.gif", "2.gif", ],
                alias: ["微笑", "伤心", ],
                title: ["[Smile]", "[Grimace]", ],
            },
        },
        emojiRealTimeData: [/*{imgUrl: "",title: "",alias: "",num:"",},*/],
        Init: function (options,element,elid) {
            var isShowImg = true,
                faceDivBox = $('.faceDivBox'),
                faceDiv = $('.faceDiv'),
                div = $('#content'),
                isAnimate = false;
            var emojiContainer = faceDiv.find('.emoji-box'),
                emojiconfig = options;
            var div = document.getElementById('content');
            //emojiconfig = sdEditorEmoj.emojiconfig;
            // div.focus(function () {
            //     $(this).parent().addClass('clicked')
            // });
            $(".imgBtn,.closeFaceBox").on('click', function () {
                //div.focus();
                faceDivShowHide();
            });
            $("#openFace").on('click', function () {
                //div.focus();
                faceDivShowHide();
            });
            var faceDivShowHide = function () {
                var fb = $(".faceDivBox"),
                    ib = $(".infoBox");
                if ($(".infoBoxl").length != '0') {
                    var ibl = $(".infoBoxl");
                }
                var display = fb.css('display');
                if (isShowImg == false) {
                    if (ibl) {
                        ibl.animate({ width: "100%", marginLeft: "145px" }, 600);
                    }
                    fb.fadeOut();
                    isShowImg = true;
                } else {
                    if (ibl) {
                        ibl.animate({ width: "602px", marginLeft: "40px" }, 600, function () {
                            setTimeout(function () { fb.fadeIn(); }, 600);
                        });
                    } else {
                        fb.fadeIn();
                    }
                    isShowImg = false;
                }
            };

            if ($(".faceDiv span").length == 0) {
                var num = 0;
                var imgName = '';
                for (var emojilist in emojiconfig) {  //添加emoji标签
                    var maxNum = Object.keys(emojiconfig[emojilist].alias).length - 1;
                    num++;
                    var emclassf = 'em' + num + '-';
                    emojiContainer.append('<section class="for-' + emojilist + '"></section>');
                    faceDiv.find('.emoji-tab').append('<a href="javascript:void(0);" data-target="for-' + emojilist + '">' + emojiconfig[emojilist].name + '</a>');
                    for (var i = 0; i <= maxNum; i++) {
                        imgName = emojiconfig[emojilist].imgName[i];
                        imgName = imgName.substring(0, imgName.length - 4);
                        emclass = emclassf + imgName;
                        if (emojiContainer.find('.for-' + emojilist) !== undefined) {
                            var c = '<a unselectable="on" href="javascript:void(0);" class="embox"><span data-src="'
                                + emojiconfig[emojilist].path + emojiconfig[emojilist].imgName[i] + '" class="em ' + emclass + '" data-alias="'
                                + (emojiconfig[emojilist].alias[i] == undefined ? '' : emojiconfig[emojilist].alias[i]) + '" title="'
                                + (emojiconfig[emojilist].title[i] == undefined ? (emojiconfig[emojilist].empty) : emojiconfig[emojilist].title[i]) + '">' + emojiconfig[emojilist].alias[i] + '</span></a>';
                            emojiContainer.find('.for-' + emojilist).append(c);
                        }
                    }
                }
                // faceDivShowHide();             
            }

            $(".contentBox,.faceDiv").click(function () {
                return false;
            });
            // $(".faceDiv").click(function () {
            //     div.focus();
            // });
            $(".tab-pre").click(function () {
                if (isAnimate) return false;
                isAnimate = true;
                var tabBox = $(".emoji-tab"),
                    aNum = tabBox.find("a").length,
                    num = parseInt(aNum / 8),
                    tabBoxMaxMTop = -352 * num,
                    mtop = parseInt(tabBox.css("marginTop"));
                if (mtop != 0) {
                    var cTop = mtop + 352 + 'px';
                    tabBox.animate({ marginTop: cTop }, 300, function () {
                        isAnimate = false;
                    });
                } else {
                    tabBoxMaxMTop = tabBoxMaxMTop + 'px'
                    tabBox.animate({ marginTop: tabBoxMaxMTop }, 300, function () {
                        isAnimate = false;
                    });
                }
                return false;
            });
            $(".tab-next").click(function () {
                if (isAnimate) return false;
                isAnimate = true;
                var tabBox = $(".emoji-tab"),
                    aNum = tabBox.find("a").length,
                    num = parseInt(aNum / 8),
                    tabBoxMaxMTop = -352 * num,
                    mtop = parseInt(tabBox.css("marginTop"));
                if (tabBoxMaxMTop < mtop) {
                    var cTop = mtop - 352 + 'px';
                    tabBox.animate({ marginTop: cTop }, 300, function () {
                        isAnimate = false;
                    });
                } else {
                    tabBox.animate({ marginTop: "0px" }, 300, function () {
                        isAnimate = false;
                    });
                }
                return false;
            });
        },
        bindClickImg: function (obj) {
            var faceDiv = $('.faceDiv'), div = $('#content');
            //初始化emoji标签选项
            faceDiv.find('.emoji-box section').css("display", "none").eq(0).css("display", "block");
            faceDiv.find('.emoji-tab a').eq(0).addClass("active");
            faceDiv.find('.emoji-box img,.emoji-box .embox').on('click', function () { //选择图片 点击表情
                insertText(obj,$(this).find("span").attr("data-alias"));
            });
            faceDiv.find('.emoji-tab a').on('click', function () { //切换表情标签
                div.focus();
                $(this).parent().parent().prev().find('section').hide();
                faceDiv.find('.emoji-box .' + $(this).attr('data-target')).show();
                faceDiv.find('.emoji-tab a').removeClass('active');
                this.className += ' active';
                $(this).parent().parent().parent();
                var faceDivHeight = faceDiv.height(),
                    nowSectionClass = "." + $(this).attr('data-target'),
                    nowSection = $(nowSectionClass),
                    contentHeight = nowSection.height();  //outerHeight()
                if (faceDivHeight < contentHeight) {
                    faceDiv.addClass('isScrolly');
                } else {
                    faceDiv.removeClass('isScrolly');
                }
                return false;
            });
            function insertText(opation,val) {
                var obj = document.getElementById(opation.id);
                var str = val;
                if(opation.type == "input"){
                    if (document.selection) {
                        obj.focus();
                        var sel = document.selection.createRange();
                        sel.text = str;
                    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                        var startPos = obj.selectionStart;
                        var endPos = obj.selectionEnd;
                        var tmpStr = obj.value;
                        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
                    } else {
                        obj.value += str;
                    }
                }else{
                    if (document.selection) {
                        obj.focus();
                        var sel = document.selection.createRange();
                        sel.text = str;
                    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                        var startPos = obj.selectionStart;
                        var endPos = obj.selectionEnd;
                        var tmpStr = obj.innerHTML;
                        obj.innerHTML = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
                    } else {
                        obj.innerHTML += str;
                    }
                }
            }
        },
        setEmoji: function (obj) {
            sdEditorEmoj.bindClickImg(obj);
        },
    };
