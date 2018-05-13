//加载的用于绘制的3D物体
	    function ObjObjectBall
	    (
	       gl,						  //GL上下文
	       vertexDataIn,    //顶点坐标数组
	       vertexNormalIn,   //顶点法向量数组
	       vertexTexCoorIn	//顶点纹理坐标数组
	    )
	    {
	    	  //接收顶点数据
	    	  this.vertexData=vertexDataIn;
	    	  //得到顶点数量
	    	  this.vcount=this.vertexData.length/3;
	    	  //创建顶点数据缓冲
	    	  this.vertexBuffer=gl.createBuffer();
	    	  //将顶点数据送入缓冲
          gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
          gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexData),gl.STATIC_DRAW);

          //接收顶点法向量数据
          this.vertexNormal=vertexNormalIn;
          //创建顶点法向量数据缓冲
           this.vertexNormalBuffer=gl.createBuffer();
           //将顶点法向量数据送入缓冲
          gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexNormalBuffer);
          gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexNormal),gl.STATIC_DRAW);

          //接收顶点纹理坐标数据
          this.vertexTexCoor=vertexTexCoorIn;
          //创建顶点纹理坐标缓冲
          this.vertexTexCoorBuffer=gl.createBuffer();
          //将顶点纹理坐标数据送入缓冲
          gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexTexCoorBuffer);
          gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertexTexCoor),gl.STATIC_DRAW);
	        this.drawMoon=function(ms,texture,program) {
                gl.useProgram(program); //制定使用某套着色器程序
                //送入总矩阵
                var uMVPMatrixHandle = gl.getUniformLocation(program, "uMVPMatrix");
                gl.uniformMatrix4fv(uMVPMatrixHandle, false, new Float32Array(ms.getFinalMatrix()));

                //送入变换矩阵
                var uMMatrixHandle = gl.getUniformLocation(program, "uMMatrix");
                gl.uniformMatrix4fv(uMMatrixHandle, false, new Float32Array(ms.currMatrix));

                //送入光源位置
                var uLightLocationHandle = gl.getUniformLocation(program, "uLightLocationSun");
                gl.uniform3fv(uLightLocationHandle, new Float32Array([lightManager.lx, lightManager.ly, lightManager.lz]));

                //送入摄像机位置
                var uCameraHandle = gl.getUniformLocation(program, "uCamera");
                gl.uniform3fv(uCameraHandle, new Float32Array([ms.cx, ms.cy, ms.cz]));

                //启用顶点数据
                gl.enableVertexAttribArray(gl.getAttribLocation(program, "aPosition"));
                //将顶点数据送入渲染管线
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
                gl.vertexAttribPointer(gl.getAttribLocation(program, "aPosition"), 3, gl.FLOAT, false, 0, 0);

                //启用法向量数据
                gl.enableVertexAttribArray(gl.getAttribLocation(program, "aNormal"));
                //将顶点法向量数据送入渲染管线
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
                gl.vertexAttribPointer(gl.getAttribLocation(program, "aNormal"), 3, gl.FLOAT, false, 0, 0);

                //启用纹理坐标数据
                gl.enableVertexAttribArray(gl.getAttribLocation(program, "aTexCoor"));
                //将顶点纹理坐标数据送入渲染管线
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoorBuffer);
                gl.vertexAttribPointer(gl.getAttribLocation(program, "aTexCoor"), 2, gl.FLOAT, false, 0, 0);

                //绑定纹理
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.uniform1i(gl.getUniformLocation(program, "sTexture"), 0);
                //用顶点法绘制物体
                gl.drawArrays(gl.TRIANGLES, 0, this.vcount);
            }
            this.drawEarth=function(ms,texture1,texture2,program) {
                gl.useProgram(program); //制定使用某套着色器程序
                //送入总矩阵
                var uMVPMatrixHandle=gl.getUniformLocation(program, "uMVPMatrix");
                gl.uniformMatrix4fv(uMVPMatrixHandle,false,new Float32Array(ms.getFinalMatrix()));

                //送入变换矩阵
                var uMMatrixHandle=gl.getUniformLocation(program, "uMMatrix");
                gl.uniformMatrix4fv(uMMatrixHandle,false,new Float32Array(ms.currMatrix));

                //送入光源位置
                var uLightLocationHandle=gl.getUniformLocation(program, "uLightLocationSun");
                gl.uniform3fv(uLightLocationHandle,new Float32Array([lightManager.lx,lightManager.ly,lightManager.lz]));

                //送入摄像机位置
                var uCameraHandle=gl.getUniformLocation(program, "uCamera");
                gl.uniform3fv(uCameraHandle,new Float32Array([ms.cx,ms.cy,ms.cz]));

                //启用顶点数据
                gl.enableVertexAttribArray(gl.getAttribLocation(program, "aPosition"));
                //将顶点数据送入渲染管线
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
                gl.vertexAttribPointer(gl.getAttribLocation(program, "aPosition"), 3, gl.FLOAT, false, 0, 0);

                //启用法向量数据
                gl.enableVertexAttribArray(gl.getAttribLocation(program, "aNormal"));
                //将顶点法向量数据送入渲染管线
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
                gl.vertexAttribPointer(gl.getAttribLocation(program, "aNormal"), 3, gl.FLOAT, false, 0, 0);

                //启用纹理坐标数据
                gl.enableVertexAttribArray(gl.getAttribLocation(program, "aTexCoor"));
                //将顶点纹理坐标数据送入渲染管线
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoorBuffer);
                gl.vertexAttribPointer(gl.getAttribLocation(program, "aTexCoor"), 2, gl.FLOAT, false, 0, 0);

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture1);
                gl.uniform1i(gl.getUniformLocation(program, "sTextureDay"), 0);
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, texture2);
                gl.uniform1i(gl.getUniformLocation(program, "sTextureNight"), 1);
                //用顶点法绘制物体
                gl.drawArrays(gl.TRIANGLES, 0, this.vcount);
            }
        }
