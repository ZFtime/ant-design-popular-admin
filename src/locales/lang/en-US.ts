import enUS from 'ant-design-vue/es/locale/en_US'
import momentENUS from 'moment/locale/eu'

export default {
  antLocale: enUS,
  momentName: 'eu',
  momentLocale: momentENUS,
  user: {
    welcome: {
      title: 'I love the color!',
      desc: 'It\'s a elegent templete. I love it very much! .',
      account: 'Hyper Admin User'
    },
    login: {
      title: 'Sign In',
      desc: 'Enter your email address and password to access account.',
      email: {
        label: 'Email address',
        placeholder: 'Enter your email',
        regexMessage: 'Enter your email'
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your Password',
        regexMessage: 'Enter your Password'
      },
      remember: 'Remember me',
      forget: 'Forget your password？',
      submit: 'Sign in',
      loginMode: 'Sign in with',
      notAccount: 'Don\'t have an account？',
      register: 'Register'
    },
    register: {
      welcome: {
        title: 'I love the color!',
        desc: 'It\'s a elegent templete. I love it very much! .',
        account: 'Hyper Admin User'
      },
      title: 'Free Sign Up',
      desc: 'Don\'t have an account? Create your account, it takes less than a minute',
      username: {
        label: 'Full Name',
        placeholder: 'Enter your name',
        regexMessage: 'Enter your name'
      },
      email: {
        label: 'Email address',
        placeholder: 'Entry  your email',
        regexMessage: 'Entry  your email'
      },
      password: {
        label: 'Password',
        placeholder: 'Entry your password',
        regexMessage: 'Entry your password'
      },
      remember: 'I accept Terms and Conditions',
      submit: 'Sign Up',
      registerMode: 'Sign up using',
      notAccount: 'Already have account? ',
      login: 'Login in'
    },
    forget: {
      title: 'Reset Password',
      desc: 'Enter your email address and we\'ll send you an email with instructions to reset your password.',
      email: {
        label: 'Email address',
        placeholder: 'Enter your email',
        regexMessage: 'Enter your email'
      },
      submit: 'Reset Password',
      back: 'Back to',
      backBtn: 'Login in'
    }
  },
  menu: {
    dashboard: {
      default: 'Dashboard',
      analysis: 'Analysis',
      workplace: 'Workplace'
    },
    form: {
      default: 'Form',
      basic: 'Basic Form',
      step: 'Step Form',
      advanced: 'Advanced Form'
    },
    settings: {
      default: 'settings',
      positionManager: 'Position Manager',
      departmentManager: 'Department Manager',
      roleManager: 'Role Manager',
      userManager: 'User Manager',
      dictionaryManager: 'Dictionary Manager',
      logManager: 'Log Manager',
      logActionManager: 'Action Logs',
      logLoginManager: 'Login logs'
    }
  }
}
