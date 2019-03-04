<template>
  <el-container class="main">
    <el-aside :width="menuWidth+'px'">
      <div class="webTit">
         <span v-show="logoClass==false"><label style="color: #a1b2c5">XXX </label>管理系统</span>
        <img v-show="logoClass==true" src="../assets/img/logo-white.png" alt="">
      </div>
      <el-menu :class="'menu'"
               :default-active="navActive"
               :active ="navActive"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse"
               background-color="#324057"
               text-color="#a1b2c5"
               active-text-color="#2098ef"
               router>
        <NavMenu :navMenus="navData"></NavMenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="main-header">
        <i class="fa fa-bars fa-lg cl-pointer" style="color: #a1b2c5;line-height: 60px" @click="isClossTabFun"></i>
        <el-dropdown trigger="click">
           <span class="el-dropdown-link">
                <img src="../assets/img/head.jpg" alt="">
             </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push({name:'LoginIndex'})">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <div>
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer class="main-footer">
        版权所有：四川府星仪表有限公司 版本 V1.0.3
      </el-footer>
    </el-container>
  </el-container>

</template>

<script>
  import NavMenu from "../views/NavMenu.vue";

  export default {
    components: {
      NavMenu: NavMenu
    },
    data () {
      return {
        navActive:this.$route.path || '',
        logoClass:false,//网站logo
        isCollapse: false,//折叠菜单flag
        menuWidth: 200,
        intelval: null,
        navData:[
          {
              path:'homePage',
              name:'系统首页',
              icon: 'el-icon-tickets',
          },
          {
              path:'PersonManage',
              name:'人员管理',
              icon: 'el-icon-setting',
              children:[
                {
                  path:'registerMange',
                  name:'登记管理',
                  icon: 'el-icon-location',
                },
                {
                  path:'paymentManage',
                  name:'缴费管理',
                  icon: 'el-icon-view',
                },
                {
                  path:'single',
                  name:'单个登记',
                  icon: 'el-icon-tickets',
                  children:[
                    {
                      path:'singleMange',
                      name:'单个登记内页',
                      icon: 'el-icon-location'
                    }
                  ]
                }
              ]
          }
        ]//模拟导航数据
      };
    },
    methods: {
      handleOpen (key, keyPath) {
      },
      handleClose (key, keyPath) {
      },
      isClossTabFun () {//menu伸缩
     /*   clearInterval(this.intelval)
        if (!this.isCollapse) {
          this.intelval = setInterval(() => {
            if (this.menuWidth <= 64) {
              clearInterval(this.intelval)
              this.logoClass = !this.logoClass
            }
            this.menuWidth -= 1
          }, 1)
        } else {
          this.menuWidth = 200
          this.logoClass = !this.logoClass
        }*/
        this.isCollapse = !this.isCollapse
        setTimeout(()=>{this.isCollapse ? this.menuWidth = 63 : this.menuWidth = 200;this.logoClass = !this.logoClass},300)
      }
    }
  }
</script>
<style scoped lang="less" >
  @header-height: 60px;
  @background-color: #324057;
  @color: #a1b2c5;
  .main {
    height: 100vh;
    min-width: 800px;
    min-height: 600px;
    overflow: hidden;
    .webTit{
      width: 100%;height: 60px;text-align: center;overflow: hidden;
      background: #1f2d3d;color: #409EFF;font: bold 18px/60px -webkit-pictograph;
      img{width: inherit;vertical-align: middle;margin-top: -10px;}
    }
    aside {
      overflow: hidden;
      height: 100%;
      background-color: @background-color;
      color: @color;
      .menu {
        width: 100%;
        border-right: 0;
        .el-submenu__title i, .el-menu-item i {
          color: #a1b2c5;
        }
      }
    }
    .main-header {
      background-color: #1f2d3d;
      color: @color;
      border-left: solid 1px #324057;
      .el-dropdown {
        cursor: pointer;
        float: right;
      }
      .el-dropdown-link {
        img {
          @imgMargin: ((@header-height - 40)/2);
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 25px;
          background-color: #FFF;
          margin-top: @imgMargin;
        }
      }
    }
    .main-footer {
      height: 40px !important;
      text-align: center;
      color: #6b7075;
      line-height: 50px;
      font: normal 12px/40px "microsoft yahei";
      /*background: #eee;*/
    }
  }
</style>

