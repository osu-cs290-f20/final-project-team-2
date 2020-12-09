(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['task'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"task\" data-time=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":1,"column":29},"end":{"line":1,"column":37}}}) : helper)))
    + "\" data-points=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"points") || (depth0 != null ? lookupProperty(depth0,"points") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"points","hash":{},"data":data,"loc":{"start":{"line":1,"column":52},"end":{"line":1,"column":62}}}) : helper)))
    + "\">\r\n    <div class=\"task-info-div\">\r\n        <input type=\"checkbox\" id=\"task-check\"> <span id=\"task-description\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":76},"end":{"line":3,"column":85}}}) : helper)))
    + "</span> <span id=\"task-points\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"points") || (depth0 != null ? lookupProperty(depth0,"points") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"points","hash":{},"data":data,"loc":{"start":{"line":3,"column":116},"end":{"line":3,"column":126}}}) : helper)))
    + "</span>\r\n    </div>\r\n</div>";
},"useData":true});
})();