/**
 * Created by ~ on 2017/10/27.
 */
function Celestial(gl,vCount,programIn){
    this.vCount=vCount;
    this.program=programIn;
    var vertices=[];
    var UNIT_SIZE=50;
    for(var i=0;i<this.vCount;i++){
        var angleTempJD=Math.PI*2*Math.random();
        var angleTempWD=Math.PI*(Math.random()-0.5);
        vertices[i*3]=(UNIT_SIZE*Math.cos(angleTempWD)*Math.sin(angleTempJD));
        vertices[i*3+1]=(UNIT_SIZE*Math.sin(angleTempWD));
        vertices[i*3+2]=(UNIT_SIZE*Math.cos(angleTempWD)*Math.cos(angleTempJD));
    }
    this.vertexBuffer=gl.createBuffer();
    //将顶点数据送入缓冲
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
    this.drawSelf=function(ms,scale){
        gl.useProgram(this.program);
        //送入总矩阵
        var uMVPMatrixHandle=gl.getUniformLocation(this.program, "uMVPMatrix");
        gl.uniformMatrix4fv(uMVPMatrixHandle,false,new Float32Array(ms.getFinalMatrix()));
        //启用顶点数据
        gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "aPosition"));
        //将顶点数据送入渲染管线
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(gl.getAttribLocation(this.program, "aPosition"), 3, gl.FLOAT, false, 0, 0);
        //获取顶点尺寸参数引用
        var uPointSizeHandle = gl.getUniformLocation(this.program, "uPointSize");
        gl.uniform1f(uPointSizeHandle,scale);
        //用顶点法绘制物体
        gl.drawArrays(gl.POINTS, 0, this.vCount);
    }
}