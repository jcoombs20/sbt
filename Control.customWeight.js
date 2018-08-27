L.Control.customWeight = L.Control.extend({
    options: {
        position: 'topleft',
        collapsed: true
    },

    onAdd: function (map) {
        this._map = map;
        var className = 'leaflet-control-customWeight';
        var container = this._container = L.DomUtil.create('div', className);
        container.id = "prioritization";
        L.DomEvent.disableClickPropagation(container);

        //******Content Div
        var content = L.DomUtil.create('div', className + '-div');
        content.id = "attContent";

        //******Ecological Connectivity
        var weights = L.DomUtil.create('div', className + '-div');
        weights.id = "priorWeights";

        //******Ecological Connectivity
        var core = L.DomUtil.create('div', className + '-div');
        core.id = "core";

        //******Transportation Connectivity 
        var attr = L.DomUtil.create('div', className + '-div');
        attr.id = "attr";

        //******Update 
        var update = L.DomUtil.create('div', className + '-div');
        update.id = "priorUpdate";

        if (this.options.collapsed) {
            L.DomEvent.on(container, 'mouseover', this._expand, this);
            L.DomEvent.on(container, 'mouseout', this._collapse, this);

            var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
            link.href = '#';
            link.title = 'prioritization';

            L.DomEvent.on(link, L.Browser.touch ? 'click' : 'focus', this._expand, this);

            this._map.on('movestart', this._collapse, this);
        } else {
            this._expand();
        }

        content.appendChild(weights);
        content.appendChild(core);
        content.appendChild(attr);
        content.appendChild(update);
        container.appendChild(content);
        return container;
    },

    _expand: function () {
        L.DomUtil.addClass(this._container, 'leaflet-control-customWeight-expanded');
    },

    _collapse: function () {
        L.DomUtil.removeClass(this._container, 'leaflet-control-customWeight-expanded');
    }

});

L.control.customWeight = function (options) {
    return new L.Control.customWeight(options);
};




//******Notify user when metric has been updated
function addAlert(tmpText) {
  d3.select("body")
    .append("div")
    .attr("id", "addWeightContainer")
    .append("div")
    .attr("id", "addWeight")
    .append("p")
    .attr("id", "addWeightP")
    .text(tmpText);

  d3.select("#addWeight")
    .append("button")
    .attr("class", "addWeightButton")
    .text("OK")
    .on("click", function() { d3.select("#addWeightContainer").remove(); });
}




