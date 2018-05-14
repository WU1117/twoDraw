		function loadBallObjFile(url)
		{
		    var req = new XMLHttpRequest();
		    req.onreadystatechange = function () { processBallLoadObj(req) };
		    req.open("GET", url, true);
		    req.responseType = "text";
		    req.send(null);
		}
		function processBallLoadObj(req)
		{
		    if (req.readyState == 4) 
		    {
		        var objStr = req.responseText;	       
		        var dataTemp=fromObjStrToObjectData(objStr);	
		        objArr.push(dataTemp);
		    }
		}
                function createObject(){
			if(shaderFlag&&objArr.length==2){
                ooTriBall=new ObjObjectBall(gl,objArr[0].vertices,objArr[0].normals,objArr[0].texcoords);
                plane=new ObjObjectPlane(gl,objArr[1].vertices,objArr[1].texcoords);
                celestial=new Celestial(gl,500,shaderProgArray[1]);
                celestial1=new Celestial(gl,200,shaderProgArray[1]);
			}else{
                setTimeout(function(){createObject();},10);
			}
		}


