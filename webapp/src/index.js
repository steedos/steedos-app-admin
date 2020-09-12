import React from 'react';

import HelloWorld from './pages/HelloWorld';


FlowRouter.route('/hello/:world', {
  action: function(params) {
      BlazeLayout.render("creatorLayout", {main: HelloWorld});
  }
});
