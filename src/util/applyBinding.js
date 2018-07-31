import ko from 'knockout'
export const applyBinding = function (vm, el) {
  ko.applyBindings(vm, document.getElementById(el || 'app'))
}