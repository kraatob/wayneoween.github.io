/*
 * jQuery Double Tap
 * Developer: Sergey Margaritov (sergey@margaritov.net)
 * Date: 22.10.2013
 * Based on jquery documentation http://learn.jquery.com/events/event-extensions/
 */

(function($){

  $.event.special.dbltap = {
    bindType: 'touchend',
    delegateType: 'touchend',

    handle: function(event) {
      var handleObj   = event.handleObj,
          targetData  = jQuery.data(event.target),
          now         = new Date().getTime(),
          delta       = targetData.lastTouch ? now - targetData.lastTouch : 0,
          delay       = delay == null ? 300 : delay;

      if (delta < delay && delta > 30) {
        targetData.lastTouch = null;
        event.type = handleObj.origType;
        ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function(property) {
          event[property] = event.originalEvent.changedTouches[0][property];
        })

        // let jQuery handle the triggering of "dbltap" event handlers
        handleObj.handler.apply(this, arguments);
      } else {
        targetData.lastTouch = now;
      }
    }
  };

})(jQuery);