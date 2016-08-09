var fadeOnLoad = {    

    init : function(){
        this.pageLoad();
    },
    
    pageLoad : function () {
        if (window.addEventListener)
        window.addEventListener("load", this.fadeTile, false);
        else if (window.attachEvent)
        window.attachEvent("onload", this.fadeTile);
        
        setTimeout(this.clearTransitionDelay, 500);
    },

    fadeTile : function() {

        this.elements =  document.getElementsByClassName('tile'); 

        for (let tile of this.elements) {            
            let delay = Math.random() * 0.5 - 0.1;
                
            tile.style.opacity='1';
            tile.style.transform = 'scale(1)';            
            tile.style.transitionDelay = `${delay}s`;
        }
        
       
    },
    
    clearTransitionDelay : function() {
        
        this.elements =  document.getElementsByClassName('tile');
        
        for (let tile of this.elements) {             
            tile.style.transitionDelay = '0s';
        }
        
    }

 }; 


fadeOnLoad.init();
