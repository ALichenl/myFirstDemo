<template>
  <div id="app" class="fullContainer">
    <!-- 根据需要显示不同的布局情况 -->
    <component :is="layout"></component>
  </div>
</template>

<script>
  import BlankLayout from "./layout/BlankLayout.vue";
  import NavLayout from "./layout/NavLayout.vue"

  export default {
    props: {
      layout: {
        type: String,
        default: 'nav-layout'
      }
    },
    components: {
      "nav-layout":   NavLayout,
      "blank-layout": BlankLayout
    },
    watch: {
      "$route": {
        handler (to, from) {
          // this.loading = true
          if(from.path) {
            this.$nextTick(() => {
              this.loading = false
            })
           sessionStorage.setItem("historyName", from.name)
          }
        },
        deep: true
      }
    },
    data() {
      return {}
    }
  }
</script>
