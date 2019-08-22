

Component({
  properties: {
    min: {
      type: Number,
      value: 0
    },
    min: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
      }
    },
    lastLeaf: {
      // 这个属性可以是 Number 、 String 、 Boolean 三种类型中的一种
      type: Number,
      optionalTypes: [String, Object],
      value: 0
    }
  }
})