//******Add prioritization html elements
function completePrioritization() {
  //******Add title information
  d3.select("#priorWeights")
    .append("div")
    .append("h4")
    .attr("class", "priorTitle")
    .text("Stream Crossing Attribute Selection")
    .property("title", "Select stream crossing components for potential filtering in 'Charts' during prioritization")
    .append("span")
    .html('<span id="attTT" class="glyphicon glyphicon-info-sign help-tooltip pull-right" data-toggle="tooltip" data-container="#attContent" data-placement="left" title="Stream Crossing Attribute Selection: Enables the user to select stream crossing attributes for viewing in the &apos;Legend&apos; window and potential filtering in the &apos;Charts&apos; window during the prioritization process" data-html="true" data-original-title="<p><u><b><center>Stream Crossing Component Selection</center></b></u></p><p>Enables the user to select stream crossing attributes for viewing in the &apos;Legend&apos; window and potential filtering in the &apos;Charts&apos; window during the prioritization process</p>"></span>');

  //******Add Core Components
  d3.select("#core")
    .append("div")
    .attr("id", "coreComp")
    .append("div")
    .attr("class", "priorHeader1")
    .style("border-right", "1px solid black")
    .property("title", "Select which ecological disruption and transportation system vulnerability measures are available to view and filter during crossing prioritization")
    .append("h4")
    .attr("class", "priorTitle")
    .text("Choose Core Attributes");

  //******Add Crossing Prioritization Score
  d3.select("#core")
    .append("div")
    .attr("id", "crossPrior")
    .append("div")
    .attr("class", "priorHeader2")
    .style("border-right", "1px solid black")
    .property("title", topos.crossings.tooltip.cross_prior)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_cross_prior" type="checkbox" class="priorCheck" value="cross_prior" checked></input><span>' + topos.crossings.title.cross_prior + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_cross_prior"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  //******Add ecological connectivity
  d3.select("#crossPrior")
    .append("div")
    .attr("id", "midLevel")
    .append("div")
    .attr("id", "eco")
    .append("div")
    .attr("class", "priorHeader4")
    .attr("id", "connectEco")
    .property("title", "Options related to ecological disruption score available to view and filter")
    .append("label")
    .attr("class", "priorLabel")
    .html('<span>Ecological Disruption</span>')

  d3.select("#eco")
    .append("div")
    .attr("id", "ecoDiv")
    .append("div")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.int_eco_dis)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_int_eco_dis" type="checkbox" class="attrCheck" value="int_eco_dis" checked></input><span>' + topos.crossings.title.int_eco_dis + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_int_eco_dis"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  d3.select("#ecoDiv")
    .append("div")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.impassability)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_impassability" type="checkbox" class="attrCheck" value="impassability"></input><span>' + topos.crossings.title.impassability + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_impassability"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  d3.select("#ecoDiv")
    .append("div")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.delta_scaled)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_delta_scaled" type="checkbox" class="attrCheck" value="delta_scaled"></input><span>' + topos.crossings.title.delta_scaled + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_delta_scaled"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  d3.select("#ecoDiv")
    .append("div")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.effect_scaled)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_effect_scaled" type="checkbox" class="attrCheck" value="effect_scaled"></input><span>Connectivity Restoration</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_effect_scaled"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  d3.select("#ecoDiv")
    .append("div")
    .attr("class", "priorDiv")
    .property("title", "Potential for improved aquatic connectivity of coldwater streams via crossing replacement")
    .append("label")
    .attr("class", "priorLabel")
    .html('<span id="chk_water_temp" type="checkbox" class="attrCheck glyphicon glyphicon-plus-sign" value="water_temp" data-toggle="collapse" data-target="#coldWaterDiv" onclick="changeGlyph(this)" title="Click to open panel"></span><span>Coldwater Restoration</span>');

  d3.select("#ecoDiv")
    .append("div")
    .attr("id", "coldWaterDiv")
    .attr("class", "collapse")
    .append("div")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.effect_scaled_16)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_effect_scaled_16" type="checkbox" class="attrCheck" value="effect_scaled_16"></input><span>16\xB0 C</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_effect_scaled_16"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  d3.select("#coldWaterDiv")
    .append("div")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.effect_scaled_18)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_effect_scaled_18" type="checkbox" class="attrCheck" value="effect_scaled_18"></input><span>18\xB0 C</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_effect_scaled_18"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  d3.select("#coldWaterDiv")
    .append("div")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.effect_scaled_20)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_effect_scaled_20" type="checkbox" class="attrCheck" value="effect_scaled_20"></input><span>20\xB0 C</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_effect_scaled_20"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });
  





  //******Transportation Connectivity
  d3.select("#midLevel")
    .append("div")
    .attr("id", "transport")
    .append("div")
    .attr("class", "priorHeader3")
    .attr("id", "connectTrans")
    .property("title", topos.crossings.tooltip.trans_vuln)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_trans_vuln" type="checkbox" class="priorCheck" value="trans_vuln" checked></input><span>' + topos.crossings.title.trans_vuln + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_trans_vuln"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });


  //******Disruption
  d3.select("#transport")
    .append("div")
    .attr("id", "transDiv")
    .append("div")
    .attr("id", "disrupt")
    .append("div")
    .property("title", "Options related to emergency service disruption score available to view and filter")
    .attr("class", "priorHeader4")
    .append("label")
    .attr("class", "priorLabel")
    .html('<span>Emergency Service Disruption</span>');

  d3.select("#disrupt")
    .append("div")
    .attr("id", "disruptInput")
    .append("div")
    .attr("id", "disruptComposite")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.ln_comp_del)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_ln_comp_del" type="checkbox" class="attrCheck" value="ln_comp_del" checked></input><span>' + topos.crossings.title.ln_comp_del + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_ln_comp_del"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });
  
  d3.select("#disruptInput")
    .append("div")
    .attr("id", "disruptMax")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.max_del)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_max_del" type="checkbox" class="attrCheck" value="max_del"></input><span>' + topos.crossings.title.max_del + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_max_del"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  d3.select("#disruptInput")
    .append("div")
    .attr("id", "disruptAve")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.ave_del)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_ave_del" type="checkbox" class="attrCheck" value="ave_del"></input><span>' + topos.crossings.title.ave_del + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_ave_del"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  d3.select("#disruptInput")
    .append("div")
    .attr("id", "disruptAveAff")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.ave_aff_del)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_ave_aff_del" type="checkbox" class="attrCheck" value="ave_aff_del"></input><span>' + topos.crossings.title.ave_aff_del + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_ave_aff_del"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });




  //******Risk of Failure
  d3.select("#transDiv")
    .append("div")
    .attr("id", "rof")
    .append("div")
    .property("title", "Options related to crossing risk of failure score available to view and filter")
    .attr("class", "priorHeader4")
    .append("label")
    .attr("class", "priorLabel")
    .html('<span>Crossing Risk of Failure</span>');

  d3.select("#rof")
    .append("div")
    .attr("id", "rofInput")
    .append("div")
    .attr("id", "rofInputMax")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.max_rof)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_max_rof" type="checkbox" class="attrCheck" value="max_rof" checked></input><span>' + topos.crossings.title.max_rof + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_max_rof"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  d3.select("#rofInput")
    .append("div")
    .attr("id", "rofInputStruct")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.struct_rof)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_struct_rof" type="checkbox" class="attrCheck" value="struct_rof"></input><span>' + topos.crossings.title.struct_rof + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_struct_rof"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  d3.select("#rofInput")
    .append("div")
    .attr("id", "rofInputHydro")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.hydro_rof)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_hydro_rof" type="checkbox" class="attrCheck" value="hydro_rof"></input><span>' + topos.crossings.title.hydro_rof + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_hydro_rof"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });

  d3.select("#rofInput")
    .append("div")
    .attr("id", "rofInputGeo")
    .attr("class", "priorDiv")
    .property("title", topos.crossings.tooltip.geo_rof)
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_geo_rof" type="checkbox" class="attrCheck" value="geo_rof"></input><span>' + topos.crossings.title.geo_rof + '</span>')
    .on("click", function() {var tmpChk = d3.select("#chk_geo_rof"); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });



  //******Attribute selection
  d3.select("#attr")
    .append("div")
    .attr("class", "priorHeader1")
    .append("h4")
    .attr("class", "priorTitle")
    .text("Select Additional Crossing Attributes")
    .property("title", "Choose additional crossing attributes to be added to 'Charts' for prioritization filtering");

  d3.select("#attr")
    .append("div")
    .attr("class", "attrDiv")
    .property("title", "Check to select all below attributes")
    .style("border-bottom", "1px solid black")
    .append("label")
    .attr("class", "priorLabel")
    .html('<input id="chk_all" type="checkbox" class="extraCheck"></input><span>Select All</span>');

  d3.select("#chk_all")
    .on("click", function() { 
      var tmpChk = d3.selectAll(".extraCheck")
      if (this.checked == true) {
        tmpChk.property("checked", true);
        tmpChk[0].forEach(function(d) { topos.crossings.display[d.value] = "yes"; });
      } 
      else {
        tmpChk.property("checked", false);
        tmpChk[0].forEach(function(d) { topos.crossings.display[d.value] = "no"; });
      }
    });

  d3.select("#attr")
    .append("div")
    .attr("id", "attrSelDiv")
    .on("mousewheel", function() { d3.event.stopPropagation(); });
   

  var noDisplay = [];
  topos.crossings.keys.forEach(function(key) {
    if (topos.crossings.display[key] == "no") {
      noDisplay.push(key);
    }
  });

  var tmpDiv = d3.select("#attrSelDiv");
  noDisplay.forEach(function(key) {
    tmpDiv.append("div")
      .attr("class", "attrDiv")
      .property("title", topos.crossings.tooltip[key])
      .append("label")
      .attr("class", "priorLabel")
      .html('<input id="chk_' + key + '" type="checkbox" class="extraCheck" value="' + key + '"></input><span>' + topos.crossings.title[key] + '</span>')
      .on("click", function() { var tmpChk = d3.select("#chk_" + key); if(tmpChk.property("checked") == true) {topos.crossings.display[tmpChk.property("value")] = "yes"; } else {topos.crossings.display[tmpChk.property("value")] = "no"; } });
  });



  //******Updating elements
  d3.select("#priorUpdate")
    .append("hr")
    .attr("class", "priorHR");

  d3.select("#priorUpdate")
    .append("button")
    .text("Update")
    .property("title", "Click to update the 'Legend' and 'Charts' attributes for the Crossings layer to those selected above")
    .attr("class", "priorButton")
    .on("click", function() { updateLegends(topos.crossings); });
}





