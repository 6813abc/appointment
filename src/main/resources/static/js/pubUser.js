document.writeln("<!DOCTYPE html>");
document.writeln("<html lang=\'en\'>");
document.writeln("<head>");
document.writeln("    <meta charset=\'UTF-8\'>");
document.writeln("    <meta name=\'viewport\' content=\'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\'>");
document.writeln("    <title>AIAPS</title>");
document.writeln("    <link href=\'favicon.ico\' rel=\'shortcut icon\'>");
document.writeln("    <link href=\'layui/css/layui.css\' rel=\'stylesheet\' type=\'text/css\'/>");
document.writeln("    <link href=\'css/index.css\' rel=\'stylesheet\' type=\'text/css\'/>");
document.writeln("");
document.writeln("    <script src=\'js/jquery-1.10.1.min.js\' type=\'text/javascript\'></script>");
document.writeln("    <script type=\'text/javascript\' src=\'js/jquery.cookie.js\'></script>");
document.writeln("    <script src=\'layui/layui.js\' type=\'text/javascript\'></script>");
document.writeln("    <script src=\'js/index.js\' type=\'text/javascript\'></script>");
document.writeln("</head>");
document.writeln("<body>");
document.writeln("<!--导航栏-->");
document.writeln("<ul class=\'layui-nav layui-bg-cyan\' lay-filter=\'demo\'>");
document.writeln("    <li class=\'layui-nav-item\' id=\'index-index\'><a href=\'javascript:void(0);\'>首页</a></li>");
document.writeln("    <li class=\'layui-nav-item\' id=\'index-to-appointment\'><a href=\'javascript:void(0);\'>我要预约</a></li>");
document.writeln("    <li class=\'layui-nav-item\' id=\'index-to-member\'><a href=\'javascript:void(0);\'>成为会员</a></li>");
document.writeln("    <li class=\'layui-nav-item\'>");
document.writeln("        <a href=\'javascript:;\'>解决方案</a>");
document.writeln("        <dl class=\'layui-nav-child\'>");
document.writeln("            <dd><a href=\'\'>移动模块</a></dd>");
document.writeln("            <dd><a href=\'\'>后台模版</a></dd>");
document.writeln("            <dd><a href=\'\'>电商平台</a></dd>");
document.writeln("        </dl>");
document.writeln("    </li>");
document.writeln("    <li class=\'layui-nav-item\'><a href=\'\'>线下活动</a></li>");
document.writeln("    <li class=\'layui-nav-item\'><a href=\'\'>社区分享</a></li>");
document.writeln("    <li class=\'layui-nav-item\' id=\'index-user\'>");
document.writeln("        <img src=\'\' class=\'layui-nav-img\' id=\'layui-nav-img\'>个人中心");
document.writeln("        <dl class=\'layui-nav-child\'>");
document.writeln("            <dd><a href=\'javascript:;\'>预约查询</a></dd>");
document.writeln("            <dd><a href=\'javascript:;\'>个人信息</a></dd>");
document.writeln("            <dd><a href=\'javascript:;\' id=\'index-recharge\'>充值余额</a></dd>");
document.writeln("            <dd><a href=\'javascript:;\' id=\'index-recharge-record\'>充值记录</a></dd>");
document.writeln("            <dd><a href=\'javascript:;\' id=\'index-consumption-record\'>消费记录</a></dd>");
document.writeln("            <dd><a href=\'javascript:;\' id=\'index-appointment-record\'>预约记录</a></dd>");
document.writeln("            <dd><a href=\'javascript:;\' id=\'index-logout\'>退出登录</a></dd>");
document.writeln("        </dl>");
document.writeln("    </li>");
document.writeln("    <li class=\'layui-nav-item\' id=\'index-register\' style=\'display: none;\'><a href=\'javascript:void(0);\'>注册</a></li>");
document.writeln("    <li class=\'layui-nav-item\' id=\'index-login\' style=\'display: none;\'><a href=\'javascript:void(0);\'>登录</a></li>");
document.writeln("</ul>");
document.writeln("");
document.writeln("<!--注册弹出框-->");
document.writeln("<div id=\'index-register-eject\' style=\'display: none\'>");
document.writeln("    <div id=\'index-register-img-head\'>");
document.writeln("        <img src=\'//t.cn/RCzsdCq\' class=\'layui-nav-img\' id=\'index-register-head\' alt=\'头像\'>");
document.writeln("    </div>");
document.writeln("    <!--蓝色分割线-->");
document.writeln("    <hr class=\'layui-bg-blue\' id=\'index-register-line\'>");
document.writeln("    <form class=\'layui-form\' action=\'\'>");
document.writeln("        <div class=\'layui-form-item\'>");
document.writeln("            <label class=\'layui-form-label\'>手机</label>");
document.writeln("            <div class=\'layui-input-inline\'>");
document.writeln("                <input type=\'text\' name=\'phone\' required lay-verify=\'required|phone|number\' placeholder=\'请输入手机号\'");
document.writeln("                       autocomplete=\'off\' class=\'layui-input\'>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("        <div class=\'layui-form-item\'>");
document.writeln("            <label class=\'layui-form-label\'>昵称</label>");
document.writeln("            <div class=\'layui-input-inline\'>");
document.writeln("                <input type=\'text\' name=\'name\' required lay-verify=\'required\' placeholder=\'请输入昵称\'");
document.writeln("                       autocomplete=\'off\' class=\'layui-input\'>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("        <div class=\'layui-form-item\'>");
document.writeln("            <label class=\'layui-form-label\'>地址</label>");
document.writeln("            <div class=\'layui-input-inline\'>");
document.writeln("                <input type=\'text\' name=\'address\' required lay-verify=\'required\' placeholder=\'请输入地址\'");
document.writeln("                       autocomplete=\'off\' class=\'layui-input\'>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("        <div class=\'layui-form-item\'>");
document.writeln("            <label class=\'layui-form-label\'>密码</label>");
document.writeln("            <div class=\'layui-input-inline\'>");
document.writeln("                <input type=\'password\' name=\'password\' required lay-verify=\'required\' placeholder=\'请输入密码\'");
document.writeln("                       autocomplete=\'off\' class=\'layui-input\'>");
document.writeln("            </div>");
document.writeln("            <div class=\'layui-form-mid layui-word-aux\'>后面提示</div>");
document.writeln("        </div>");
document.writeln("        <div class=\'layui-form-item\'>");
document.writeln("            <label class=\'layui-form-label\'>确认密码</label>");
document.writeln("            <div class=\'layui-input-inline\'>");
document.writeln("                <input type=\'password\' name=\'passwordSure\' required lay-verify=\'required\' placeholder=\'请再次输入密码\'");
document.writeln("                       autocomplete=\'off\' class=\'layui-input\'>");
document.writeln("            </div>");
document.writeln("            <div class=\'layui-form-mid layui-word-aux\'>后面提示</div>");
document.writeln("        </div>");
document.writeln("        <div class=\'layui-form-item\'>");
document.writeln("            <label class=\'layui-form-label\'>性别</label>");
document.writeln("            <div class=\'layui-input-block\'>");
document.writeln("                <input type=\'radio\' name=\'sex\' value=\'男\' title=\'男\'>");
document.writeln("                <input type=\'radio\' name=\'sex\' value=\'女\' title=\'女\' checked>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("        <div class=\'layui-form-item\'>");
document.writeln("            <div class=\'layui-input-block\'>");
document.writeln("                <button class=\'layui-btn\' lay-submit lay-filter=\'layui-btn-submit-register\'>注册</button>");
document.writeln("                <button type=\'reset\' class=\'layui-btn layui-btn-primary\'>重置</button>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("    </form>");
document.writeln("</div>");
document.writeln("");
document.writeln("<!--登录弹出框-->");
document.writeln("<div id=\'index-login-eject\' style=\'display: none\'>");
document.writeln("    <form class=\'layui-form\' action=\'\' id=\'layui-form-login\' method=\'post\'>");
document.writeln("        <div class=\'layui-form-item\' id=\'layui-form-item-phone\'>");
document.writeln("            <label class=\'layui-form-label\'>手机</label>");
document.writeln("            <div class=\'layui-input-inline\'>");
document.writeln("                <input type=\'text\' name=\'phone\' required lay-verify=\'required|phone|number\' placeholder=\'请输入手机号\'");
document.writeln("                       autocomplete=\'off\' class=\'layui-input\' value=\'13086621160\'>");
document.writeln("            </div>");
document.writeln("            <div class=\'layui-form-mid layui-word-aux\'></div>");
document.writeln("        </div>");
document.writeln("        <div class=\'layui-form-item\'>");
document.writeln("            <label class=\'layui-form-label\'>密码</label>");
document.writeln("            <div class=\'layui-input-inline\'>");
document.writeln("                <input type=\'password\' name=\'password\' required lay-verify=\'required\' placeholder=\'请输入密码\'");
document.writeln("                       autocomplete=\'off\' class=\'layui-input\' value=\'123456\'>");
document.writeln("            </div>");
document.writeln("            <div class=\'layui-form-mid layui-word-aux\'></div>");
document.writeln("        </div>");
document.writeln("        <div class=\'layui-form-item\'>");
document.writeln("            <label class=\'layui-form-label\'>验证码</label>");
document.writeln("            <div class=\'layui-input-inline\'>");
document.writeln("                <input type=\'code\' name=\'code\' required lay-verify=\'required\' placeholder=\'请输入验证码\'");
document.writeln("                       autocomplete=\'off\' class=\'layui-input\'>");
document.writeln("            </div>");
document.writeln("            <div class=\'layui-form-mid layui-word-aux\'><img src=\'\' style=\'width: 80px; height: 30px;\' alt=\'验证码\'");
document.writeln("                                                            id=\'img-code\'/></div>");
document.writeln("        </div>");
document.writeln("        <div class=\'layui-form-item\'>");
document.writeln("            <div class=\'layui-input-block\'>");
document.writeln("                <button class=\'layui-btn\' lay-submit lay-filter=\'layui-btn-submit-login\'>登录</button>");
document.writeln("                <button type=\'reset\' class=\'layui-btn layui-btn-primary\'>重置</button>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("    </form>");
document.writeln("</div>");
document.writeln("");
document.writeln("<!--充值弹出框-->");
document.writeln("<div id=\'index-recharge-eject\' style=\'display: none\'>");
document.writeln("    <form class=\'form1\'>");
document.writeln("        <label class=\'type1\' style=\'height:120px;\'>");
document.writeln("            <span>充值金额：</span>");
document.writeln("            <div>");
document.writeln("                <span class=\'a-num\' RMB=\'50\'>50RMB<img class=\'select-img\' src=\'img/select-icon.png\' alt=\'\'></span>");
document.writeln("                <span class=\'a-num\' RMB=\'100\'>100RMB<img class=\'select-img\' src=\'img/select-icon.png\' alt=\'\'></span>");
document.writeln("                <span class=\'a-num active\' RMB=\'200\'>200RMB<img class=\'select-img\' src=\'img/select-icon.png\'");
document.writeln("                                                                alt=\'\'></span>");
document.writeln("                <span class=\'a-num\' RMB=\'500\'>500RMB<img class=\'select-img\' src=\'img/select-icon.png\' alt=\'\'></span>");
document.writeln("                <span class=\'a-num\' RMB=\'1000\'>1000RMB<img class=\'select-img\' src=\'img/select-icon.png\' alt=\'\'></span>");
document.writeln("                <span class=\'a-num\' RMB=\'2000\'>2000RMB<img class=\'select-img\' src=\'img/select-icon.png\' alt=\'\'></span>");
document.writeln("                <span class=\'a-num\' RMB=\'3000\'>3000RMB<img class=\'select-img\' src=\'img/select-icon.png\' alt=\'\'></span>");
document.writeln("                <span class=\'a-num\' RMB=\'5000\'>5000RMB<img class=\'select-img\' src=\'img/select-icon.png\' alt=\'\'></span>");
document.writeln("                <span class=\'a-num\' RMB=\'10000\'>10000RMB<img class=\'select-img\' src=\'img/select-icon.png\' alt=\'\'></span>");
document.writeln("            </div>");
document.writeln("        </label>");
document.writeln("        <label class=\'type2\'>");
document.writeln("            <span>　</span>");
document.writeln("            <div>");
document.writeln("                <input class=\'num_rmb\' type=\'text\' value=\'200\' placeholder=\'请输入数据\'");
document.writeln("                       onkeyup=\'this.value=this.value.replace(/[^\/\/d]/g,\'\')\'>");
document.writeln("                RMB =");
document.writeln("                <e>2000</e>");
document.writeln("                积分");
document.writeln("            </div>");
document.writeln("            <button type=\'button\' class=\'layui-btn layui-btn-fluid\' id=\'index-recharge-button\'>确认</button>");
document.writeln("        </label>");
document.writeln("    </form>");
document.writeln("</div>");
document.writeln("");
document.writeln("<!--充值成功界面-->");
document.writeln("<div id=\'index-recharge-success\' style=\'display: none\'>");
document.writeln("    <div id=\'index-recharge-success-son\'>");
document.writeln("        <i class=\'layui-icon layui-icon-ok\' id=\'index-recharge-success-i\'>充值成功</i>");
document.writeln("    </div>");
document.writeln("    <div class=\'layui-form-item\'>");
document.writeln("        <label class=\'layui-form-label\'>交易时间</label>");
document.writeln("        <div class=\'layui-input-block\'>");
document.writeln("            <input type=\'text\' id=\'recharge-time\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                   class=\'layui-input\'>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("    <div class=\'layui-form-item\'>");
document.writeln("        <label class=\'layui-form-label\'>交易金额</label>");
document.writeln("        <div class=\'layui-input-block\'>");
document.writeln("            <input type=\'text\' id=\'recharge-money\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                   class=\'layui-input\'>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("    <div class=\'layui-form-item\'>");
document.writeln("        <label class=\'layui-form-label\'>交易流水</label>");
document.writeln("        <div class=\'layui-input-block\'>");
document.writeln("            <input type=\'text\' id=\'recharge-flow\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                   class=\'layui-input\'>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("</div>");
document.writeln("");
document.writeln("");
document.writeln("<!--预约成功界面-->");
document.writeln("<div id=\'index-appointment-success\' style=\'display: none\'>");
document.writeln("    <div id=\'index-appointment-success-son\'>");
document.writeln("        <i class=\'layui-icon layui-icon-ok\' id=\'index-appointment-success-i\'>预约成功</i>");
document.writeln("    </div>");
document.writeln("    <div class=\'layui-form-item\'>");
document.writeln("        <label class=\'layui-form-label\'>预计花费</label>");
document.writeln("        <div class=\'layui-input-block\'>");
document.writeln("            <input type=\'text\' id=\'appointment-money\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                   class=\'layui-input\'>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("    <div class=\'layui-form-item\'>");
document.writeln("        <label class=\'layui-form-label\'>会员折扣</label>");
document.writeln("        <div class=\'layui-input-block\'>");
document.writeln("            <input type=\'text\' id=\'appointment-discount\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                   class=\'layui-input\'>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("    <div class=\'layui-form-item\'>");
document.writeln("        <label class=\'layui-form-label\'>实际花费</label>");
document.writeln("        <div class=\'layui-input-block\'>");
document.writeln("            <input type=\'text\' id=\'appointment-money-actual\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                   class=\'layui-input\'>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("    <div class=\'layui-form-item\'>");
document.writeln("        <label class=\'layui-form-label\'>账号余额</label>");
document.writeln("        <div class=\'layui-input-block\'>");
document.writeln("            <input type=\'text\' id=\'appointment-balance\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                   class=\'layui-input\'>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("</div>");
document.writeln("<!--充值消费预约记录-->");
document.writeln("<div id=\'index-record\' style=\'display: none\'>");
document.writeln("    <div id=\'index-div-record\'>");
document.writeln("        <span class=\'layui-breadcrumb\' lay-separator=\'|\'>");
document.writeln("          <a href=\'javascript:;\' id=\'recharge-record\'>充值记录</a>");
document.writeln("          <a href=\'javascript:;\' id=\'consumption-record\'>消费记录</a>");
document.writeln("          <a href=\'javascript:;\' id=\'appointment-record\'>预约记录</a>");
document.writeln("        </span>");
document.writeln("    </div>");
document.writeln("    <table id=\'index-record-table\' lay-filter=\'index-div-table\'></table>");
document.writeln("</div>");
document.writeln("</body>");
document.writeln("</html>");