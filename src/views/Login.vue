<template>
  <div class="fullContainer loginContainer">
    <el-form ref="formLoginInfo" :rules="rules" :model="formLoginInfo" label-width="80px" class="formBox">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="formLoginInfo.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input  type="password" v-model="formLoginInfo.passWord" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="yzCode">
        <el-row :gutter="10" type="flex">
          <el-col :span="14">
            <el-input v-model="formLoginInfo.yzCode" placeholder="验证码"  ></el-input>
          </el-col>
          <el-col :span="8">
            <canvas id="mycanvas" width='85' height='40' style="" @click="getCanvas">您的浏览器不支持canvas，请换个浏览器试试~</canvas>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('formLoginInfo')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        formLoginInfo:{
          code:'',
          yzCode:'',
          userName :'',
          passWord :''
        },
        rules: {
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
          yzCode: [
            { required: true, message: '验证码不能为空', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      getCanvas: function(){//动态绘验证码
        var mycanvas = document.getElementById('mycanvas');
        this.formLoginInfo.code = this.rand()
        var cxt = mycanvas.getContext('2d');
        cxt.fillStyle = "#f5f5f5";
        cxt.fillRect(0, 0, 120, 40);
        cxt.fillStyle = "#ff7875";
        cxt.font = 'bold 24px 微软雅黑 ';
        cxt.fillText(this.formLoginInfo.code, 15, 27); //把rand()生成的随机数文本填充到canvas中
        /!*生成干扰线20条*!/
        for (var j = 0; j < 15; j++) {
          cxt.strokeStyle = '#ffc069';
          cxt.beginPath(); //若省略beginPath，则每点击一次验证码会累积干扰线的条数
          cxt.moveTo(this.lineX(), this.lineY());
          cxt.lineTo(this.lineX(), this.lineY());
          cxt.lineWidth = 0.5;
          cxt.closePath();
          cxt.stroke();
        }
      },
      rand: function (){ /*生成4位随机数用于验证码code*/
        var str = "abcdefghijklmnopqrstuvwxyz0123456789";
        var arr = str.split("");
        var validate = "";
        var ranNum;
        for (var i = 0; i < 4; i++) {
          ranNum = Math.floor(Math.random() * 36); //随机数在[0,35]之间
          validate += arr[ranNum];
        }
        return validate;
      },
      /*干扰线的随机x坐标值*/
      lineX: function(){
        var ranLineX = Math.floor(Math.random() * 90)
        return ranLineX
      },
      /*干扰线的随机y坐标值*/
      lineY:function (){
        var ranLineY = Math.floor(Math.random() * 40)
        return ranLineY
      },
      login:function (formLoginInfo) {//表单提交
        this.$refs[formLoginInfo].validate((valid) => {//验证
          if (valid) {
            if(this.formLoginInfo.code==this.formLoginInfo.yzCode){
              this.$router.push({path: '/home'});
            }else{
              this.$message({
                message: '验证码不匹配',
                type: 'error',
                duration: 1000
              });
              this.getCanvas();
            }
          } else {
            this.getCanvas();
            return false;
          }
        });
      }
    },
    mounted () {
      this.getCanvas();
      this.axios.get(`${this.common.basePath}/nidaye`,{'id':'0001'})
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

  }
</script>

