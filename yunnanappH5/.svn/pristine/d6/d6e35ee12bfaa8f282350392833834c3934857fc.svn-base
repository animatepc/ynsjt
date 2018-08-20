export function addClass(el,className){
	if(hasClass(el,className)){
		return
	}
	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className =newClass.join(' ')
}

export function hasClass(el,className){
	let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
	return reg.test(el.className)
}

export function getData(el,name,val){
	let Name = 'data-'
	let Class_Name = Name+name
	if(val){
		return el.setAttribute(Class_Name,val)
	}else{
		return el.getAttribute(Class_Name)
	}
}

const DomStyle = document.createElement('div').style

const vendor =(()=>{
	let transformNames = {
		webkit:'webkitTransform',
		Moz:'MozTransform',
		O:'OTransform',
		ms:'msTransform',
		standard:'transform'
	}
	
	for(var item in transformNames){
		if(DomStyle[transformNames[item]] !== undefined){
			return item
		}
	}
	return false
})()

export function prefixStyle(style){
	if(vendor === false){
		return false
	}
	
	if(vendor === 'standard'){
		return style
	}
	
	return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
