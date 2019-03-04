<template>
  <div id="navMenu">
    <template v-for="item in navMenus">
      <!--多级导航-->
      <el-submenu v-if="item.children"
                  :key="item.path"  :index="item.path">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </template>

        <!--是否有三级导航-->
         <template v-for="itemInner in item.children">
           <!--有第三级导航-->
           <el-submenu v-if="itemInner.children"
                       :key="itemInner.path"  :index="itemInner.path">
             <template slot="title">
               <i :class="itemInner.icon"></i>
               <span slot="title">{{itemInner.name}}</span>
             </template>
             <el-menu-item v-for="itemInnerInner in itemInner.children" :key="itemInnerInner.path" :index="'/'+item.path + '/' +itemInner.path + '/' +itemInnerInner.path">{{itemInnerInner.name}}</el-menu-item>
           </el-submenu>
            <!--无第三极导航-->
           <el-menu-item v-else :key="itemInner.path" :index="'/'+item.path + '/' +itemInner.path">{{itemInner.name}}</el-menu-item>
         </template>
      </el-submenu>

      <!-- 有且仅有一级导航 -->
      <el-menu-item v-else
                    :key="item.path"  :index="'/'+item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  export default  {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {
      }
    },
    methods: {}
  }
</script>
<style>
  .el-menu--collapse >#navMenu>.el-menu-item [class^="el-icon-"], .el-menu--collapse >#navMenu>.el-submenu > .el-submenu__title [class^="el-icon-"] {
    margin: 0;
    vertical-align: middle;
    width: 24px;
    text-align: center;
  }
  .el-menu--collapse >#navMenu>.el-menu-item span, .el-menu--collapse >#navMenu>.el-submenu > .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  #navMenu .el-menu--collapse >#navMenu>.el-menu-item .el-submenu__icon-arrow, .el-menu--collapse >#navMenu> .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
</style>
