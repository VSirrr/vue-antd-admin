// Inspired by https://github.com/Inndy/vue-clipboard2
import Clipboard from 'clipboard';

export default {
  bind: function(el, binding) {
    if (binding.arg === 'success') {
      el._vClipboard_success = binding.value;
    } else if (binding.arg === 'error') {
      el._vClipboard_error = binding.value;
    } else {
      var clipboard = new Clipboard(el, {
        text: function() {
          return binding.value;
        },
        action: function() {
          return binding.arg === 'cut' ? 'cut' : 'copy';
        },
      });
      clipboard.on('success', function(e) {
        var callback = el._vClipboard_success;
        callback && callback(e);
      });
      clipboard.on('error', function(e) {
        var callback = el._vClipboard_error;
        callback && callback(e);
      });
      el._vClipboard = clipboard;
    }
  },
  update: function(el, binding) {
    if (binding.arg === 'success') {
      el._vClipboard_success = binding.value;
    } else if (binding.arg === 'error') {
      el._vClipboard_error = binding.value;
    } else {
      el._vClipboard.text = function() {
        return binding.value;
      };
      el._vClipboard.action = function() {
        return binding.arg === 'cut' ? 'cut' : 'copy';
      };
    }
  },
  unbind: function(el, binding) {
    if (binding.arg === 'success') {
      delete el._vClipboard_success;
    } else if (binding.arg === 'error') {
      delete el._vClipboard_error;
    } else {
      el._vClipboard.destroy();
      delete el._vClipboard;
    }
  },
};
