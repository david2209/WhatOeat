/**
 * Created by seaton on 2016/6/20.
 */
$(function () {

    if (!localStorage.getItem("默认")) { // 初始化
        localStorage.setItem("默认", JSON.stringify(["黄焖鸡", "煲仔饭", "食堂"]));
    }
    if (!localStorage.getItem("ADDRESS")) {
        localStorage.setItem("ADDRESS", JSON.stringify(["默认"]));
    }

    var e_array = null;
    var _task = null;
    var _inx = 0;
    var _item_address = "默认";

    $(".J-ctrl").click(function () { // 开始摇菜

        if (localStorage.getItem(_item_address) == undefined ||
            localStorage.getItem(_item_address) == null ||
            localStorage.getItem(_item_address) == "") {
            alert("请先完善该地区菜品信息");
            return false;
        }
        e_array = JSON.parse(localStorage.getItem(_item_address));

        if (e_array.length > 0) {
            var _val = $(this).val();
            if (_val === "跑起来" || _val === "不喜欢？再来一次") {
                _task = setInterval(function () {
                    _inx = Math.floor(Math.random() * e_array.length);
                    $(".J-show").html(e_array[_inx]);
                }, 100);
                $(this).val("吃这个");
            } else {
                clearInterval(_task);
                $(this).val("不喜欢？再来一次");
            }
        }
    });

    $(".J-show-address").click(function () { // 点击地儿入口
        $(".pop").fadeIn("fast");
        var _html = "";
        var _address_array = JSON.parse(localStorage.getItem("ADDRESS"));
        for (var i = 0; i < _address_array.length; i++) {
            var _ads_len = 0;
            if (localStorage.getItem(_address_array[i]) != "") {
                var _ads_array = JSON.parse(localStorage.getItem(_address_array[i]));
                _ads_len = _ads_array.length;
            }
            _html += "<div class='div-item bor-b J-ads-item'>" +
                "<span class='fl font-16 cor-3'>" + _address_array[i] + "</span>" +
                "<span class='fr font-16 cor-6'>" + _ads_len + " 菜品</span>" +
                "</div>";
        }
        $(".pop-show-address").empty().append(_html).slideDown();
    });

    $(".pop-show-address").on("click", ".J-ads-item", function () { // 点击地点列表项
        var _ads = $(this).find(".fl").html();
        _item_address = _ads;
        $(".-v-show-ads").html("[" + _ads + "]");
        if ($(".pop-add-eat").is(":hidden")) {
            $(".pop-add-eat, .pop-show-address").slideUp();
            $(".pop").fadeOut("fast");
        } else {
            $(".pop-show-address").slideUp();
        }
    });

    $(".J-init-add").click(function () { // 开始添加菜品
        $(".pop").fadeIn("fast");
        $(".pop-add-eat").slideDown();
    });

    $(".pop").click(function () { // 点击遮罩层，关闭添加窗口
        $(".pop-add-eat, .pop-show-address").slideUp();
        $(".pop").fadeOut("fast");
    });

    $(".J-add-eat").click(function () { // 确认添加
        var _address = $(".-i-address").val();
        var _eat = $(".-i-eat").val().split(["，"]);
        if (_eat.length < 1 || _eat == "") {
            alert("请输入菜品");
            return false;
        }

        _address = _address.split("，");
        var _address_array = JSON.parse(localStorage.getItem("ADDRESS"));
        for (var i = 0; i < _address.length; i++) {
            if ($.inArray(_address[i], _address_array) == -1 && _address[i] != "") {
                _address_array.push(_address[i]);
            }

            var _ads_eat_array = null;
            if (!localStorage.getItem(_address[i])) {
                if (_eat.length > 1) {
                    localStorage.setItem(_address[i], JSON.stringify(_eat));
                } else {
                    localStorage.setItem(_address[i], "");
                }
            } else {
                _ads_eat_array = JSON.parse(localStorage.getItem(_address[i]));
                for (var j = 0; j < _eat.length; j++) {
                    if ($.inArray(_eat[j], _ads_eat_array) == -1 && _eat[j] != "") {
                        _ads_eat_array.push(_eat[j]);
                    }
                }
                localStorage.setItem(_address[i], JSON.stringify(_ads_eat_array));
            }
        }
        localStorage.setItem("ADDRESS", JSON.stringify(_address_array));
        $(".pop-add-eat").slideUp();
        $(".pop").fadeOut("fast");
    });
});