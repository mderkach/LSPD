export const snack = {
  data () {
    return {
      color: null,
      colors: [
        'purple',
        'info',
        'success',
        'warning',
        'error',
      ],
      top: true,
      bottom: false,
      left: false,
      right: false,
      snackbar: false,
      message: false,
    }
  },
  methods: {
    snack (...args) {
      this.top = false
      this.bottom = false
      this.left = false
      this.right = false
      this.message = false
      for (const loc of args) {
        this[loc] = true
      }

      this.color = args[args.length - 1]
      this.message = args[args.length - 2]
      this.snackbar = true
    },
  },
}
