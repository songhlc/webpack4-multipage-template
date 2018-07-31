import ko from 'knockout'
import _ from 'lodash'
import './index.less'
import 'ycloud/dist/ycloud.min.css'
import 'ycloud'
import {applyBinding} from '../../util'
import '../../components'
var defaultArray = []
_.forEach([1,2,3,4,5,6,7,8], function (key) {
  defaultArray.push({
    id: key,
    name: Math.random()
  })
})
var vm = {
  name: ko.observable('nameB'),
  defaultArray: ko.observableArray(defaultArray),
  input: ko.observable('tB')
}
applyBinding(vm)
