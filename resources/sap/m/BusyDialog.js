/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.BusyDialog");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.BusyDialog",{metadata:{publicMethods:["open","close"],library:"sap.m",properties:{"text":{type:"string",group:"Appearance",defaultValue:null},"title":{type:"string",group:"Appearance",defaultValue:null},"customIcon":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},"customIconRotationSpeed":{type:"int",group:"Appearance",defaultValue:1000},"customIconDensityAware":{type:"boolean",group:"",defaultValue:true},"customIconWidth":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"customIconHeight":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"cancelButtonText":{type:"string",group:"Misc",defaultValue:null},"showCancelButton":{type:"boolean",group:"Appearance",defaultValue:false}},events:{"close":{}}}});sap.m.BusyDialog.M_EVENTS={'close':'close'};jQuery.sap.require("sap.ui.core.Popup");
sap.m.BusyDialog.prototype.init=function(){var t=this;this._$window=jQuery(window);this.oPopup=new sap.ui.core.Popup();(jQuery.os.ios)?this.oPopup.setShadow(true):this.oPopup.setShadow(false);this.oPopup.setModal(true,'sapMBusyBLy');this.oPopup.setAnimations(this.openAnimation,this.closeAnimation);this._fOrientationChange=jQuery.proxy(this._reposition,this);this.oPopup._applyPosition=function(p){t._setDimensions();sap.ui.core.Popup.prototype._applyPosition.call(this,p)};this.oPopup._showBlockLayer=function(){sap.ui.core.Popup.prototype._showBlockLayer.call(this);var b=jQuery("#sap-ui-blocklayer-popup"),B;b.toggleClass("sapMBusyBLy",true);if(!jQuery.os.ios){B=jQuery("#sap-ui-blocklayer-popup-bar");b.css('top','48px');if(B.length===0){var c="sapUiBLy"+(this._sModalCSSClass?" "+this._sModalCSSClass:"")+' sapUiBLyBar';var B=jQuery("<div id=\"sap-ui-blocklayer-popup-bar\" tabindex=\"0\" class=\""+c+"\" style=\"display:block; z-index:"+b.css('z-index')+"; visibility:visible\"></div>");B.appendTo(sap.ui.getCore().getStaticAreaRef())}else{var B=b.next('div');B.css({"z-index":b.css('z-index'),"visibility":"visible"})}}};this.oPopup._hideBlockLayer=function(){var b=jQuery("#sap-ui-blocklayer-popup"),B=jQuery("#sap-ui-blocklayer-popup-bar"),p=this;if(sap.ui.core.Popup.blStack.length>1){sap.ui.core.Popup.prototype._hideBlockLayer.call(p)}else{B.css({'visibility':''});b.toggleClass('sapMBusyBLy',false);b.css("top","");sap.ui.core.Popup.prototype._hideBlockLayer.call(p)}}};
sap.m.BusyDialog.prototype.openAnimation=function(r,R,o){if(jQuery.os.ios){r.css('display','block');r.one("webkitAnimationEnd",function(){o()});r.css('-webkit-animation-name','sapMBusyBounce')}else{o()}};
sap.m.BusyDialog.prototype.closeAnimation=function(r,R,c){c()};
sap.m.BusyDialog.prototype.exit=function(){this.oPopup.close();this.oPopup.destroy();this.oPopup=null;if(this._oLabel){this._oLabel.destroy();this._oLabel=null}if(this._oButton){this._oButton.destroy();this._oButton=null}if(this._busyIndicator){this._busyIndicator.destroy();this._busyIndicator=null}this._$window.unbind("resize",this._fOrientationChange)};
sap.m.BusyDialog.prototype.open=function(){jQuery.sap.log.debug("sap.m.BusyDialog.open called at "+new Date().getTime());var p=this.oPopup;if(p.isOpen()){return this}p.setContent(this);p.attachEvent(sap.ui.core.Popup.M_EVENTS.opened,this._handleOpened,this);p.setPosition("center center","center center",document,"0 0","fit");this._bOpenRequested=true;this._openNowIfPossibleAndRequested();return this};
sap.m.BusyDialog.prototype._openNowIfPossibleAndRequested=function(){if(!this._bOpenRequested){return}if(!document.body||!sap.ui.getCore().isInitialized()){jQuery.sap.delayedCall(50,this,"_openNowIfPossibleAndRequested");return}this._bOpenRequested=false;this.oPopup.open()};
sap.m.BusyDialog.prototype.close=function(){this._bOpenRequested=false;var p=this.oPopup;var e=this.oPopup.getOpenState();if(!(e===sap.ui.core.OpenState.CLOSED||e===sap.ui.core.OpenState.CLOSING)){p.attachEvent(sap.ui.core.Popup.M_EVENTS.closed,this._handleClosed,this);jQuery.sap.log.debug("sap.m.BusyDialog.close called at "+new Date().getTime());p.close();this.fireClose()}return this};
sap.m.BusyDialog.prototype._reposition=function(){var e=this.oPopup.getOpenState();if(!(e===sap.ui.core.OpenState.OPEN)){return}this.oPopup._applyPosition(this.oPopup._oLastPosition)};
sap.m.BusyDialog.prototype._handleOpened=function(){this.oPopup.detachEvent(sap.ui.core.Popup.M_EVENTS.opened,this._handleOpened,this);this._$window.bind("resize",this._fOrientationChange)};
sap.m.BusyDialog.prototype._handleClosed=function(){this.oPopup.detachEvent(sap.ui.core.Popup.M_EVENTS.closed,this._handleClosed,this);this._$window.unbind("resize",this._fOrientationChange)};
sap.m.BusyDialog.prototype._setDimensions=function(){var w=this._$window.height(),$=this.$();$.css({"left":"0px","top":"0px","max-height":w+"px"})};