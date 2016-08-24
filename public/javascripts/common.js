/**
 * 修改jQuery.validate的默认设置参数
 * 加入bootstrap样式相关内容
 */
$.validator.setDefaults({
    errorElement: 'span',
    errorClass: 'help-block',
    ////结合bootstrap实现效果
    highlight: function (element) {
        /////closest() 方法获得匹配选择器的第一个祖先元素
        $(element).closest('.form-group').addClass('has-error');
    },
    success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
    },
    errorPlacement: function (error, element) {
        element.parent('div').append(error);
    }
});

// 手机号码验证
$.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

$(function(){
    $.getJSON('/admin/getLoginedUser',function(res){
        $('#adminUserAvatar').attr("src",res.data.avatar)
        $('#adminUserAvatar').attr("alt",res.data.adminUserName)
        $('#adminUserName').text(res.data.user_name)
    })

    $('#logOut').click(function(){
        $.removeCookie('user',{path:'/'})
        window.location.reload()
    })
})
