		var index=0;
function loadBallObjFile(url)
		{
		    var req = new XMLHttpRequest();
		    req.onreadystatechange = function () { processBallLoadObj(req,url.split("|")[1]) };
		    req.open("GET", url.split("|")[0], true);
		    req.responseType = "text";
		    req.send(null);
		}
		function processBallLoadObj(req,name)
		{
		    if (req.readyState == 4) 
		    {
		        var objStr = req.responseText;
		        var dataTemp=fromObjStrToObjectData(objStr);	
		        objArr[name]=dataTemp;
                index++;
		    }
		}

        function createObject(){
			if(shaderFlag&&index==2){
                ooTriBall=new ObjObjectBall(gl,objArr["ball"].vertices,objArr["ball"].normals,objArr["ball"].texcoords);
                plane=new ObjObjectPlane(gl,objArr["plane"].vertices,objArr["plane"].texcoords);
                celestial=new Celestial(gl,500,shaderProgArray[1]);
                celestial1=new Celestial(gl,200,shaderProgArray[1]);
			}else{
                setTimeout(function(){createObject();},10);
			}
		}





