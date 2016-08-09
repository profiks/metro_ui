var newsFeed = {
    
    init : function() {
       this.newsUrl = 'js/news.json';
       this.loadNews();
    },
    
    loadNews : function(){
        
        this.newsObj = new XMLHttpRequest();
        this.newsObj.overrideMimeType("application/json");
        this.newsObj.open('GET', this.newsUrl, false);
        this.newsObj.onreadystatechange = () => {
            this.parseNews(this.newsObj.response);
        };
        this.newsObj.send(null); 
        
    },
    
    parseNews : function(response){
        let that = this;
        
        this.news = {}; 
        this.newsFeed = JSON.parse(response);        
        
        this.actualJSON = this.newsFeed.news;
        this.newsCount = this.actualJSON.length;
       
        this.actualJSON.forEach( function (item){ 
                
                that.news.header = item.header,
                that.news.body = item.body,
                that.news.date = item.date;
                that.news.date = new Date(that.news.date);
                that.news.date = that.news.date.getFullYear()+'-' + (that.news.date.getMonth()+1) + '-'+that.news.date.getDate();            
                
                that.renderNews(that.news);
        });
        
        
        this.slideInterval(this.newsCount);
       
    },
    
    sortNews : function(newsFeed){
        
    },
    
    renderNews : function(news){        
        
        this.output = document.getElementById('newsCard'); 
        
        this.content = `<div class="news-feed__content">`;
        
        this.content += `<div class="news-feed__front">`;
        this.content += `<h2 class="tile__name">Blog</h2>`;   
        this.content += `<h3 class="news-feed__header">${news.header}</h3>`;    
        this.content += `<h4 class="news-feed__date">${news.date}</h4>`;                
        this.content += `</div>`; 
        
        this.content += `<div class="news-feed__back">`;
        this.content += `<h3 class="news-feed__body">${news.body}</h3>`;
        this.content += `</div>`; 
        
        this.content += `</div>`; 
                    
        this.output.innerHTML += this.content;
    },
    
    slideInterval : function(newsCount){
        var self = this;
        this.output = document.getElementById('newsCard'); 
        this.position = 0;
        this.step = 150;
        this.pause = false;
        
        this.mouveSlider = function () {             
            if(!self.pause){
                self.position += self.step;
                self.output.style.top = `-${self.position}px`;

                if(self.position == ((newsCount * 150) - 150) ){
                    self.resetSlider();
                } 
            } 
            
            self.pauseSlider();
        };
        
        this.pauseSlider = function(){ 
            self.output.addEventListener("mouseover", () => {
                self.pause = true;
            });
            
            self.output.addEventListener("mouseleave", () => {
                self.pause = false;
            });
        };
        
        this.resetSlider = function(){
            self.position = 0;
            self.output.style.top = `-${self.position}px`;            
        };
       
        
        this.interval = setInterval( this.mouveSlider , 15000);
        
    }
    
    
}

newsFeed.init();