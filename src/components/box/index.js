import ko from 'knockout'
import './index.less'
function init (params) {
}
ko.components.register('mybox', {
  viewModel: init,
  template: '<div class="box"><!-- ko template: { nodes: $componentTemplateNodes } --><!-- /ko --></div>'
})