import zhCN from 'ant-design-vue/es/locale/zh_CN'
import momentZHCN from 'moment/locale/zh-cn'

export default {
  antLocale: zhCN,
  momentName: 'zh-en',
  momentLocale: momentZHCN,
  user: {
    welcome: {
      title: '我喜欢这种颜色！',
      desc: '这是一个优雅的后台模板。我非常爱它！。',
      account: '超级管理员用户'
    },
    login: {
      title: '登录',
      desc: '输入您的电子邮件地址和密码以访问帐户。',
      email: {
        label: '电子邮箱地址',
        placeholder: '请输入电子邮箱地址',
        regexMessage: '请输入电子邮箱地址'
      },
      password: {
        label: '密码',
        placeholder: '请输入密码',
        regexMessage: '请输入密码'
      },
      remember: '记住账号',
      forget: '忘记密码？',
      submit: '登录',
      loginMode: '其他登录方式',
      notAccount: '还没有账号？',
      register: '注册'
    },
    register: {
      welcome: {
        title: '我喜欢这种颜色！',
        desc: '这是一个优雅的后台模板。我非常爱它！。',
        account: '超级管理员用户'
      },
      title: '免费注册',
      desc: '还没有帐号？创建您的帐户，只需不到一分钟的时间。',
      username: {
        label: '名称',
        placeholder: '请输入您的名称',
        regexMessage: '请输入您的名称'
      },
      email: {
        label: '电子邮箱地址',
        placeholder: '请输入电子邮箱地址',
        regexMessage: '请输入电子邮箱地址'
      },
      password: {
        label: '密码',
        placeholder: '请输入密码',
        regexMessage: '请输入密码'
      },
      remember: '我接受条款和条件',
      submit: '立即注册',
      registerMode: '其他注册方式',
      notAccount: '已有账号？',
      login: '登录'
    },
    forget: {
      title: '重置密码',
      desc: '输入您的电子邮件地址，我们将向您发送一封电子邮件，其中包含重设密码的说明。',
      email: {
        label: '电子邮件地址',
        placeholder: '请输入您的电子邮箱',
        regexMessage: '请输入您的电子邮箱'
      },
      submit: '重置密码',
      back: '返回',
      backBtn: '登录'
    }
  },
  menu: {
    dashboard: {
      default: '仪表盘',
      analysis: '监控台',
      workplace: '工作台'
    },
    form: {
      default: '表单页',
      basic: '基础表',
      step: '分布表单',
      advanced: '高级表单'
    },
    settings: {
      default: '系统设置',
      positionManager: '职位管理',
      departmentManager: '部门管理',
      roleManager: '角色管理',
      userManager: '用户管理',
      dictionaryManager: '字典管理',
      logManager: '日志管理',
      logActionManager: '操作日志',
      logLoginManager: '登录日志'
    }
  }
}
