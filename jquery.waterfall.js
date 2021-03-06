(function($){
	$.fn.extend({
		"waterfall":function(options){
			options=$.extend({
				"flowNum":4,
				"flowWidth":230,
				"defRowNum":2,
				"imgArr":[]
			},options);
			var flowNum=options.flowNum;
			var flowWidth= options.flowWidth;
			var defRowNum=options.defRowNum;
			var imgArr = options.imgArr;
			var imgIndex=0;
			var imgCount=imgArr.length;
			var $document=$(document);
			var $window=$(window);
			var $wrapDiv=this;
			var $flowDiv=$(createFlow());
			$wrapDiv.html($flowDiv);
			$wrapDiv.css("min-height",$window.height());
			$window.scroll(function(){
					if(isScrollBottom()){
						shortFill();
						$wrapDiv.css("min-height",($wrapDiv.height()+20)+"px");
					}
			});
			autoFill();
			function createFlow(){
				var str='<div class="water-flow" style="width:'+flowWidth+'px"></div>';
				return new Array(flowNum+1).join(str);
			}
			function autoFill(){
				for(var i=0;i<defRowNum;i++){
					rowFill();
				}
			}
			function rowFill(){
				for(var i=0;i<flowNum;i++){
					if(imgIndex<imgCount){
						var $imgDiv=$(createImage(imgArr[imgIndex++]));
						$flowDiv.eq(i).append($imgDiv);
						$imgDiv.fadeIn(500);
					}
				}
			}
			function createImage(src){
				return'<div class="water-each"><img src="'+src+'"/></div>';
			}
		
			function shortFill(){
				if(imgIndex<imgCount){
					var $imgDiv=$(createImage(imgArr[imgIndex++]));
					getShortFlow().append($imgDiv);
					$imgDiv.fadeIn(1000);
				}
			}  
			function getShortFlow(){
				var $flowMin=$flowDiv.eq(0);
				$flowDiv.each(function(){
					if($(this).height()<$flowMin.height()){
						$flowMin=$(this);
					}
				});
				return $flowMin;
			}  
			function isScrollBottom(){
				return ($document.scrollTop()+250)>=($document.height()-$window.height());
			}                     
		}
	});
})(jQuery);