var enabled = false;

function updateIcon() {
	if(enabled){
		browser.browserAction.setIcon({path:"icons/volume-off-indicator.svg"});
	}
	else {
		browser.browserAction.setIcon({path:"icons/volume-up-indicator.svg"});
	}
}

function wrapper(id, ci, tab){
	muteTab(tab);
}
function muteTab(tab){
    browser.tabs.update(tab.id, {'muted': true});
}

function toggleMute(){
  enabled = !enabled;
  if(enabled){
	browser.tabs.query({}, result => result.forEach(tab => browser.tabs.update(tab.id, {muted:true})));
	browser.tabs.onCreated.addListener(muteTab);
	browser.tabs.onUpdated.addListener(wrapper);
  }
  else {
	browser.tabs.query({}, result => result.forEach(tab => browser.tabs.update(tab.id, {muted:false})));
	if(browser.tabs.onCreated.hasListener(muteTab)){
		browser.tabs.onCreated.removeListener(muteTab);
	}
	if(browser.tabs.onUpdated.hasListener(wrapper)){
		browser.tabs.onUpdated.removeListener(wrapper);
	}
  }
  updateIcon();
}
browser.browserAction.onClicked.addListener(toggleMute);
updateIcon();