//******Update legend and chart select boxes
function updateLegends(topo) {
  var display = [];
  topo.keys.forEach(function(key) {
    if (topo.display[key] == "yes") {
      display.push(key);
    }
  });

  var tmpOpts = d3.select("#" + topo.class + "Select").selectAll("option")
    .data(display);

  tmpOpts.exit()
    .remove();
  tmpOpts.enter()
    .append("option")
  tmpOpts
    .attr("value", function(d) { return d; })
    .text(function(d) { return topo.title[d]; });

  changeStyle(d3.select("#" + topo.class + "Select").node().value, topo);


 
  if (d3.select("#layerFilterSelect").node().value == topo.class) {
    display.splice(0,0, "...");
    tmpOpts = d3.select("#attributeFilterSelect").selectAll("option")
      .data(display);
      
    tmpOpts.exit()
      .remove();
    tmpOpts.enter()
      .append("option")
    tmpOpts
      .attr("value", function(d) { return d; })
      .text(function(d) { return topo.title[d]; });
  }

  //Edit filter select if attribute graphed is removed
  graphs.forEach(function(graph) {
    if (display.indexOf(graph.split("-")[1]) == -1 && graph.split("-")[0] == topo.class) {
      removeFilter(graph, topo, 1);
    }
  });

  d3.select("#attributeFilterSelect").property("selectedIndex", function() {return 0;})

  addAlert("Selected components have been added to the " + topo.class + " layer options in both the 'Legend' and 'Charts' windows");
}
