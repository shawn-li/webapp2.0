
(function($){
    var windowWidth=$(window).width();
    if (windowWidth<320) {
        windowWidth=320;
    }else if(windowWidth>1300){
        windowWidth=windowWidth*0.6;
    }
    //console.log(windowWidth);
    $('.container').css('width', windowWidth+'px');

    $("#login_form").validate({  
        rules: {  
            username: "required",  
            password: {  
                required: true,  
                minlength: 5  
            },  
        },  
        messages: {  
            username: "请输入姓名",  
            password: {  
                required: "请输入密码",  
                minlength: jQuery.validator.format("密码不能小于{0}个字符")  
            },  
        }  
    });  
    $("#register_form").validate({  
        rules: {  
            username: {
                "required":true,
                 minlength: 5
            },
            password: {  
                required: true,  
                minlength: 5  
            },  
            rpassword: {  
                equalTo: "#register_password"  
            },  
            email: {  
                required: true,  
                email: true  
            }  
        },  
        messages: {  
            username: {
                required:"请输入姓名",
                minlength:jQuery.validator.format("密码不能小于{0}个字符")  
            },  
            password: {  
                required: "请输入密码",  
                minlength: jQuery.validator.format("密码不能小于{0}个字符")  
            },  
            rpassword: {  
                equalTo: "两次密码不一样"  
            },  
            email: {  
                required: "请输入邮箱",  
                email: "请输入有效邮箱"  
            }  
        }  
    });  
    $("#register_btn").click(function() {  
        $("#register_form").css("display", "block");  
        $("#login_form").css("display", "none");  
    });  
    $("#back_btn").click(function() {  
        $("#register_form").css("display", "none");  
        $("#login_form").css("display", "block");  
    }); 
    $('#login').click(function(e){
        console.log($('#username').val());
        event.preventDefault();
        $.ajax({  
                type: "GET",  
                url:"/admin/user",  
                data:{username:$('#username').val()},// 序列化表单值  
                async: false,  
                error: function(request) {  
                    alert("Connection error");  
                },  
                success: function(data) {  
                    console.log('success');
                    //window.location.href="跳转页面"  
                }  
            });  
        //return false;
    });
    $("#register").click(function(e){
        // console.log($("#register_form").serialize());
        // $("#register_form").submit();
        event.preventDefault();
        console.log(1);
        $.ajax({  
                type: "POST",  
                url:"/admin",  
                data:{
                    register_username:$('#register_username').val(),
                    register_password:$('#register_password').val()
                },
                // $('#register_form').serialize()// 序列化表单值  
                async: false,  
                error: function(request) {  
                    alert("Connection error");  
                },  
                success: function(data) {  
                    console.log(data);
                    //window.location.href="跳转页面"  
                }  
            });  
        return false;
     });
})(jQuery);








