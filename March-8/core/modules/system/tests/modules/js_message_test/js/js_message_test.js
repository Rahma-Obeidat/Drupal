/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
(function ($, _ref, _ref2) {
  var behaviors = _ref.behaviors;
  var testMessages = _ref2.testMessages;
  var indexes = {};
  testMessages.types.forEach(function (type) {
    indexes[type] = [];
  });
  var messageObjects = {
    default: {
      zone: new Drupal.Message(),
      indexes: indexes
    },
    multiple: []
  };
  messageObjects.default.zone.clear();
  testMessages.selectors.filter(Boolean).forEach(function (selector) {
    messageObjects[selector] = {
      zone: new Drupal.Message(document.querySelector(selector)),
      indexes: indexes
    };
  });
  behaviors.js_message_test = {
    attach: function attach() {
      $(once('messages-details', '[data-drupal-messages-area]')).on('click', '[data-action]', function (e) {
        var $target = $(e.currentTarget);
        var type = $target.attr('data-type');
        var area = $target.closest('[data-drupal-messages-area]').attr('data-drupal-messages-area') || 'default';
        var message = messageObjects[area].zone;
        var action = $target.attr('data-action');
        if (action === 'add') {
          messageObjects[area].indexes[type].push(message.add("This is a message of the type, ".concat(type, ". You be the judge of its importance."), {
            type: type
          }));
        } else if (action === 'remove') {
          message.remove(messageObjects[area].indexes[type].pop());
        }
      });
      $(once('add-multiple', '[data-action="add-multiple"]')).on('click', function () {
        [0, 1, 2, 3, 4, 5].forEach(function (i) {
          messageObjects.multiple.push(messageObjects.default.zone.add("This is message number ".concat(i, " of the type, ").concat(testMessages.types[i % testMessages.types.length], ". You be the judge of its importance."), {
            type: testMessages.types[i % testMessages.types.length]
          }));
        });
      });
      $(once('remove-multiple', '[data-action="remove-multiple"]')).on('click', function () {
        messageObjects.multiple.forEach(function (messageIndex) {
          return messageObjects.default.zone.remove(messageIndex);
        });
        messageObjects.multiple = [];
      });
      $(once('add-multiple-error', '[data-action="add-multiple-error"]')).on('click', function () {
        [0, 1, 2, 3, 4, 5].forEach(function (i) {
          return messageObjects.default.zone.add("Msg-".concat(i), {
            type: 'error'
          });
        });
        messageObjects.default.zone.add("Msg-".concat(testMessages.types.length * 2), {
          type: 'status'
        });
      });
      $(once('remove-type', '[data-action="remove-type"]')).on('click', function () {
        Array.prototype.map.call(document.querySelectorAll('[data-drupal-message-id^="error"]'), function (element) {
          return element.getAttribute('data-drupal-message-id');
        }).forEach(function (id) {
          return messageObjects.default.zone.remove(id);
        });
      });
      $(once('clear-all', '[data-action="clear-all"]')).on('click', function () {
        messageObjects.default.zone.clear();
      });
      $(once('id-no-status', '[data-action="id-no-status"]')).on('click', function () {
        messageObjects.default.zone.add('Msg-id-no-status', {
          id: 'my-special-id'
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);