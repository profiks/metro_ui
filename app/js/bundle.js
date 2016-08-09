"use strict";

var fadeOnLoad = {

    init: function init() {
        this.pageLoad();
    },

    pageLoad: function pageLoad() {
        if (window.addEventListener) window.addEventListener("load", this.fadeTile, false);else if (window.attachEvent) window.attachEvent("onload", this.fadeTile);

        setTimeout(this.clearTransitionDelay, 500);
    },

    fadeTile: function fadeTile() {

        this.elements = document.getElementsByClassName('tile');

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var tile = _step.value;

                var delay = Math.random() * 0.5 - 0.1;

                tile.style.opacity = '1';
                tile.style.transform = 'scale(1)';
                tile.style.transitionDelay = delay + "s";
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    },

    clearTransitionDelay: function clearTransitionDelay() {

        this.elements = document.getElementsByClassName('tile');

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var tile = _step2.value;

                tile.style.transitionDelay = '0s';
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }

};

fadeOnLoad.init();
'use strict';

var newsFeed = {

    init: function init() {
        this.newsUrl = 'js/news.json';
        this.loadNews();
    },

    loadNews: function loadNews() {
        var _this = this;

        this.newsObj = new XMLHttpRequest();
        this.newsObj.overrideMimeType("application/json");
        this.newsObj.open('GET', this.newsUrl, false);
        this.newsObj.onreadystatechange = function () {
            _this.parseNews(_this.newsObj.response);
        };
        this.newsObj.send(null);
    },

    parseNews: function parseNews(response) {
        var that = this;

        this.news = {};
        this.newsFeed = JSON.parse(response);

        this.actualJSON = this.newsFeed.news;
        this.newsCount = this.actualJSON.length;

        this.actualJSON.forEach(function (item) {

            that.news.header = item.header, that.news.body = item.body, that.news.date = item.date;
            that.news.date = new Date(that.news.date);
            that.news.date = that.news.date.getFullYear() + '-' + (that.news.date.getMonth() + 1) + '-' + that.news.date.getDate();

            that.renderNews(that.news);
        });

        this.slideInterval(this.newsCount);
    },

    sortNews: function sortNews(newsFeed) {},

    renderNews: function renderNews(news) {

        this.output = document.getElementById('newsCard');

        this.content = '<div class="news-feed__content">';

        this.content += '<div class="news-feed__front">';
        this.content += '<h2 class="tile__name">Blog</h2>';
        this.content += '<h3 class="news-feed__header">' + news.header + '</h3>';
        this.content += '<h4 class="news-feed__date">' + news.date + '</h4>';
        this.content += '</div>';

        this.content += '<div class="news-feed__back">';
        this.content += '<h3 class="news-feed__body">' + news.body + '</h3>';
        this.content += '</div>';

        this.content += '</div>';

        this.output.innerHTML += this.content;
    },

    slideInterval: function slideInterval(newsCount) {
        var self = this;
        this.output = document.getElementById('newsCard');
        this.position = 0;
        this.step = 150;
        this.pause = false;

        this.mouveSlider = function () {
            if (!self.pause) {
                self.position += self.step;
                self.output.style.top = '-' + self.position + 'px';

                if (self.position == newsCount * 150 - 150) {
                    self.resetSlider();
                }
            }

            self.pauseSlider();
        };

        this.pauseSlider = function () {
            self.output.addEventListener("mouseover", function () {
                self.pause = true;
            });

            self.output.addEventListener("mouseleave", function () {
                self.pause = false;
            });
        };

        this.resetSlider = function () {
            self.position = 0;
            self.output.style.top = '-' + self.position + 'px';
        };

        this.interval = setInterval(this.mouveSlider, 15000);
    }

};

newsFeed.init();
'use strict';

var tilePressedStates = {

    init: function init() {
        this.cacheDom();
        this.eventListner();
    },

    cacheDom: function cacheDom() {
        this.tile = document.getElementsByClassName('tile');
    },

    eventListner: function eventListner() {

        for (var i = 0; i < this.tile.length; i++) {

            this.tile[i].addEventListener('mousedown', this.addTransform, false);

            this.tile[i].addEventListener('mouseup', this.removeTransform, false);

            this.tile[i].addEventListener("click", this.pauseClick, false);
        }
    },

    addTransform: function addTransform(e) {
        var self = this;

        this.dim = {
            x: e.clientX - this.offsetLeft,
            y: e.clientY - this.offsetTop,
            w: this.offsetWidth,
            h: this.offsetHeight
        };

        this.transform = 'top';

        if (this.dim.x < this.dim.w * 1 / 3 && (this.dim.y < this.dim.h * 1 / 2 || this.dim.y > this.dim.h * 1 / 2)) {

            this.transform = 'left';
        } else if (this.dim.x > this.dim.w * 2 / 3 && (this.dim.y < this.dim.h * 1 / 2 || this.dim.y > this.dim.h * 1 / 2)) {

            this.transform = 'right';
        } else if (this.dim.x > this.dim.w * 1 / 3 && this.dim.x < this.dim.w * 2 / 3 && this.dim.y > this.dim.h / 2) {

            this.transform = 'bottom';
        }

        this.className = this.className.replace(' tile--transform-' + self.transform, "");
        this.className += ' tile--transform-' + self.transform;
    },

    removeTransform: function removeTransform() {
        this.transformLeft = ' tile--transform-left';
        this.transformRight = ' tile--transform-right';
        this.transformTop = ' tile--transform-top';
        this.transformBottom = ' tile--transform-bottom';

        this.className = this.className.replace(this.transformLeft, "");
        this.className = this.className.replace(this.transformRight, "");
        this.className = this.className.replace(this.transformTop, "");
        this.className = this.className.replace(this.transformBottom, "");
    },

    pauseClick: function pauseClick(e) {
        e.stopPropagation();
        e.preventDefault();

        var that = this;

        setTimeout(function () {
            document.location.href = that.getAttribute('href');
        }, 500);
    }

};

tilePressedStates.init();
//# sourceMappingURL=bundle.js.map
