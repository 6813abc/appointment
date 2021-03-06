document.writeln("<!DOCTYPE html>");
document.writeln("<html lang=\'en\'>");
document.writeln("<head>");
document.writeln("    <meta charset=\'UTF-8\'>");
document.writeln("    <link href=\'css/admin.css\' rel=\'stylesheet\' type=\'text/css\'/>");
document.writeln("    <link href=\'layui/css/layui.css\' rel=\'stylesheet\' type=\'text/css\'/>");
document.writeln("    <script src=\'js/jquery-1.10.1.min.js\' type=\'text/javascript\'></script>");
document.writeln("    <script type=\'text/javascript\' src=\'js/jquery.cookie.js\'></script>");
document.writeln("    <script src=\'layui/layui.js\' type=\'text/javascript\'></script>");
document.writeln("    <script src=\'js/main.js\' type=\'text/javascript\'></script>");
document.writeln("    <title>AIAPS</title>");
document.writeln("</head>");
document.writeln("<body>");
document.writeln("<div class=\'layui-layout layui-layout-admin\'>");
document.writeln("    <!--顶部导航-->");
document.writeln("    <div class=\'admin-header\'>");
document.writeln("        <span class=\'layui-logo\' id=\'layui-logo\'>管理系统</span>");
document.writeln("        <ul class=\'layui-nav\' id=\'admin-header-ul\'>");
document.writeln("            <li class=\'layui-nav-item\'>");
document.writeln("                <i class=\'layui-icon layui-icon-shrink-right\' id=\'menu-bar\'></i>");
document.writeln("            </li>");
document.writeln("            <li class=\'layui-nav-item\'>");
document.writeln("                <i class=\'layui-icon layui-icon-refresh\' id=\'admin-refresh\'></i>");
document.writeln("            </li>");
document.writeln("            <li class=\'layui-nav-item\'>");
document.writeln("                <input type=\'text\' name=\'title\' id=\'admin-search\' placeholder=\'搜索...\' autocomplete=\'off\'>");
document.writeln("            </li>");
document.writeln("            <li class=\'layui-nav-item\' id=\'admin-header-img\'>");
document.writeln("                <a href=\'\'><img src=\'\' class=\'layui-nav-img\' id=\'main-self-img\'></a>");
document.writeln("                <dl class=\'layui-nav-child\'>");
document.writeln("                    <dd><a href=\'javascript:;\' id=\'pub-message\'>基本信息</a></dd>");
document.writeln("                    <dd><a href=\'javascript:;\' id=\'update-password\'>修改密码</a></dd>");
document.writeln("                    <dd><a href=\'javascript:;\' id=\'pub-logout\'>退出登陆</a></dd>");
document.writeln("                </dl>");
document.writeln("            </li>");
document.writeln("        </ul>");
document.writeln("        <!--<i class=\'layui-icon layui-icon-shrink-right\' id=\'menu-bar\' onclick=\'fold()\'></i>");
document.writeln("        <i class=\'layui-icon layui-icon-refresh\' id=\'admin-refresh\'></i>");
document.writeln("        <input type=\'text\' name=\'title\' id=\'admin-search\' placeholder=\'搜索...\' autocomplete=\'off\'>-->");
document.writeln("    </div>");
document.writeln("    <!--侧边菜单栏-->");
document.writeln("    <div class=\'layui-side layui-bg-black leftMenuDiv\'>");
document.writeln("        <div class=\'layui-side-scroll\'>");
document.writeln("            <ul class=\'layui-nav layui-nav-tree nav-tree-main\' lay-shrink=\'all\'>");
document.writeln("                <li class=\'layui-nav-item\' id=\'admin-coach\'>");
document.writeln("                    <a href=\'javascript:;\'><i class=\'layui-icon\'>&#xe66f;</i> <span");
document.writeln("                            class=\'cite\'>教练<em>管理</em></span></a>");
document.writeln("                    <dl class=\'layui-nav-child\'>");
document.writeln("                        <dd id=\'admin-coach-main\'><a href=\'javascript:;\'><span class=\'cite\'>教练查询</span></a></dd>");
document.writeln("                        <dd><a href=\'javascript:;\'><span class=\'cite\'>业绩分析</span></a></dd>");
document.writeln("                    </dl>");
document.writeln("                </li>");
document.writeln("                <li class=\'layui-nav-item\' id=\'admin-customer\'>");
document.writeln("                    <a href=\'javascript:;\'><i class=\'layui-icon\'>&#xe770;</i> <span");
document.writeln("                            class=\'cite\'>客户<em>管理</em></span></a>");
document.writeln("                    <dl class=\'layui-nav-child\'>");
document.writeln("                        <dd><a href=\'javascript:;\' id=\'admin-customer-main\'><span class=\'cite\'>客户查询</span></a></dd>");
document.writeln("                        <dd><a href=\'javascript:;\'><span class=\'cite\'>统计分析</span></a></dd>");
document.writeln("                    </dl>");
document.writeln("                </li>");
document.writeln("                <li class=\'layui-nav-item\' id=\'admin-equip\'>");
document.writeln("                    <a href=\'javascript:;\'><i class=\'layui-icon\'>&#xe631;</i> <span");
document.writeln("                            class=\'cite\'>器材<em>管理</em></span></a>");
document.writeln("                    <dl class=\'layui-nav-child\'>");
document.writeln("                        <dd><a href=\'javascript:;\' id=\'admin-equip-main\'><span class=\'cite\'>器材查询</span></a></dd>");
document.writeln("                        <dd><a href=\'javascript:;\' id=\'admin-equip-type\'><span class=\'cite\'>器材种类</span></a></dd>");
document.writeln("                    </dl>");
document.writeln("                </li>");
document.writeln("                <li class=\'layui-nav-item\' id=\'admin-field\'>");
document.writeln("                    <a href=\'javascript:;\'><i class=\'layui-icon\'>&#xe715;</i> <span");
document.writeln("                            class=\'cite\'>场地<em>管理</em></span></a>");
document.writeln("                    <dl class=\'layui-nav-child\'>");
document.writeln("                        <dd><a href=\'javascript:;\' id=\'admin-field-main\'><span class=\'cite\'>场地查询</span></a></dd>");
document.writeln("                        <dd><a href=\'javascript:; id=\'admin-field-analyse\'\'><span class=\'cite\'>场地分析</span></a></dd>");
document.writeln("                    </dl>");
document.writeln("                </li>");
document.writeln("            </ul>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("    <div class=\'layui-body\'>");
document.writeln("        <div class=\'layui-fluid\'>");
document.writeln("            <div class=\'layui-row\'>");
document.writeln("                <hr class=\'layui-bg-gray\'>");
document.writeln("                <div class=\'layui-col-md12 wMain-col-bg1\'>");
document.writeln("                    <span class=\'layui-breadcrumb coach-nav\' lay-separator=\'-\' id=\'coach-nav\'>");
document.writeln("                    </span>");
document.writeln("                </div>");
document.writeln("                <div class=\'layui-col-md12 wMain-col-bg2\' id=\'main-div\'>");
document.writeln("                    <table id=\'main-div-table\' lay-filter=\'main-div-table\'></table>");
document.writeln("                </div>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("");
document.writeln("    </div>");
document.writeln("</div>");
document.writeln("");
document.writeln("<!--个人信息框-->");
document.writeln("<div id=\'pub-self-message\' style=\'display: none\'>");
document.writeln("    <div>");
document.writeln("        <div id=\'self-all\'>");
document.writeln("            <blockquote class=\'layui-elem-quote\' style=\'height: 60px\'>");
document.writeln("                姓名：<span id=\'self-name\'></span> &nbsp|&nbsp 关注：<span>3</span> &nbsp|&nbsp 粉丝：<span>10</span>");
document.writeln("            </blockquote>");
document.writeln("            <img src=\'\' id=\'self-img\' style=\'width: 80px;height: 80px;position: absolute;top: 1px;right: 10px\'/>");
document.writeln("            <div class=\'layui-inline\'>");
document.writeln("                <label class=\'layui-form-label\'>性别</label>");
document.writeln("                <div class=\'layui-input-inline\'>");
document.writeln("                    <input type=\'tel\' name=\'sex\' id=\'self-sex\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                           class=\'layui-input\'>");
document.writeln("                </div>");
document.writeln("                <label class=\'layui-form-label\' id=\'self-edit\' style=\'float: right;\'>修改资料</label>");
document.writeln("            </div>");
document.writeln("            <div class=\'layui-inline\'>");
document.writeln("                <label class=\'layui-form-label\'>电话</label>");
document.writeln("                <div class=\'layui-input-inline\'>");
document.writeln("                    <input type=\'tel\' name=\'phone\' id=\'self-phone\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                           class=\'layui-input\'>");
document.writeln("                </div>");
document.writeln("            </div>");
document.writeln("            <div class=\'layui-inline\'>");
document.writeln("                <label class=\'layui-form-label\'>年龄</label>");
document.writeln("                <div class=\'layui-input-inline\'>");
document.writeln("                    <input type=\'tel\' name=\'age\' id=\'self-age\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                           class=\'layui-input\'>");
document.writeln("                </div>");
document.writeln("            </div>");
document.writeln("            <div class=\'layui-inline\'>");
document.writeln("                <label class=\'layui-form-label\'>角色</label>");
document.writeln("                <div class=\'layui-input-inline\'>");
document.writeln("                    <input type=\'tel\' name=\'role\' id=\'self-role\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                           class=\'layui-input\'>");
document.writeln("                </div>");
document.writeln("            </div>");
document.writeln("            <div class=\'layui-form-item\'>");
document.writeln("                <div class=\'layui-input-block\'>");
document.writeln("                    <button type=\'submit\' class=\'layui-btn\' lay-submit=\'\' lay-filter=\'demo1\'>立即提交</button>");
document.writeln("                </div>");
document.writeln("            </div>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("</div>");
document.writeln("");
document.writeln("<!--修改密码框-->");
document.writeln("<div id=\'pub-update-message\' style=\'display: none\'>");
document.writeln("    <div class=\'layui-inline\'>");
document.writeln("        <label class=\'layui-form-label\'>原密码</label>");
document.writeln("        <div class=\'layui-input-inline\'>");
document.writeln("            <input type=\'password\' name=\'oldPassword\' id=\'pub-old-password\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                   class=\'layui-input\'>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("    <div class=\'layui-inline\'>");
document.writeln("        <label class=\'layui-form-label\'>新密码</label>");
document.writeln("        <div class=\'layui-input-inline\'>");
document.writeln("            <input type=\'password\' name=\'newPassword\' id=\'pub-new-password\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                   class=\'layui-input\'>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("    <div class=\'layui-inline\'>");
document.writeln("        <label class=\'layui-form-label\'>确认密码</label>");
document.writeln("        <div class=\'layui-input-inline\'>");
document.writeln("            <input type=\'password\' name=\'subPassword\' id=\'pub-sub-password\' lay-verify=\'required\' autocomplete=\'off\'");
document.writeln("                   class=\'layui-input\'>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("    <div class=\'layui-form-item\'>");
document.writeln("        <div class=\'layui-input-block\'>");
document.writeln("            <button class=\'layui-btn\' id=\'pub-sub-update-password\'>确认</button>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("</div>");
document.writeln("</body>");
document.writeln("</html>");
document.writeln("");