//加载的用于绘制的3D物体
function ObjObjectPlane
(
    gl,						  //GL上下文
    vertexDataIn,    //顶点坐标数组
    vertexTexCoorIn	//顶点纹理坐标数组
) {
    //接收顶点数据
    this.vertexData = vertexDataIn;
    //得到顶点数量
    this.vcount = this.vertexData.length / 3;
    //创建顶点数据缓冲
    this.vertexBuffer = gl.createBuffer();
    //将顶点数据送入缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexData), gl.STATIC_DRAW);

    //接收顶点纹理坐标数据
    this.vertexTexCoor = vertexTexCoorIn;
    //创建顶点纹理坐标缓冲
    this.vertexTexCoorBuffer = gl.createBuffer();
    //将顶点纹理坐标数据送入缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexTexCoor), gl.STATIC_DRAW);
    this.drawPlane = function (ms,program) {
        gl.useProgram(program); //制定使用某套着色器程序
        //送入总矩阵
        var uMVPMatrixHandle = gl.getUniformLocation(program, "uMVPMatrix");
        gl.uniformMatrix4fv(uMVPMatrixHandle, false, new Float32Array(ms.getFinalMatrix()));

        //启用顶点数据
        gl.enableVertexAttribArray(gl.getAttribLocation(program, "aPosition"));
        //将顶点数据送入渲染管线
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(program, "aPosition"), 3, gl.FLOAT, false, 0, 0);


        //启用纹理坐标数据
        gl.enableVertexAttribArray(gl.getAttribLocation(program, "aTexCoor"));
        //将顶点纹理坐标数据送入渲染管线
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoorBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(program, "aTexCoor"), 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, rttTexture);

        //用顶点法绘制物体
        gl.drawArrays(gl.TRIANGLES, 0, this.vcount);
    }
}
