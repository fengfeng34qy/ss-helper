<template>
  <text v-if="text"
    :class="inverted ? 'badge-' + type + ' badge--' + size + ' badge-inverted' : 'badge-' + type + ' badge--' + size"
    class="badge" @tap="onClick">{{ text }}</text>
</template>

<script>
  export default {
    name: 'AempBadge',
    config: {
      component: true
    },
    props: {
      type: {
        type: String,
        default: 'default'
      },
      inverted: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      },
      size: { 
        type: String,
        default: 'normal'
      }
    },
    methods: {
      onClick() {
        this.$emit('click',{data:"数据"})
      }
    }
  }
</script>

<style scoped>
  @charset "UTF-8";
  .badge {
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    box-sizing: border-box;
    font-size: 24px;
    line-height: 1;
    display: inline-block;
    padding: 6px 12px;
    color: #333;
    border-radius: 200px;
    background-color: #f1f1f1
  }

  .badge.badge-inverted {
    padding: 0 10px 0 0;
    color: #999;
    background-color: transparent
  }

  .badge-primary {
    color: #fff;
    background-color: #007aff
  }

  .badge-primary.badge-inverted {
    color: #007aff;
    background-color: transparent
  }

  .badge-success {
    color: #fff;
    background-color: #4cd964
  }

  .badge-success.badge-inverted {
    color: #4cd964;
    background-color: transparent
  }

  .badge-warning {
    color: #fff;
    background-color: #f0ad4e
  }

  .badge-warning.badge-inverted {
    color: #f0ad4e;
    background-color: transparent
  }

  .badge-error {
    color: #fff;
    background-color: #dd524d
  }

  .badge-error.badge-inverted {
    color: #dd524d;
    background-color: transparent
  }

  .badge--small {
    transform: scale(.8);
    transform-origin: center center
  }
</style>