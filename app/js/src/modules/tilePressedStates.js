export var tilePressedStates = {    
    
    init : function () {
       this.cacheDom();
       this.eventListner();
    },
    
    cacheDom : function () {       
        this.tile = document.getElementsByClassName('tile');        
    },
    
    eventListner : function(){
        
        this.clickStart = ('ontouchstart' in window ? 'touchstart' : 'mousedown');
        this.clickEnd = ('ontouchstart' in window ? 'touchend' : 'mouseup');
        
        
        for (var i = 0; i < this.tile.length; i++) {
            
            this.tile[i].addEventListener(this.clickStart, this.addTransform, false);
            
            this.tile[i].addEventListener(this.clickEnd, this.removeTransform, false);
            
            this.tile[i].addEventListener("click", this.pauseClick, false);
        }
        
        
    },
    
    addTransform : function (e)  {              
        let self = this;
        
        this.client = ('ontouchstart' in window ? 'mobile' : 'pc');        
        this.dev = e;
        
        if(this.client == 'mobile'){
            this.dev = e.touches[0];
        }
        
        this.dim = {
            x : this.dev.clientX - this.offsetLeft,
            y : this.dev.clientY - this.offsetTop,
            w : this.offsetWidth,
            h : this.offsetHeight
        };
                
        this.transform = 'top';
        
        if( this.dim.x < this.dim.w * 1/3 && (this.dim.y < this.dim.h * 1/2 || this.dim.y > this.dim.h * 1/2 ) ) {
           
            this.transform = 'left';
           
        } else if ( this.dim.x > this.dim.w * 2/3 && (this.dim.y < this.dim.h * 1/2 || this.dim.y > this.dim.h * 1/2 ) ){
            
            this.transform = 'right';
            
        } else if (this.dim.x > this.dim.w * 1/3 && this.dim.x < this.dim.w * 2/3 && this.dim.y > this.dim.h / 2) {
            
            this.transform = 'bottom';
            
        }
        
        
            
        this.className = this.className.replace(` tile--transform-${self.transform}`,""); 
        this.className += ` tile--transform-${self.transform}`; 
        
    },
    
    removeTransform : function() {
         this.transformLeft = ' tile--transform-left';
         this.transformRight = ' tile--transform-right';
         this.transformTop = ' tile--transform-top';
         this.transformBottom = ' tile--transform-bottom';
        
         this.className = this.className.replace(this.transformLeft,"");
         this.className = this.className.replace(this.transformRight,"");
         this.className = this.className.replace(this.transformTop,"");
         this.className = this.className.replace(this.transformBottom,"");
    },
    
    pauseClick : function(e){
        e.stopPropagation();
        e.preventDefault();
        
        var that = this;
                
        setTimeout( () => {
            document.location.href = that.getAttribute('href');
        }, 500)
    }
    
};








