var tilePressedStates = {    
    
    init : function () {
       this.cacheDom();
       this.eventListner();
    },
    
    cacheDom : function () {       
        this.tile = document.getElementsByClassName('tile');        
    },
    
    eventListner : function(){
        
        for (var i = 0; i < this.tile.length; i++) {
            
            this.tile[i].addEventListener('mousedown', this.addTransform, false);
            
            this.tile[i].addEventListener('mouseup', this.removeTransform, false);
            
            this.tile[i].addEventListener("click", this.pauseClick, false);
        }
        
        
    },
    
    addTransform : function (e)  {              
        let self = this;
                
        this.dim = {
            x : e.clientX - this.offsetLeft,
            y : e.clientY - this.offsetTop,
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


tilePressedStates.init();







