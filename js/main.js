let curent_hover;
let ar_href = document.querySelectorAll(".mainMenu a[href*='popup'], .popup2, .popup1 ");

function resetPopup(){
    let a_ref = document.querySelector(`.mainMenu li:nth-child(${curent_hover}) a`);
    a_ref.style['backgroundPositionX'] ='0';
    a_ref.style['backgroundPositionY'] ='100%';
    a_ref.style['transform'] = `scale(.9)`;
    a_ref = Array.from(document.querySelectorAll(`.popup_menu, .popup${curent_hover}`));
    for ( let i of a_ref) i.style['display'] = 'none';    
    curent_hover = null;
}

let popupMenu = function( el ) {    
    el.preventDefault(); //el.stopImmediatePropagation();
    let popup = document.querySelector('.popup_menu'); 
    let rect = document.querySelector('.popup_menu').getBoundingClientRect();
    let a_ref = Array.from(document.querySelectorAll('.mainMenu a'));
    let r = a_ref[0].getBoundingClientRect();
    switch (el.type){
        case 'mouseover': 
            if (curent_hover) 
                if ( a_ref.indexOf(el.target)>-1 )
                    if (a_ref.indexOf(el.target) +1 !== curent_hover )  
                    resetPopup();
            if (a_ref.indexOf(el.target)>-1) curent_hover = a_ref.indexOf(el.target) +1; 
                //if (curent_hover && curent_hover !== a_ref.indexOf(el.target) +1)  resetPopup();                
            if ( (a_ref.indexOf(el.target)>-1) ||  ( a_ref.indexOf(el.relatedTarget)>-1 &&  el.clientY> r.top + r.height)) {
                let popup_index = document.querySelector(`.popup${curent_hover}`);
                popup.style['display'] = 'inline-block';
                popup.style['opacity'] = 1; popup.style     ['width'] = '100%';      
                popup_index.style['display'] = "flex"; 
            }
            rect = document.querySelector('.popup_menu').getBoundingClientRect();
            if ( curent_hover) {
                let a = document.querySelector(`.mainMenu li:nth-child(${curent_hover}) a`);
                a.style['backgroundPositionX']='0';
                a.style['backgroundPositionY'] ='0';
                a.style['transform'] = 'scale(1.1)'
            }
            break;            
        case 'mouseout': 
            let a = Array.from(document.querySelectorAll('.popup_menu *'));        
            if (a.indexOf(el.target)>-1) {            
                if ( el.clientY<=rect.y || el.clientY>=rect.top + rect.height) resetPopup();
            }
            else { 
                let r = el.target.getBoundingClientRect();
                if ( (el.clientY< r.top + r.height) || ((el.clientX<r.left ) ||(el.clientX>r.left + r.width)) )
                    resetPopup();
            }
            break;
    };      
};

/*let popupMenu = function( el ) {    
    el.preventDefault(); //el.stopImmediatePropagation();
    let popup = document.querySelector('.popup_menu'); 
    switch (el.type){
        case 'mouseover':                     
            if (curent_hover) { 
                let a = document.querySelector(`.mainMenu li:nth-child(${curent_hover}) a`);
                a.style['backgroundPositionX']='0';
                a.style['backgroundPositionY'] ='0';
                a.style['transform'] = 'scale(1.1)'
            }
            else{  
                let a = Array.from(document.querySelectorAll('.mainMenu a'));
                if ( a.indexOf(el.target)>-1 ) {
                    curent_hover = a.indexOf(el.target) +1;
                    let popup_index = document.querySelector(`.popup${curent_hover}`);
                    popup.style['display'] = 'inline-block';
                    popup.style['opacity'] = 1; popup.style     ['width'] = '100%';      
                    popup_index.style['display'] = "flex"; 
                }
            }
            break;            
        case 'mouseout': 
        let a = Array.from(document.querySelectorAll('.popup_menu *'));
        let rect = document.querySelector('.popup_menu').getBoundingClientRect();
        if (a.indexOf(el.target)>-1) {            
            if ( (el.clientY<=rect.y) || (el.clientY>=(rect.top + rect.height)) ) resetPopup();
        }
        else { 
            let r = el.target.getBoundingClientRect();
            if ( (el.clientY< r.top + r.height) || ((el.clientX<r.left ) ||(el.clientX>r.left + r.width)) )
                resetPopup();

            //a = Array.from(document.querySelectorAll('.mainMenu a'));
            //if (a.indexOf(el.target)>-1) {  }
            
        }
    };      
};*/
Array.from(ar_href).map( (e)=>{    
    e.addEventListener("mouseover",popupMenu);       
    e.addEventListener("mouseout",popupMenu);       
});
